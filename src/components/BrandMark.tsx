interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className = "size-7" }: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 36V21c0-6.1 4.9-11 11-11h21v10H22c-1.1 0-2 .9-2 2v14H10Zm44-8v15c0 6.1-4.9 11-11 11H22V44h20c1.1 0 2-.9 2-2V28h10Z" />
    </svg>
  );
}
