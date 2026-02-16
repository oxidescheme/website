"use client";

import { useState } from "react";
import { ports } from "@/data/ports";

export default function PortsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPorts = ports.filter(
    (port) =>
      port.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      port.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
      <div className="animate-fadeIn">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-mono text-4xl font-bold text-bright-text mb-2">
              Ports
            </h2>
            <p className="text-subtext0">
              Available implementations of the oxide colorscheme
            </p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search ports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface0 border border-subtext2 px-4 py-2 pl-10 font-mono text-sm text-text placeholder:text-subtext1 focus:border-blue focus:outline-none w-64"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subtext1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="square"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredPorts.map((port) => (
            <div
              key={port.id}
              className="border border-subtext2 bg-surface0 p-6 hover:border-subtext1 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-mono font-semibold text-bright-text text-xl group-hover:text-blue transition-colors">
                  {port.name}
                </h3>
                <span className="font-mono text-xs text-subtext1 uppercase">
                  {port.platform}
                </span>
              </div>

              <p className="text-sm text-subtext0 mb-4">{port.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-subtext2">
                <span className="text-xs text-subtext1">
                  <span className="font-mono text-subtext0">
                    {port.downloads.toLocaleString()}
                  </span>{" "}
                  downloads
                </span>
                {port.githubUrl && (
                  <a
                    href={port.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue hover:text-bright-text transition-colors text-xs font-mono"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
