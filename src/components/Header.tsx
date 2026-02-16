"use client";

import { usePathname } from "next/navigation";
import { Header as HeaderComponent } from "./Layout";

export function Header() {
  const pathname = usePathname();
  return <HeaderComponent currentPath={pathname} />;
}
