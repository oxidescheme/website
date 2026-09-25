"use client";

import { useMemo, useState } from "react";
import type { Userstyle } from "@/lib/github";

interface UserstylesListProps {
  initialStyles: Userstyle[];
}

type StyleSort = "asc" | "desc";

export function UserstylesList({ initialStyles }: UserstylesListProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<StyleSort>("asc");

  const visibleStyles = useMemo(() => {
    const query = search.trim().toLowerCase();
    const matching = initialStyles.filter(
      (style) =>
        !query ||
        style.name.toLowerCase().includes(query) ||
        style.description.toLowerCase().includes(query),
    );
    return matching.sort((a, b) =>
      sort === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    );
  }, [initialStyles, search, sort]);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <label className="sr-only" htmlFor="userstyle-search">
          Search userstyles
        </label>
        <input
          id="userstyle-search"
          type="search"
          placeholder="Search userstyles"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="min-w-0 rounded-sm border border-surface2 bg-surface0 px-4 py-3 text-sm text-bright-text placeholder:text-subtext1"
        />
        <label className="sr-only" htmlFor="userstyle-sort">
          Sort userstyles
        </label>
        <select
          id="userstyle-sort"
          value={sort}
          onChange={(event) => {
            const value = event.target.value;
            if (value === "asc" || value === "desc") setSort(value);
          }}
          className="rounded-sm border border-surface2 bg-surface0 px-4 py-3 font-mono text-xs text-bright-text"
        >
          <option value="asc">Name A–Z</option>
          <option value="desc">Name Z–A</option>
        </select>
      </div>

      <p
        className="mb-4 mt-8 font-mono text-[11px] text-subtext1"
        aria-live="polite"
      >
        {visibleStyles.length} {visibleStyles.length === 1 ? "style" : "styles"}
      </p>
      <div className="border-t border-surface2">
        {visibleStyles.map((style) => (
          <div
            key={style.slug}
            className="grid gap-4 border-b border-surface2 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] md:items-center md:gap-8 md:px-3"
          >
            <div>
              <h2 className="text-xl font-medium text-bright-text">
                {style.name}
              </h2>
              <span className="mt-1 block font-mono text-[11px] text-subtext1">
                Website
              </span>
            </div>
            <p className="text-sm leading-relaxed text-subtext0">
              {style.description}
            </p>
            <div className="flex items-center gap-5 font-mono text-xs">
              <a
                href={style.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-subtext1 transition-colors hover:text-bright-text"
              >
                Source ↗
              </a>
              <a
                href={style.installUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-surface2 px-3 py-2 text-bright-text transition-colors hover:bg-surface0"
              >
                Install ↗
              </a>
            </div>
          </div>
        ))}
      </div>
      {visibleStyles.length === 0 && (
        <p className="border-b border-surface2 py-12 text-sm text-subtext0">
          {initialStyles.length === 0
            ? "Userstyles are unavailable right now. Browse the source on GitHub."
            : "No userstyles match that search."}
        </p>
      )}
    </div>
  );
}
