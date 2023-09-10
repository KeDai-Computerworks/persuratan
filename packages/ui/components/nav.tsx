"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@acme/tailwind-config/lib/utils";

import type { NavItem } from "../types/nav";
import { Icons } from "./icons";

interface NavProps {
  items?: NavItem[];
  href?: string;
  name: string;
}

export function Nav({ items, name, href = "/" }: NavProps) {
  const pathname = usePathname();
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href={href} className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="inline-block font-bold">{name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm",
                    item.disabled && "cursor-not-allowed opacity-80",
                    pathname !== item.href ?? "/"
                      ? "text-muted-foreground font-medium"
                      : "font-semibold",
                  )}
                >
                  {item.title}
                </Link>
              ),
          )}
        </nav>
      ) : null}
    </div>
  );
}
