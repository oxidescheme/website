"use client";

import { useEffect, useState } from "react";
import { type Color, colors } from "@/data/colors";

const sections: {
  category: Color["category"];
  title: string;
  description: string;
}[] = [
  {
    category: "surface",
    title: "Surface",
    description: "Five steps of depth, from mantle to border.",
  },
  {
    category: "text",
    title: "Text",
    description: "Hierarchy through lightness, without color.",
  },
  {
    category: "accent",
    title: "Accent",
    description: "Equal-lightness colors for syntax and meaningful states.",
  },
  {
    category: "bright_accent",
    title: "Bright accent",
    description: "Higher-lightness counterparts for terminal use.",
  },
  {
    category: "diff",
    title: "Diff",
    description: "Quiet backgrounds for added, removed, and changed content.",
  },
];

interface CopyStatus {
  hex: string;
  state: "copied" | "error";
}

export function ColorsList() {
  const [copyStatus, setCopyStatus] = useState<CopyStatus | null>(null);

  useEffect(() => {
    if (!copyStatus) return;
    const timeout = window.setTimeout(() => setCopyStatus(null), 1800);
    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  const copyColor = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopyStatus({ hex, state: "copied" });
    } catch {
      setCopyStatus({ hex, state: "error" });
    }
  };

  return (
    <div>
      {sections.map((section) => {
        const sectionColors = colors.filter(
          (color) => color.category === section.category,
        );

        return (
          <section key={section.category} className="pt-14 md:pt-18">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-2xl font-medium tracking-[-0.03em] text-bright-text md:text-3xl">
                {section.title}
              </h2>
              <p className="text-sm text-subtext1">{section.description}</p>
            </div>
            <div className="grid border-t border-surface2 md:grid-cols-2 md:gap-x-10">
              {sectionColors.map((color) => {
                const status =
                  copyStatus?.hex === color.hex ? copyStatus.state : null;

                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => copyColor(color.hex)}
                    aria-label={`Copy ${color.name} ${color.hex}`}
                    className="group grid min-w-0 grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-surface2 py-4 text-left transition-colors hover:bg-surface0/50 sm:gap-6 sm:px-2"
                  >
                    <span
                      className="size-6 border border-white/10"
                      style={{ backgroundColor: color.hex }}
                      aria-hidden="true"
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-bright-text">
                        {color.name}
                      </span>
                      <span className="block truncate text-xs text-subtext1">
                        {color.usage}
                      </span>
                    </span>
                    <span className="font-mono text-xs text-subtext0 group-hover:text-bright-text">
                      {status === "copied"
                        ? "Copied"
                        : status === "error"
                          ? "Copy failed"
                          : color.hex}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
