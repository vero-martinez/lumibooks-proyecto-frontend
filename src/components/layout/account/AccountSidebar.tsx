"use client";

/**
 * Sidebar de navegación del área de cuenta (/client).
 * Muestra el saludo del usuario y los accesos a las secciones de cuenta.
 * En desktop es una columna fija a la izquierda; en mobile, el saludo
 * siempre visible arriba y un encabezado "Mi cuenta" colapsable.
 */
import { useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { useAuthStore, type User as AuthUser } from "@/stores/auth.store";
import { ACCOUNT_LINKS } from "@/features/auth/constants/account-links.constants";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

function isAccountLinkActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function AccountGreeting({ user }: { user: AuthUser }) {
  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || "Usuario";

  return (
    <div className="overflow-hidden rounded-xl border border-accent/30 bg-accent/15 px-4 py-4">
      <div className="flex items-center gap-3">
        <UserAvatar
          name={fullName}
          className="h-12 w-12 shrink-0 ring-2 ring-accent/40 ring-offset-2 ring-offset-background"
        />
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground">
            ¡Hola de nuevo!
          </p>
          <p className="truncate text-base font-bold text-foreground">
            {user.firstName}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}

function AccountNavList({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {ACCOUNT_LINKS.map((link) => {
        const Icon = link.icon;
        const active = isAccountLinkActive(pathname, link.href);

        return (
          <NextLink
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
            className={cn(
              "group relative flex items-center gap-3 whitespace-nowrap rounded-xl border px-4 py-4 text-base font-medium shadow-sm transition-[background-color,border-color,box-shadow,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              active
                ? "border-transparent bg-accent text-foreground"
                : "border-border/60 bg-muted/40 text-muted-foreground hover:border-transparent hover:bg-accent hover:text-foreground hover:shadow-md",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-y-1.5 left-0 w-1 rounded-full bg-foreground transition-opacity",
                active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
              )}
            />
            <Icon
              size={22}
              className={cn(
                "shrink-0 transition-colors",
                active
                  ? "text-foreground"
                  : "text-muted-foreground/70 group-hover:text-foreground",
              )}
              aria-hidden="true"
            />
            <span className={cn("truncate", active && "font-semibold")}>
              {link.label}
            </span>
          </NextLink>
        );
      })}
    </div>
  );
}

export function AccountSidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Secciones de tu cuenta" className="md:w-64 md:shrink-0">
      {/* Mobile: saludo fijo arriba + header colapsable para las opciones */}
      <div className="flex flex-col gap-3 md:hidden">
        {user && <AccountGreeting user={user} />}

        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className={cn(
                "flex w-full items-center justify-between rounded-xl border border-border/60 bg-muted/40 px-4 py-4 text-base font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                open && "rounded-b-none border-b-transparent",
              )}
            >
              <span className="flex items-center gap-3">
                <User
                  size={20}
                  className="text-muted-foreground/70"
                  aria-hidden="true"
                />
                Mi cuenta
              </span>
              <ChevronDown
                size={18}
                className={cn(
                  "text-muted-foreground/70 transition-transform duration-200",
                  open && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent className="overflow-hidden rounded-b-xl border border-t-0 border-border/60 bg-muted/20 px-4 pb-4 pt-4 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <AccountNavList
              pathname={pathname}
              onNavigate={() => setOpen(false)}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop: columna fija */}
      <div className="hidden flex-col gap-6 md:flex">
        {user && <AccountGreeting user={user} />}

        <div className="flex flex-col gap-3">
          <span className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Mi cuenta
          </span>
          <AccountNavList pathname={pathname} />
        </div>
      </div>
    </nav>
  );
}