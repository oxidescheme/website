"use client";

import { useMemo, useState } from "react";
import type { Port } from "@/lib/github";

interface PortsListProps {
  initialPorts: Port[];
}

type PortSort = "stars" | "name" | "recent";

export function PortsList({ initialPorts }: PortsListProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<PortSort>("stars");
  const [platform, setPlatform] = useState("all");

  const platforms = useMemo(
    () => ["all", ...new Set(initialPorts.map((port) => port.platform))].sort(),
    [initialPorts],
  );

  const visiblePorts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const matching = initialPorts.filter(
      (port) =>
        (platform === "all" || port.platform === platform) &&
        (!query ||
          port.name.toLowerCase().includes(query) ||
          port.description.toLowerCase().includes(query)),
    );

    return matching.sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "recent") {
        return (
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        );
      }
      return b.stars - a.stars;
    });
  }, [initialPorts, platform, search, sort]);

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto]">
        <label className="sr-only" htmlFor="port-search">
          Search ports
        </label>
        <input
          id="port-search"
          type="search"
          placeholder="Search ports"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="min-w-0 rounded-sm border border-surface2 bg-surface0 px-4 py-3 text-sm text-bright-text placeholder:text-subtext1"
        />
        <label className="sr-only" htmlFor="port-platform">
          Filter by platform
        </label>
        <select
          id="port-platform"
          value={platform}
          onChange={(event) => setPlatform(event.target.value)}
          className="rounded-sm border border-surface2 bg-surface0 px-4 py-3 font-mono text-xs text-bright-text"
        >
          {platforms.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All platforms" : item}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="port-sort">
          Sort ports
        </label>
        <select
          id="port-sort"
          value={sort}
          onChange={(event) => {
            const value = event.target.value;
            if (value === "stars" || value === "name" || value === "recent") {
              setSort(value);
            }
          }}
          className="rounded-sm border border-surface2 bg-surface0 px-4 py-3 font-mono text-xs text-bright-text"
        >
          <option value="stars">Most stars</option>
          <option value="name">Name A–Z</option>
          <option value="recent">Recently updated</option>
        </select>
      </div>

      <p
        className="mb-4 mt-8 font-mono text-[11px] text-subtext1"
        aria-live="polite"
      >
        {visiblePorts.length} {visiblePorts.length === 1 ? "port" : "ports"}
      </p>
      <div className="border-t border-surface2">
        {visiblePorts.map((port) => (
          <a
            key={port.id}
            href={port.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid gap-3 border-b border-surface2 py-6 transition-colors hover:bg-surface0/50 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] md:items-center md:gap-8 md:px-3"
          >
            <div>
              <h2 className="text-xl font-medium text-bright-text">
                {port.name}{" "}
                <span className="text-subtext1 group-hover:text-bright-text">
                  ↗
                </span>
              </h2>
              <span className="mt-1 block font-mono text-[11px] text-subtext1">
                {port.platform}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-subtext0">
              {port.description}
            </p>
            <span className="font-mono text-xs text-subtext1">
              {port.stars.toLocaleString()} stars
            </span>
          </a>
        ))}
      </div>
      {visiblePorts.length === 0 && (
        <p className="border-b border-surface2 py-12 text-sm text-subtext0">
          {initialPorts.length === 0
            ? "Ports are unavailable right now. Browse the oxide projects on GitHub."
            : "No ports match those filters."}
        </p>
      )}
    </div>
  );
}
