import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { PortsList } from "@/components/PortsList";
import { getPorts } from "@/lib/github";

export const metadata: Metadata = {
  title: "ports",
};

export const revalidate = 86400;

export default async function PortsPage() {
  const ports = await getPorts();
  const totalStars = ports.reduce((sum, port) => sum + port.stars, 0);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-5 pb-24 md:px-8">
      <PageIntro
        label="Ecosystem / Ports"
        title="Ports."
        description="The same quiet palette, adapted for the tools you use every day."
        aside={
          <span className="font-mono text-xs text-subtext1">
            {ports.length} available / {totalStars.toLocaleString()} stars
          </span>
        }
      />

      <section className="pt-10" aria-label="Available ports">
        <PortsList initialPorts={ports} />
      </section>

      <section className="mt-20 grid gap-6 border-t border-surface2 pt-8 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <p className="eyebrow mb-3">Contribute</p>
          <h2 className="text-2xl font-medium tracking-[-0.03em] text-bright-text">
            Missing your tool?
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-subtext0">
            See the open requests, or start a new port from the template.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/oxidescheme/oxide/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-surface2 px-4 py-2.5 font-mono text-xs text-bright-text transition-colors hover:bg-surface0"
          >
            View requests ↗
          </a>
          <a
            href="https://github.com/oxidescheme/template"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-surface2 px-4 py-2.5 font-mono text-xs text-bright-text transition-colors hover:bg-surface0"
          >
            Use template ↗
          </a>
        </div>
      </section>
    </main>
  );
}
