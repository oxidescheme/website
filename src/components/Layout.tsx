import Link from "next/link";
import { BrandMark } from "./BrandMark";

interface HeaderProps {
  currentPath: string;
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/ports", label: "Ports" },
  { href: "/userstyles", label: "Userstyles" },
  { href: "/colors", label: "Colors" },
  { href: "/community", label: "Community" },
];

export function Header({ currentPath }: HeaderProps) {
  return (
    <header className="border-b border-surface2">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-8 px-5 md:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-bright-text"
          aria-label="oxide home"
        >
          <BrandMark className="size-8" />
          <span className="text-[25px] leading-none font-medium">oxide</span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={currentPath === item.href ? "page" : undefined}
              className={`font-mono text-xs transition-colors hover:text-bright-text ${
                currentPath === item.href ? "text-bright-text" : "text-subtext1"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://github.com/oxidescheme"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 font-mono text-xs text-subtext0 transition-colors hover:text-bright-text md:block"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
      <nav
        className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-5 pb-4 md:hidden"
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={currentPath === item.href ? "page" : undefined}
            className={`shrink-0 font-mono text-xs transition-colors hover:text-bright-text ${
              currentPath === item.href ? "text-bright-text" : "text-subtext1"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-surface2">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-5 py-8 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div className="flex items-center gap-3 text-bright-text">
          <BrandMark className="size-6" />
          <span className="text-[16px] font-medium">oxide</span>
        </div>
        <div className="flex gap-6 font-mono text-xs text-subtext1">
          <a
            href="https://github.com/oxidescheme"
            className="transition-colors hover:text-bright-text"
          >
            GitHub ↗
          </a>
          <a
            href="https://github.com/sponsors/oxidescheme"
            className="transition-colors hover:text-bright-text"
          >
            Sponsor ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
