"use client";

import { useState, useEffect } from "react";
import { colors } from "@/data/colors";

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

        {(["surface", "text", "accent"] as const).map((category) => (
          <div key={category} className="mb-12">
            <div className="font-mono text-xs text-subtext1 uppercase tracking-wider mb-4 flex items-center gap-3">
              <span>{category} colors</span>
              <div className="flex-1 h-px bg-subtext2" />
            </div>
            <div className="grid grid-cols-3 gap-4 items-start">
              {colors
                .filter((c) => c.category === category)
                .map((color) => (
                  <button
                    type="button"
                    key={color.name}
                    onClick={() => copyToClipboard(color.hex)}
                    className="border border-subtext2 bg-surface0 overflow-hidden hover:border-subtext1 transition-colors group text-left self-start"
                  >
                    <div
                      className="h-20 flex items-end p-3 transition-all duration-200 ease-out group-hover:h-22 relative"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span
                        className={`font-mono text-sm font-semibold ${
                          category === "surface"
                            ? "text-subtext0"
                            : "text-mantle"
                        }`}
                      >
                        {copiedColor === color.hex ? "Copied!" : color.hex}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="font-mono font-semibold text-bright-text mb-1">
                        {color.name}
                      </div>
                      <div className="text-xs text-subtext1 mb-2">
                        {color.oklch}
                      </div>
                      <div className="text-sm text-subtext0">{color.usage}</div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
