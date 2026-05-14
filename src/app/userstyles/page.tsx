import type { Metadata } from "next";
import { UserstylesList } from "@/components/UserstylesList";
import { getUserstyles } from "@/lib/github";

export const metadata: Metadata = {
  title: "userstyles",
};

export const revalidate = 86400;

export default async function UserstylesPage() {
  const userstyles = await getUserstyles();

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
      <div className="animate-fadeIn">
        <div className="mb-8">
          <h2 className="font-mono text-4xl font-bold text-bright-text mb-2">
            Userstyles
          </h2>
          <p className="text-subtext0">
            Oxide dark theme for your favorite websites
          </p>
        </div>

        <div className="border border-subtext2 bg-surface0 rounded-md p-6 mb-8">
          <h3 className="font-mono text-sm text-bright-text mb-2">
            Installation
          </h3>
          <p className="text-sm text-subtext0 mb-4">
            Install the{" "}
            <a
              href="https://github.com/openstyles/stylus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bright-text underline underline-offset-2 hover:text-white transition-colors"
            >
              Stylus
            </a>{" "}
            browser extension, then import all userstyles at once or install
            individually.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/oxidescheme/userstyles/raw/main/dist/import.json"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs px-4 py-2 bg-surface1 border border-subtext2 text-bright-text hover:border-subtext1 hover:bg-surface2 transition-colors rounded-md"
              >
                Import All (import.json)
              </a>
              <a
                href="https://github.com/oxidescheme/userstyles"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs px-4 py-2 bg-base border border-subtext2 text-subtext0 hover:border-subtext1 hover:text-bright-text transition-colors rounded-md"
              >
                View Source
              </a>
            </div>
            
            <a
              href="https://github.com/oxidescheme/userstyles/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-subtext1 hover:text-bright-text transition-colors flex items-center gap-2"
            >
              Missing a website?
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        <UserstylesList initialStyles={userstyles} />
      </div>
    </main>
  );
}
