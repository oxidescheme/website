export interface Contributor {
  id: number;
  username: string;
  name: string;
  role: string;
  avatarUrl: string;
  githubUrl: string;
  contributions: string[];
}

export const contributors: Contributor[] = [
  {
    id: 1,
    username: "jakmaz",
    name: "Jakub Mazur",
    role: "Creator & Maintainer",
    avatarUrl: "https://github.com/jakmaz.png",
    githubUrl: "https://github.com/jakmaz",
    contributions: ["oxide.nvim", "vscode", "ghostty", "oxide-core"],
  },
  {
    id: 2,
    username: "contributor2",
    name: "Alex Smith",
    role: "Contributor",
    avatarUrl: "https://github.com/ghost.png",
    githubUrl: "https://github.com/ghost",
    contributions: ["documentation", "testing"],
  },
  {
    id: 3,
    username: "contributor3",
    name: "Morgan Chen",
    role: "Contributor",
    avatarUrl: "https://github.com/ghost.png",
    githubUrl: "https://github.com/ghost",
    contributions: ["kitty", "wezterm"],
  },
];

export const stats = {
  totalDownloads: 2618,
  totalPorts: 6,
  totalContributors: 3,
  githubStars: 847,
};
