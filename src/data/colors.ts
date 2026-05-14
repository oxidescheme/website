export interface Color {
  name: string;
  hex: string;
  oklch: string;
  category: "surface" | "text" | "accent" | "bright_accent" | "diff";
  usage: string;
}

export const colors: Color[] = [
  // Surface Colors
  {
    name: "mantle",
    hex: "#121212",
    oklch: "oklch(0.18 0 0)",
    category: "surface",
    usage: "Deepest background, sidebars",
  },
  {
    name: "base",
    hex: "#161616",
    oklch: "oklch(0.20 0 0)",
    category: "surface",
    usage: "Main background",
  },
  {
    name: "surface0",
    hex: "#222222",
    oklch: "oklch(0.25 0 0)",
    category: "surface",
    usage: "Cursor, elevated backgrounds",
  },
  {
    name: "surface1",
    hex: "#2e2e2e",
    oklch: "oklch(0.30 0 0)",
    category: "surface",
    usage: "Active selections",
  },
  {
    name: "surface2",
    hex: "#3a3a3a",
    oklch: "oklch(0.35 0 0)",
    category: "surface",
    usage: "Borders, lines",
  },

  // Text Hierarchy
  {
    name: "bright_text",
    hex: "#eeeeee",
    oklch: "oklch(0.95 0 0)",
    category: "text",
    usage: "Brightest text, headings",
  },
  {
    name: "text",
    hex: "#cecece",
    oklch: "oklch(0.85 0 0)",
    category: "text",
    usage: "Primary text",
  },
  {
    name: "subtext0",
    hex: "#aeaeae",
    oklch: "oklch(0.75 0 0)",
    category: "text",
    usage: "Secondary text",
  },
  {
    name: "subtext1",
    hex: "#808080",
    oklch: "oklch(0.60 0 0)",
    category: "text",
    usage: "Muted text, placeholders",
  },
  {
    name: "subtext2",
    hex: "#555555",
    oklch: "oklch(0.45 0 0)",
    category: "text",
    usage: "Comments, subtle elements",
  },

  // Semantic Accent Colors
  {
    name: "red",
    hex: "#ed756e",
    oklch: "oklch(0.70 15 25)",
    category: "accent",
    usage: "Errors, critical items",
  },
  {
    name: "orange",
    hex: "#e48233",
    oklch: "oklch(0.70 15 55)",
    category: "accent",
    usage: "Warnings, numbers, constants",
  },
  {
    name: "yellow",
    hex: "#c39900",
    oklch: "oklch(0.70 15 90)",
    category: "accent",
    usage: "Attention, search highlights",
  },
  {
    name: "lime",
    hex: "#9ca81f",
    oklch: "oklch(0.70 15 115)",
    category: "accent",
    usage: "Headings, progression, positive accents",
  },
  {
    name: "green",
    hex: "#5bb661",
    oklch: "oklch(0.70 15 145)",
    category: "accent",
    usage: "Success, strings",
  },
  {
    name: "teal",
    hex: "#00baaa",
    oklch: "oklch(0.70 15 185)",
    category: "accent",
    usage: "Special elements, regex, escapes",
  },
  {
    name: "sky",
    hex: "#00b3d6",
    oklch: "oklch(0.70 15 215)",
    category: "accent",
    usage: "Classes, types, bold markup",
  },
  {
    name: "blue",
    hex: "#3ba6f5",
    oklch: "oklch(0.70 15 245)",
    category: "accent",
    usage: "Variables, identifiers, links",
  },
  {
    name: "purple",
    hex: "#968ff7",
    oklch: "oklch(0.70 15 285)",
    category: "accent",
    usage: "Keywords, storage",
  },
  {
    name: "pink",
    hex: "#cc7bd1",
    oklch: "oklch(0.70 15 325)",
    category: "accent",
    usage: "Deprecated, special tags",
  },

  // Bright Accent Colors
  {
    name: "bright_red",
    hex: "#ff9890",
    oklch: "oklch(0.80 15 25)",
    category: "bright_accent",
    usage: "Errors, critical items",
  },
  {
    name: "bright_orange",
    hex: "#ffa156",
    oklch: "oklch(0.80 15 55)",
    category: "bright_accent",
    usage: "Warnings, numbers, constants",
  },
  {
    name: "bright_yellow",
    hex: "#e3b831",
    oklch: "oklch(0.80 15 90)",
    category: "bright_accent",
    usage: "Attention, search highlights",
  },
  {
    name: "bright_lime",
    hex: "#bbc949",
    oklch: "oklch(0.80 15 115)",
    category: "bright_accent",
    usage: "Headings, progression, positive accents",
  },
  {
    name: "bright_green",
    hex: "#7bd77f",
    oklch: "oklch(0.80 15 145)",
    category: "bright_accent",
    usage: "Success, strings",
  },
  {
    name: "bright_teal",
    hex: "#00dcca",
    oklch: "oklch(0.80 15 185)",
    category: "bright_accent",
    usage: "Special elements, regex, escapes",
  },
  {
    name: "bright_sky",
    hex: "#00d5f9",
    oklch: "oklch(0.80 15 215)",
    category: "bright_accent",
    usage: "Classes, types, bold markup",
  },
  {
    name: "bright_blue",
    hex: "#6fc6ff",
    oklch: "oklch(0.80 15 245)",
    category: "bright_accent",
    usage: "Variables, identifiers, links",
  },
  {
    name: "bright_purple",
    hex: "#b5b2ff",
    oklch: "oklch(0.80 15 285)",
    category: "bright_accent",
    usage: "Keywords, storage",
  },
  {
    name: "bright_pink",
    hex: "#dd8be2",
    oklch: "oklch(0.80 15 325)",
    category: "bright_accent",
    usage: "Deprecated, special tags",
  },

  // Diff Colors
  {
    name: "diff_delete",
    hex: "#452b28",
    oklch: "oklch(0.32 0.04 25)",
    category: "diff",
    usage: "Dark red background (deletions)",
  },
  {
    name: "diff_add",
    hex: "#263826",
    oklch: "oklch(0.32 0.04 145)",
    category: "diff",
    usage: "Dark green background (additions)",
  },
  {
    name: "diff_change",
    hex: "#213546",
    oklch: "oklch(0.32 0.04 245)",
    category: "diff",
    usage: "Dark blue background (modifications)",
  },
];
