import { getUserstyles } from "@/lib/github";

export const revalidate = 86400;

interface Userstyle {
  slug: string;
  name: string;
  description: string;
  installUrl: string;
  sourceUrl: string;
}

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
              className="text-blue hover:text-bright-text transition-colors"
            >
              Stylus
            </a>{" "}
            browser extension, then import all userstyles at once or install
            individually.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/oxidescheme/userstyles/raw/main/dist/import.json"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs px-4 py-2 bg-base border border-subtext2 text-bright-text hover:border-teal hover:text-teal transition-colors rounded-md"
            >
              Import All (import.json)
            </a>
            <a
              href="https://github.com/oxidescheme/userstyles"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs px-4 py-2 bg-base border border-subtext2 text-subtext0 hover:border-teal hover:text-teal transition-colors rounded-md"
            >
              View Source
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {userstyles.map((style: Userstyle) => (
            <div
              key={style.slug}
              className="border border-subtext2 bg-surface0 rounded-md p-6 hover:border-subtext1 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-mono font-semibold text-bright-text text-xl group-hover:text-teal transition-colors">
                  {style.name}
                </h3>
                <span className="font-mono text-xs text-subtext1 uppercase">
                  website
                </span>
              </div>

              <p className="text-sm text-subtext0 mb-4">{style.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-subtext2">
                <a
                  href={style.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-subtext1 hover:text-bright-text transition-colors text-xs font-mono"
                >
                  Source
                </a>
                <a
                  href={style.installUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:text-bright-text transition-colors text-xs font-mono"
                >
                  Install
                </a>
              </div>
            </div>
          ))}
        </div>

        {userstyles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-subtext1 font-mono text-sm">
              No userstyles available yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
