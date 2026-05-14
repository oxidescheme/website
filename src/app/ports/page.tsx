import type { Metadata } from "next";
import { PortsList } from "@/components/PortsList";
import { getOrgStats, getPorts } from "@/lib/github";

export const metadata: Metadata = {
  title: "ports",
};

export const revalidate = 86400;

export default async function PortsPage() {
  const ports = await getPorts();
  const { totalStars } = await getOrgStats();

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
          <div className="text-right">
            <div className="font-mono text-2xl text-bright-text">
              {totalStars.toLocaleString()}
            </div>
            <div className="text-xs text-subtext1">total stars</div>
          </div>
        </div>

        <div className="border border-subtext2 bg-surface0 rounded-md p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-mono text-sm text-bright-text mb-1">
              Missing your favorite tool?
            </h3>
            <p className="text-sm text-subtext0">
              Check out our open requests or create your own port using our template.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="https://github.com/oxidescheme/oxide/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs px-4 py-2 bg-surface1 border border-subtext2 text-bright-text hover:border-subtext1 hover:bg-surface2 transition-colors rounded-md"
            >
              View Requests
            </a>
            <a
              href="https://github.com/oxidescheme/template"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs px-4 py-2 bg-base border border-subtext2 text-subtext0 hover:border-subtext1 hover:text-bright-text transition-colors rounded-md"
            >
              Use Template
            </a>
          </div>
        </div>

        <PortsList initialPorts={ports} />
      </div>
    </main>
  );
}
