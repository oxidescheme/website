import { getOrgStats, getPorts } from "@/lib/github";

export const revalidate = 86400;

interface Port {
  id: string;
  name: string;
  description: string;
  platform: string;
  githubUrl: string;
  stars: number;
  lastUpdated: string;
  homepage: string | null;
}

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

        <div className="grid grid-cols-2 gap-4">
          {ports.map((port: Port) => (
            <div
              key={port.id}
              className="border border-subtext2 bg-surface0 rounded-md p-6 hover:border-subtext1 transition-colors group"
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
                <div className="flex items-center gap-4">
                  {port.stars > 0 && (
                    <span className="text-xs text-subtext1 flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <title>star icon</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-mono text-subtext0">
                        {port.stars.toLocaleString()}
                      </span>{" "}
                      stars
                    </span>
                  )}
                  {port.lastUpdated && (
                    <span className="text-xs text-subtext1">
                      updated {new Date(port.lastUpdated).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <a
                  href={port.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue hover:text-bright-text transition-colors text-xs font-mono"
                >
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
