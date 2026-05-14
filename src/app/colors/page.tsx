"use client";

import { useState, useEffect } from "react";
import { colors } from "@/data/colors";

// Helper to determine if a color needs light or dark text based on its hex
const needsLightText = (hex: string) => {
  // Simple relative luminance calculation
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
};

export default function ColorsPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  useEffect(() => {
    document.title = "colors | oxide";
  }, []);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
      <div className="animate-fadeIn">
        <div className="mb-12">
          <h2 className="font-mono text-4xl font-bold text-bright-text mb-2">
            Colors
          </h2>
          <p className="text-subtext0">
            The complete oxide palette with semantic meanings. Click to copy.
          </p>
        </div>

        {(["surface", "text", "accent", "bright_accent", "diff"] as const).map(
          (category) => {
            const categoryColors = colors.filter(
              (c) => c.category === category,
            );
            if (categoryColors.length === 0) return null;

            return (
              <div key={category} className="mb-12">
                <div className="font-mono text-xs text-subtext1 uppercase tracking-wider mb-4 flex items-center gap-3">
                  <span>{category.replace("_", " ")} colors</span>
                  <div className="flex-1 h-px bg-surface2" />
                </div>
                {/* Use a 2-col layout on small screens and 5-col on medium and up */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-start">
                  {categoryColors.map((color) => {
                    const isLightText = needsLightText(color.hex);
                    return (
                      <button
                        type="button"
                        key={color.name}
                        onClick={() => copyToClipboard(color.hex)}
                        className="border border-subtext2 bg-surface0 overflow-hidden hover:border-subtext1 transition-colors group text-left self-stretch flex flex-col"
                      >
                        <div
                          className="h-20 flex items-end p-3 transition-all duration-200 ease-out group-hover:h-22 relative shrink-0"
                          style={{ backgroundColor: color.hex }}
                        >
                          <span
                            className={`font-mono text-xs md:text-sm font-semibold ${
                              isLightText ? "text-bright-text" : "text-mantle"
                            }`}
                          >
                            {copiedColor === color.hex ? "Copied!" : color.hex}
                          </span>
                        </div>
                        <div className="p-3 md:p-4 flex flex-col grow">
                          <div className="font-mono text-sm font-semibold text-bright-text mb-1 truncate">
                            {color.name}
                          </div>
                          <div className="text-[10px] md:text-xs text-subtext1 mb-2">
                            {color.oklch}
                          </div>
                          <div className="text-xs md:text-sm text-subtext0 leading-tight">
                            {color.usage}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          },
        )}
      </div>
    </main>
  );
}
