"use client";

// import { ThemeToggle } from "~/components/theme-toggle"
import type { NavItem } from "../types/nav";
import { Nav } from "./nav";
import { ThemeToggle } from "./theme-toggle";

interface SiteHeaderProps {
  items?: NavItem[];
  name: string;
}

export function SiteHeader(props: SiteHeaderProps) {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Nav {...props} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2 ">
            <ThemeToggle />
            {/* <AvatarDropdownMenu /> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
