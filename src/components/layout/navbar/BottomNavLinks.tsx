"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/components/shared/Link";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: ROUTES.home, label: "Inicio" },
  { href: ROUTES.books, label: "Libros" },
  { href: ROUTES.authors, label: "Autores" },
];

export function BottomNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-accent">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-8 overflow-x-auto px-6 py-3 sm:gap-12">
        {NAV_LINKS.map(({ href, label }) => {
          const isActive =
            href === ROUTES.home ? pathname === ROUTES.home : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative shrink-0 py-1 text-base font-semibold tracking-wide transition-colors duration-200 after:absolute after:-bottom-0.5 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-foreground after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:after:w-full",
                isActive
                  ? "text-foreground after:w-full"
                  : "text-foreground/70 hover:text-foreground",
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}