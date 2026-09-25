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

export const revalidate = 86400;
