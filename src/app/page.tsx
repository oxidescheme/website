import Link from "next/link";
import { getPorts } from "@/lib/github";

export const revalidate = 86400;

export default async function Home() {
  const ports = await getPorts();
  const totalStars = ports.reduce((sum, port) => sum + port.stars, 0);
  const totalPorts = ports.length;
  const featuredPorts = ports.slice(0, 3);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-5 md:px-8">
      <section className="flex border-b border-surface2 py-24 md:py-28 lg:min-h-[850px] lg:items-center lg:py-32">
        <div className="w-full max-w-5xl">
          <h1 className="text-[clamp(3.9rem,8.4vw,8rem)] leading-[0.94] font-medium tracking-[-0.06em] text-bright-text">
            Where function
            <br />
            <span className="text-subtext1">meets form.</span>
          </h1>
          <p className="mt-9 max-w-xl text-[16px] leading-relaxed text-subtext0 md:text-lg">
            Oxide gives editors and terminals a quiet monochrome foundation.
            Color appears where it helps you read code or understand state.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/ports"
              className="inline-flex items-center gap-4 rounded-sm bg-bright-text px-5 py-3 text-sm font-medium text-mantle transition-colors hover:bg-text"
            >
              Explore ports <span aria-hidden="true">↗</span>
            </Link>
            <Link
              href="/colors"
              className="inline-flex items-center rounded-sm border border-surface2 px-5 py-3 text-sm text-bright-text transition-colors hover:bg-surface0"
            >
              View palette
            </Link>
          </div>
          <dl className="mt-16 flex max-w-xl gap-10 border-t border-surface2 pt-5 font-mono text-xs">
            <div>
              <dt className="text-subtext1">Ports</dt>
              <dd className="mt-1 text-[16px] text-bright-text">
                {totalPorts}
              </dd>
            </div>
            <div>
              <dt className="text-subtext1">GitHub stars</dt>
              <dd className="mt-1 text-[16px] text-bright-text">
                {totalStars.toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="border-b border-surface2 py-20 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Across your workspace</p>
            <h2 className="text-4xl leading-tight font-medium tracking-[-0.045em] text-bright-text md:text-6xl">
              One palette. Many tools.
            </h2>
          </div>
          <Link
            href="/ports"
            className="font-mono text-xs text-subtext0 transition-colors hover:text-bright-text"
          >
            All ports ↗
          </Link>
        </div>
        {featuredPorts.length > 0 ? (
          <div className="border-t border-surface2">
            {featuredPorts.map((port) => (
              <a
                key={port.id}
                href={port.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-2 border-b border-surface2 py-5 transition-colors hover:bg-surface0/50 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] sm:items-center sm:gap-8 sm:px-3"
              >
                <span className="text-lg font-medium text-bright-text">
                  {port.name}
                </span>
                <span className="text-sm text-subtext0">
                  {port.description}
                </span>
                <span className="font-mono text-xs text-subtext1 group-hover:text-bright-text">
                  {port.platform} ↗
                </span>
              </a>
            ))}
          </div>
        ) : (
          <div className="border-y border-surface2 py-10 text-sm text-subtext0">
            The port list is temporarily unavailable. Browse the projects on{" "}
            <a
              className="text-bright-text underline underline-offset-4"
              href="https://github.com/oxidescheme"
            >
              GitHub
            </a>
            .
          </div>
        )}
      </section>

      <section className="grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="eyebrow mb-4">The idea</p>
          <h2 className="text-4xl leading-tight font-medium tracking-[-0.045em] text-bright-text md:text-6xl">
            Monochrome first.
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-subtext0">
            Neutral surfaces and clear text do the everyday work. Accent colors
            have a specific job, so they stay useful when they appear.
          </p>
        </div>
        <div className="border-t border-surface2">
          <div className="flex items-center justify-between gap-4 border-b border-surface2 py-5">
            <span className="text-sm text-text">Surface</span>
            <div className="flex gap-1" aria-hidden="true">
              {["#121212", "#161616", "#222222", "#2e2e2e", "#3a3a3a"].map(
                (color) => (
                  <span
                    key={color}
                    className="size-5 border border-white/10"
                    style={{ backgroundColor: color }}
                  />
                ),
              )}
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 border-b border-surface2 py-5">
            <span className="text-sm text-text">Text</span>
            <span className="font-mono text-xs text-subtext1">
              bright / primary / muted
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 border-b border-surface2 py-5">
            <span className="text-sm text-text">Color</span>
            <span className="font-mono text-xs text-subtext1">
              syntax / meaningful states
            </span>
          </div>
          <Link
            href="/colors"
            className="mt-6 inline-block font-mono text-xs text-bright-text transition-colors hover:text-subtext0"
          >
            Explore the palette ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
