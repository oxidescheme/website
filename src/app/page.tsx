"use client";
import { useState } from "react";
import { colors } from "@/data/colors";
import { contributors, stats } from "@/data/contributors";
import { ports } from "@/data/ports";

export default function Home() {
  const [activeSection, setActiveSection] = useState<
    "home" | "ports" | "colors" | "community"
  >("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const filteredPorts = ports.filter(
    (port) =>
      port.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      port.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div className="min-h-screen bg-base flex flex-col">
      {/* Header */}
      <header className="border-b border-subtext2 bg-mantle">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            {/* RGB Logo */}
            <div className="flex gap-0.5">
              <div className="w-2 h-6 bg-red" />
              <div className="w-2 h-6 bg-green" />
              <div className="w-2 h-6 bg-blue" />
            </div>
            <span className="font-mono font-semibold text-bright-text text-lg tracking-tight">
              oxide
            </span>
          </div>

          <nav className="flex items-center gap-8">
            {(["home", "ports", "colors", "community"] as const).map(
              (section) => (
                <button
                  type="button"
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`font-mono text-sm uppercase tracking-wider transition-colors ${
                    activeSection === section
                      ? "text-blue"
                      : "text-subtext0 hover:text-bright-text"
                  }`}
                >
                  {section}
                </button>
              ),
            )}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/oxidescheme"
              target="_blank"
              rel="noopener noreferrer"
              className="text-subtext1 hover:text-blue transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className={`max-w-6xl mx-auto px-6 w-full ${activeSection === "home" ? "flex flex-1 items-center" : "py-12 flex-1"}`}
      >
        {/* Home Section */}
        {activeSection === "home" && (
          <div className="animate-fadeIn w-full">
            <div className="grid grid-cols-12 gap-8 mb-16">
              <div className="col-span-8">
                <h1 className="font-mono text-6xl font-bold text-bright-text leading-none mb-6">
                  Where function
                  <br />
                  <span className="text-blue">meets form</span>
                </h1>
                <p className="text-xl text-subtext0 leading-relaxed max-w-xl">
                  A minimal colorscheme ecosystem designed for terminals and
                  code editors. No compromises.
                </p>
              </div>
              <div className="col-span-4 flex flex-col justify-center">
                <div className="border border-subtext2 bg-surface0 p-6">
                  <div className="font-mono text-xs text-subtext1 uppercase tracking-wider mb-3">
                    Quick Stats
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-mono text-2xl text-bright-text">
                        {stats.totalPorts}
                      </div>
                      <div className="text-xs text-subtext1">Ports</div>
                    </div>
                    <div>
                      <div className="font-mono text-2xl text-bright-text">
                        {stats.totalDownloads.toLocaleString()}
                      </div>
                      <div className="text-xs text-subtext1">Downloads</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Ports */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="font-mono text-xs text-subtext1 uppercase tracking-wider">
                  Featured Ports
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSection("ports")}
                  className="font-mono text-xs text-blue hover:text-bright-text transition-colors"
                >
                  View all
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {ports.slice(0, 3).map((port) => (
                  <div
                    key={port.id}
                    className="border border-subtext2 bg-surface0 p-5 hover:border-subtext1 transition-colors"
                  >
                    <h3 className="font-mono font-semibold text-bright-text text-lg mb-2">
                      {port.name}
                    </h3>
                    <p className="text-sm text-subtext1 mb-4">
                      {port.description}
                    </p>
                    <div className="text-xs text-subtext1">
                      {port.downloads.toLocaleString()} downloads
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ports Section */}
        {activeSection === "ports" && (
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

                  <p className="text-sm text-subtext0 mb-4">
                    {port.description}
                  </p>

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
        )}

        {/* Colors Section */}
        {activeSection === "colors" && (
          <div className="animate-fadeIn">
            <div className="mb-12">
              <h2 className="font-mono text-4xl font-bold text-bright-text mb-2">
                Colors
              </h2>
              <p className="text-subtext0">
                The complete oxide palette with semantic meanings. Click to
                copy.
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
                          <div className="text-sm text-subtext0">
                            {color.usage}
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Community Section */}
        {activeSection === "community" && (
          <div className="animate-fadeIn">
            <div className="mb-12">
              <h2 className="font-mono text-4xl font-bold text-bright-text mb-2">
                Community
              </h2>
              <p className="text-subtext0">The people behind oxide</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-12">
              {[
                { label: "GitHub Stars", value: stats.githubStars },
                { label: "Total Downloads", value: stats.totalDownloads },
                { label: "Active Ports", value: stats.totalPorts },
                { label: "Contributors", value: stats.totalContributors },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border border-subtext2 bg-surface0 p-5"
                >
                  <div className="font-mono text-3xl font-bold text-bright-text mb-1">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-xs text-subtext1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Contributors */}
            <div className="font-mono text-xs text-subtext1 uppercase tracking-wider mb-4">
              Contributors
            </div>
            <div className="grid grid-cols-3 gap-4 mb-12">
              {contributors.map((contributor) => (
                <a
                  key={contributor.id}
                  href={contributor.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-subtext2 bg-surface0 p-5 hover:border-subtext1 transition-colors group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={contributor.avatarUrl}
                      alt={contributor.name}
                      className="w-12 h-12 grayscale group-hover:grayscale-0 transition-all"
                    />
                    <div>
                      <div className="font-mono font-semibold text-bright-text group-hover:text-blue transition-colors">
                        {contributor.name}
                      </div>
                      <div className="text-xs text-subtext1">
                        @{contributor.username}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-subtext0 mb-3">
                    {contributor.role}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {contributor.contributions.map((contrib) => (
                      <span
                        key={contrib}
                        className="text-xs bg-surface1 text-subtext0 px-2 py-1"
                      >
                        {contrib}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>

            {/* Links */}
            <div className="border border-subtext2 bg-surface0 p-6">
              <div className="font-mono text-xs text-subtext1 uppercase tracking-wider mb-4">
                Get Involved
              </div>
              <div className="flex gap-6">
                <a
                  href="https://github.com/oxidescheme"
                  className="flex items-center gap-2 text-subtext0 hover:text-bright-text transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="font-mono text-sm">GitHub Organization</span>
                </a>
                <a
                  href="https://discord.gg/oxidescheme"
                  className="flex items-center gap-2 text-subtext0 hover:text-bright-text transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  <span className="font-mono text-sm">Discord Server</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-subtext2 bg-mantle">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="font-mono text-xs text-subtext1">
            oxide 2025 - Where function meets form
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/oxidescheme"
              className="text-subtext1 hover:text-blue transition-colors text-xs font-mono"
            >
              @oxidescheme
            </a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
