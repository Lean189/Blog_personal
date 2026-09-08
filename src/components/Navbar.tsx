"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Feather } from "lucide-react";

const navItems = [
  { href: "/", label: "Blog" },
  { href: "/acerca-de", label: "Acerca de mí" },
  { href: "/feedback", label: "Feedback" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-[#09090b]/80 border-b border-zinc-200/60 dark:border-zinc-800/60 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group font-semibold text-zinc-900 dark:text-zinc-100 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-serif text-sm font-bold shadow-xs">
            L
          </div>
          <span className="tracking-tight text-base font-medium">Lean</span>
        </Link>

        {/* Navigation Links & Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="flex items-center gap-1 text-sm font-medium">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/" || pathname.startsWith("/blog")
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full transition-colors ${
                    isActive
                      ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/70 font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-1 sm:mx-1.5" />

          {/* Selector de tema */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
