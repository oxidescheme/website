"use client";

import { useState, useMemo } from "react";
import type { Port } from "@/lib/github";

interface PortsListProps {
  initialPorts: Port[];
}

export function PortsList({ initialPorts }: PortsListProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"stars" | "name" | "recent">("stars");
  const [platform, setPlatform] = useState<string>("all");

  const platforms = useMemo(() => {
    const set = new Set(initialPorts.map((p) => p.platform));
    return ["all", ...Array.from(set).sort()];
  }, [initialPorts]);

  const filteredAndSortedPorts = useMemo(() => {
    let result = [...initialPorts];

    // Filter by platform
    if (platform !== "all") {
      result = result.filter((p) => p.platform === platform);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sort === "stars") {
        return b.stars - a.stars;
      }
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sort === "recent") {
        return (
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        );
      }
      return 0;
    });

    return result;
  }, [initialPorts, search, sort, platform]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search ports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-surface0 border border-subtext2 rounded-md px-4 py-2 text-bright-text focus:outline-none focus:border-blue transition-colors font-mono text-sm"
        />
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="bg-surface0 border border-subtext2 rounded-md px-4 py-2 text-bright-text focus:outline-none focus:border-blue transition-colors font-mono text-sm"
        >
          {platforms.map((p) => (
            <option key={p} value={p}>
              {p === "all" ? "All Platforms" : p}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
          className="bg-surface0 border border-subtext2 rounded-md px-4 py-2 text-bright-text focus:outline-none focus:border-blue transition-colors font-mono text-sm"
        >
          <option value="stars">Most Stars</option>
          <option value="name">Name (A-Z)</option>
          <option value="recent">Recently Updated</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredAndSortedPorts.map((port: Port) => (
          <div
            key={port.id}
            className="relative group p-4 border border-subtext2 bg-surface0 rounded-md hover:border-subtext1 transition-colors flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <a
                href={port.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-semibold text-bright-text text-base sm:text-lg transition-colors after:absolute after:inset-0 truncate"
              >
                {port.name}
              </a>
              <span className="font-mono text-[10px] text-subtext1 px-1.5 py-0.5 border border-subtext2 rounded-sm uppercase shrink-0">
                {port.platform}
              </span>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              {port.lastUpdated && (
                <span className="text-xs text-subtext1 hidden sm:block">
                  {new Date(port.lastUpdated).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
              {port.stars > 0 && (
                <span className="text-xs text-subtext0 flex items-center gap-1">
                  <svg
                    className="w-3 h-3 text-subtext1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <title>star icon</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-mono">{port.stars.toLocaleString()}</span>
                </span>
              )}
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

      {filteredAndSortedPorts.length === 0 && (
        <div className="text-center py-12 border border-subtext2 border-dashed rounded-md mt-4">
          <p className="text-subtext1 font-mono text-sm">
            No ports found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
