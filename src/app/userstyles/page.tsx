import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { UserstylesList } from "@/components/UserstylesList";
import { getUserstyles } from "@/lib/github";

export const metadata: Metadata = {
  title: "userstyles",
};

export const revalidate = 86400;

export default async function UserstylesPage() {
  const userstyles = await getUserstyles();

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-5 pb-24 md:px-8">
      <PageIntro
        label="Ecosystem / Web"
        title="Userstyles."
        description="The oxide palette for the websites you use alongside your editor."
        aside={
          <span className="font-mono text-xs text-subtext1">
            {userstyles.length} available
          </span>
        }
      />

      <section className="grid gap-6 border-b border-surface2 py-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div>
          <p className="eyebrow mb-3">Installation</p>
          <p className="max-w-2xl text-sm leading-relaxed text-subtext0">
            Install the{" "}
            <a
              href="https://github.com/openstyles/stylus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bright-text underline underline-offset-4"
            >
              Stylus extension
            </a>
            , then import the collection or choose individual styles below.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/oxidescheme/userstyles/raw/main/dist/import.json"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm bg-bright-text px-4 py-2.5 font-mono text-xs text-mantle transition-colors hover:bg-text"
          >
            Import all ↗
          </a>
          <a
            href="https://github.com/oxidescheme/userstyles"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-surface2 px-4 py-2.5 font-mono text-xs text-bright-text transition-colors hover:bg-surface0"
          >
            View source ↗
          </a>
        </div>
      </section>

      <section className="pt-10" aria-label="Available userstyles">
        <UserstylesList initialStyles={userstyles} />
      </section>

      <div className="mt-16 border-t border-surface2 pt-6">
        <a
          href="https://github.com/oxidescheme/userstyles/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-subtext0 transition-colors hover:text-bright-text"
        >
          Missing a website? See open requests ↗
        </a>
      </div>
    </main>
  );
}
