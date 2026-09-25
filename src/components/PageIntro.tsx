import type { ReactNode } from "react";

interface PageIntroProps {
  label: string;
  title: string;
  description: string;
  aside?: ReactNode;
}

export function PageIntro({
  label,
  title,
  description,
  aside,
}: PageIntroProps) {
  return (
    <section className="border-b border-surface2 pb-12 pt-16 md:pb-16 md:pt-24">
      <div className="mb-6 flex items-center justify-between gap-6">
        <p className="eyebrow">{label}</p>
        {aside}
      </div>
      <h1 className="max-w-4xl text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.96] font-medium tracking-[-0.055em] text-bright-text">
        {title}
      </h1>
      <p className="mt-7 max-w-2xl text-[16px] leading-relaxed text-subtext0 md:text-lg">
        {description}
      </p>
    </section>
  );
}
