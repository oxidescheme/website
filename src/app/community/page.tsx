import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { coreContributors } from "@/data/contributors";

export const metadata: Metadata = {
  title: "community",
};

export default function CommunityPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-5 pb-24 md:px-8">
      <PageIntro
        label="People / Community"
        title="Community."
        description="The people who maintain ports, improve the palette, and bring oxide to new places."
      />

      <section className="pt-12 md:pt-16">
        <h2 className="mb-7 text-3xl font-medium tracking-[-0.04em] text-bright-text">
          Maintained by
        </h2>
        <div className="border-t border-surface2">
          {coreContributors.map((person) => (
            <a
              key={person.id}
              href={person.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-surface2 py-5 sm:flex-nowrap"
            >
              <Image
                src={person.avatarUrl}
                alt=""
                width={48}
                height={48}
                unoptimized
                className="size-12 shrink-0 rounded-sm grayscale"
              />
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-medium text-bright-text group-hover:underline group-hover:underline-offset-4">
                  {person.name}
                </h3>
                <p className="font-mono text-[11px] text-subtext1">
                  @{person.username}
                </p>
              </div>
              <span className="ml-[4.25rem] text-sm text-subtext0 sm:ml-0">
                {person.role}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-auto size-4 shrink-0 text-subtext1 transition-colors group-hover:text-bright-text sm:ml-4"
                aria-hidden="true"
              >
                <path d="M5 19 19 5M8 5h11v11" />
              </svg>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-16 flex flex-wrap items-end justify-between gap-7 border-t border-surface2 pt-8 md:mt-20">
        <div>
          <p className="eyebrow mb-3">Get involved</p>
          <h2 className="text-2xl font-medium tracking-[-0.03em] text-bright-text">
            Build with us.
          </h2>
        </div>
        <div className="flex gap-6 font-mono text-xs text-subtext0">
          <a
            href="https://github.com/oxidescheme"
            className="transition-colors hover:text-bright-text"
          >
            GitHub ↗
          </a>
          <a
            href="https://discord.gg/oxidescheme"
            className="transition-colors hover:text-bright-text"
          >
            Discord ↗
          </a>
        </div>
      </section>
    </main>
  );
}
