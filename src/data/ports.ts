export interface Port {
  id: string;
  name: string;
  description: string;
  status: "stable" | "beta" | "planned";
  platform: string;
  installMethod: string;
  githubUrl: string | null;
  marketplaceUrl?: string;
  downloads: number;
  lastUpdated: string | null;
}

export const ports: Port[] = [
  {
    id: "vscode",
    name: "VS Code",
    description: "Oxide theme for Visual Studio Code",
    status: "stable",
    platform: "editor",
    installMethod: "marketplace",
    githubUrl: "https://github.com/oxidescheme/vscode",
    marketplaceUrl:
      "https://marketplace.visualstudio.com/items?itemName=oxidescheme.oxide-theme",
    downloads: 1247,
    lastUpdated: "2025-02-13",
  },
  {
    id: "neovim",
    name: "Neovim",
    description: "Oxide colorscheme for Neovim",
    status: "stable",
    platform: "editor",
    installMethod: "plugin",
    githubUrl: "https://github.com/oxidescheme/oxide.nvim",
    downloads: 892,
    lastUpdated: "2025-02-10",
  },
  {
    id: "ghostty",
    name: "Ghostty",
    description: "Oxide theme for Ghostty terminal",
    status: "stable",
    platform: "terminal",
    installMethod: "config",
    githubUrl: "https://github.com/oxidescheme/ghostty",
    downloads: 156,
    lastUpdated: "2025-02-08",
  },
  {
    id: "alacritty",
    name: "Alacritty",
    description: "Oxide theme for Alacritty terminal",
    status: "planned",
    platform: "terminal",
    installMethod: "config",
    githubUrl: null,
    downloads: 0,
    lastUpdated: null,
  },
  {
    id: "wezterm",
    name: "WezTerm",
    description: "Oxide theme for WezTerm terminal",
    status: "beta",
    platform: "terminal",
    installMethod: "config",
    githubUrl: "https://github.com/oxidescheme/wezterm",
    downloads: 89,
    lastUpdated: "2025-02-05",
  },
  {
    id: "kitty",
    name: "Kitty",
    description: "Oxide theme for Kitty terminal",
    status: "stable",
    platform: "terminal",
    installMethod: "config",
    githubUrl: "https://github.com/oxidescheme/kitty",
    downloads: 234,
    lastUpdated: "2025-02-01",
  },
];
