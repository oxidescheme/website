const GITHUB_API = "https://api.github.com";
const ORG_NAME = "oxidescheme";

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
  topics: string[];
  homepage: string | null;
}

interface GitHubContributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface Port {
  id: string;
  name: string;
  description: string;
  platform: string;
  githubUrl: string;
  stars: number;
  lastUpdated: string;
  homepage: string | null;
}

interface ContributorInfo {
  login: string;
  name: string;
  avatarUrl: string;
  githubUrl: string;
  contributions: number;
  repos: string[];
}

async function fetchGitHub<T>(endpoint: string): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  const response = await fetch(`${GITHUB_API}${endpoint}`, {
    headers,
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

function inferPlatform(repoName: string): string {
  const editors = [
    "vscode",
    "neovim",
    "nvim",
    "vim",
    "emacs",
    "sublime",
    "atom",
  ];
  const terminals = [
    "ghostty",
    "alacritty",
    "wezterm",
    "kitty",
    "iterm",
    "terminal",
    "konsole",
    "gnome-terminal",
  ];

  const lowerName = repoName.toLowerCase();

  if (editors.some((e) => lowerName.includes(e))) return "editor";
  if (terminals.some((t) => lowerName.includes(t))) return "terminal";
  return "tool";
}

function formatRepoName(name: string): string {
  return name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function getOrgRepos(): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const pageRepos = await fetchGitHub<GitHubRepo[]>(
      `/orgs/${ORG_NAME}/repos?per_page=100&page=${page}&type=public`,
    );

    if (pageRepos.length === 0) {
      hasMore = false;
    } else {
      repos.push(...pageRepos);
      page++;
    }
  }

  return repos;
}

export async function getPorts(): Promise<Port[]> {
  try {
    const repos = await getOrgRepos();

    const portRepos = repos.filter((repo) => repo.topics.includes("port"));

    return portRepos
      .map((repo) => ({
        id: repo.name.toLowerCase(),
        name: formatRepoName(repo.name),
        description:
          repo.description || `${formatRepoName(repo.name)} port of oxide`,
        platform: inferPlatform(repo.name),
        githubUrl: repo.html_url,
        stars: repo.stargazers_count,
        lastUpdated: repo.updated_at,
        homepage: repo.homepage,
      }))
      .sort((a, b) => b.stars - a.stars);
  } catch (error) {
    console.error("Failed to fetch ports:", error);
    return [];
  }
}

export async function getOrgStats(): Promise<{
  totalStars: number;
  totalPorts: number;
}> {
  try {
    const ports = await getPorts();
    const totalStars = ports.reduce((sum, port) => sum + port.stars, 0);
    return {
      totalStars,
      totalPorts: ports.length,
    };
  } catch (error) {
    console.error("Failed to fetch org stats:", error);
    return { totalStars: 0, totalPorts: 0 };
  }
}

export interface Userstyle {
  slug: string;
  name: string;
  description: string;
  installUrl: string;
  sourceUrl: string;
}

export async function getUserstyles(): Promise<Userstyle[]> {
  try {
    const dirs = await fetchGitHub<
      { name: string; type: string; path: string }[]
    >(`/repos/${ORG_NAME}/userstyles/contents/styles`);

    return dirs
      .filter((d) => d.type === "dir")
      .map((dir) => {
        const name = dir.name
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
        return {
          slug: dir.name,
          name,
          description: `Oxide dark theme for ${name}`,
          installUrl: `https://github.com/oxidescheme/userstyles/raw/main/styles/${dir.name}/oxide.user.less`,
          sourceUrl: `https://github.com/oxidescheme/userstyles/tree/main/styles/${dir.name}`,
        };
      });
  } catch (error) {
    console.error("Failed to fetch userstyles:", error);
    return [];
  }
}

export async function getContributors(): Promise<ContributorInfo[]> {
  try {
    const repos = await getOrgRepos();
    const contributorMap = new Map<string, ContributorInfo>();

    for (const repo of repos) {
      try {
        const repoContributors = await fetchGitHub<GitHubContributor[]>(
          `/repos/${ORG_NAME}/${repo.name}/contributors?per_page=100`,
        );

        for (const contributor of repoContributors) {
          const existing = contributorMap.get(contributor.login);

          if (existing) {
            existing.contributions += contributor.contributions;
            if (!existing.repos.includes(repo.name)) {
              existing.repos.push(repo.name);
            }
          } else {
            contributorMap.set(contributor.login, {
              login: contributor.login,
              name: contributor.login,
              avatarUrl: contributor.avatar_url,
              githubUrl: contributor.html_url,
              contributions: contributor.contributions,
              repos: [repo.name],
            });
          }
        }
      } catch (error) {
        console.warn(`Failed to fetch contributors for ${repo.name}:`, error);
      }
    }

    return Array.from(contributorMap.values()).sort(
      (a, b) => b.contributions - a.contributions,
    );
  } catch (error) {
    console.error("Failed to fetch contributors:", error);
    return [];
  }
}

export const revalidate = 86400;
