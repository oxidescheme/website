import Link from "next/link";
import { stats } from "@/data/contributors";
import { ports } from "@/data/ports";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 w-full flex flex-1 items-center">
      <div className="animate-fadeIn w-full">
        <div className="grid grid-cols-12 gap-8 mb-16">
          <div className="col-span-8">
            <h1 className="font-mono text-6xl font-bold text-bright-text leading-none mb-6">
              Where function
              <br />
              <span className="text-blue">meets form</span>
            </h1>
            <p className="text-xl text-subtext0 leading-relaxed max-w-xl">
              A minimal colorscheme ecosystem designed for terminals and code
              editors. No compromises.
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
            <Link
              href="/ports"
              className="font-mono text-xs text-blue hover:text-bright-text transition-colors"
            >
              View all
            </Link>
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
                <p className="text-sm text-subtext1 mb-4">{port.description}</p>
                <div className="text-xs text-subtext1">
                  {port.downloads.toLocaleString()} downloads
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
