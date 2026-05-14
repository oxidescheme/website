"use client";

import { useState, useMemo } from "react";
import type { Userstyle } from "@/lib/github";

interface UserstylesListProps {
  initialStyles: Userstyle[];
}

export function UserstylesList({ initialStyles }: UserstylesListProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const filteredAndSortedStyles = useMemo(() => {
    let result = [...initialStyles];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q),
      );
    }

    result.sort((a, b) => {
      if (sort === "asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

    return result;
  }, [initialStyles, search, sort]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search userstyles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-surface0 border border-subtext2 rounded-md px-4 py-2 text-bright-text focus:outline-none focus:border-teal transition-colors font-mono text-sm"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="bg-surface0 border border-subtext2 rounded-md px-4 py-2 text-bright-text focus:outline-none focus:border-teal transition-colors font-mono text-sm"
        >
          <option value="asc">Name (A-Z)</option>
          <option value="desc">Name (Z-A)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredAndSortedStyles.map((style: Userstyle) => (
          <div
            key={style.slug}
            className="relative group p-4 border border-subtext2 bg-surface0 rounded-md hover:border-subtext1 transition-colors flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <a
                href={style.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-semibold text-bright-text text-base sm:text-lg transition-colors after:absolute after:inset-0 truncate"
              >
                {style.name}
              </a>
              <span className="font-mono text-[10px] text-subtext1 px-1.5 py-0.5 border border-subtext2 rounded-sm uppercase shrink-0">
                website
              </span>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <a
                href={style.installUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 text-xs font-mono px-3 py-1 bg-surface1 hover:bg-surface2 text-subtext0 hover:text-bright-text border border-subtext2 hover:border-subtext1 rounded-md transition-colors"
              >
                Install
              </a>
              <svg
                className="w-4 h-4 text-subtext2 group-hover:text-bright-text transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedStyles.length === 0 && (
        <div className="text-center py-12 border border-subtext2 border-dashed rounded-md mt-4">
          <p className="text-subtext1 font-mono text-sm">
            No userstyles found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
