export interface Color {
  name: string;
  hex: string;
  oklch: string;
  category: "surface" | "text" | "accent";
  usage: string;
}

export const colors: Color[] = [
  // Surface Colors
  {
    name: "mantle",
    hex: "#121212",
    oklch: "oklch(14.5% 0 0)",
    category: "surface",
    usage: "Deepest background, sidebars",
  },
  {
    name: "base",
    hex: "#161616",
    oklch: "oklch(16.5% 0 0)",
    category: "surface",
    usage: "Main background",
  },
  {
    name: "surface0",
    hex: "#222222",
    oklch: "oklch(21.5% 0 0)",
    category: "surface",
    usage: "Cursor, elevated backgrounds",
  },
  {
    name: "surface1",
    hex: "#262626",
    oklch: "oklch(23.5% 0 0)",
    category: "surface",
    usage: "Subtle backgrounds, cards",
  },
  // Text Hierarchy
  {
    name: "bright_text",
    hex: "#dedede",
    oklch: "oklch(90% 0 0)",
    category: "text",
    usage: "Brightest text, headings",
  },
  {
    name: "text",
    hex: "#cecece",
    oklch: "oklch(84% 0 0)",
    category: "text",
    usage: "Primary text",
  },
  {
    name: "subtext0",
    hex: "#bebebe",
    oklch: "oklch(78% 0 0)",
    category: "text",
    usage: "Secondary text",
  },
  {
    name: "subtext1",
    hex: "#8f8f8f",
    oklch: "oklch(62% 0 0)",
    category: "text",
    usage: "Muted text, placeholders",
  },
  {
    name: "subtext2",
    hex: "#484848",
    oklch: "oklch(36% 0 0)",
    category: "text",
    usage: "Comments, borders, subtle elements",
  },
  // Semantic Accent Colors
  {
    name: "red",
    hex: "#ed756e",
    oklch: "oklch(0.70 0.15 25)",
    category: "accent",
    usage: "Errors, critical items, deletions",
  },
  {
    name: "orange",
    hex: "#e48233",
    oklch: "oklch(0.70 0.15 55)",
    category: "accent",
    usage: "Warnings, numbers, constants",
  },
  {
    name: "yellow",
    hex: "#c39900",
    oklch: "oklch(0.70 0.15 90)",
    category: "accent",
    usage: "Attention, search highlights",
  },
  {
    name: "green",
    hex: "#5bb661",
    oklch: "oklch(0.70 0.15 145)",
    category: "accent",
    usage: "Success, strings, additions",
  },
  {
    name: "teal",
    hex: "#00baaa",
    oklch: "oklch(0.70 0.15 185)",
    category: "accent",
    usage: "Special elements, regex, escapes",
  },
  {
    name: "sky",
    hex: "#00b3d6",
    oklch: "oklch(0.70 0.15 215)",
    category: "accent",
    usage: "Classes, types, bold markup",
  },
  {
    name: "blue",
    hex: "#3ba6f5",
    oklch: "oklch(0.70 0.15 245)",
    category: "accent",
    usage: "Variables, identifiers, links",
  },
  {
    name: "purple",
    hex: "#968ff7",
    oklch: "oklch(0.70 0.15 285)",
    category: "accent",
    usage: "Keywords, storage, changes",
  },
  {
    name: "pink",
    hex: "#cc7bd1",
    oklch: "oklch(0.70 0.15 325)",
    category: "accent",
    usage: "Deprecated, special tags",
  },
];
