"use client";

/**
 * Dropdown de cuenta para la navbar (desktop).
 *
 * Con sesión iniciada:
 * - Muestra el nombre del usuario y un dropdown con las opciones
 *   de cuenta y el cierre de sesión.
 *
 * Sin sesión:
 * - Muestra un enlace "Iniciar Sesión" en dos líneas.
 */

import NextLink from "next/link";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { ROUTES } from "@/lib/routes";
import { ACCOUNT_LINKS } from "@/features/auth/constants/account-links.constants";
import { useAuthStore, type User as AuthUser } from "@/stores/auth.store";
import { useLogout } from "@/features/auth/hooks";

/**
 * Dropdown de cuenta para usuarios autenticados (desktop).
 */
function AccountDropdown({
  user,
  onLogout,
}: {
  user: AuthUser | null;
  onLogout: () => void;
}) {
  const fullName = user?.lastName
    ? `${user.firstName} ${user.lastName}`
    : (user?.firstName ?? "Usuario");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Menú de cuenta"
          className="group flex items-center gap-3 rounded-lg px-3 py-2 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/40 data-[state=open]:bg-primary-foreground/10 data-[state=open]:text-primary-foreground"
        >
          <UserAvatar name={fullName} className="h-11 w-11" />

          <span className="flex max-w-28 flex-col items-center leading-tight">
            <span className="truncate font-bold text-primary-foreground">
              ¡Hola {user?.firstName}
            </span>
            <span className="truncate font-bold text-primary-foreground">
              {user?.lastName}!
            </span>
          </span>

          <ChevronDown
            size={16}
            className="shrink-0 text-primary-foreground/50 transition-transform duration-200 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72 p-2">
        {/* Encabezado con datos del usuario */}
        <div className="flex items-center gap-3 px-2 py-3">
          <UserAvatar name={fullName} className="h-10 w-10" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-secondary-foreground">
              {fullName}
            </p>
            <p className="truncate text-xs text-secondary-foreground/60">
              {user?.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Opciones de navegación de la cuenta. */}
        <div className="custom-scrollbar max-h-80 overflow-y-auto py-1">
          {ACCOUNT_LINKS.map((link) => {
            const Icon = link.icon;

            return (
              <DropdownMenuItem
                key={link.href}
                asChild
                className="cursor-pointer gap-3 rounded-md px-3 py-3.5 transition-colors hover:bg-accent/20"
              >
                <NextLink href={link.href}>
                  <Icon
                    size={18}
                    className="shrink-0 text-foreground/70"
                    aria-hidden="true"
                  />
                  <span className="truncate text-sm font-medium text-secondary-foreground">
                    {link.label}
                  </span>
                </NextLink>
              </DropdownMenuItem>
            );
          })}
        </div>

        <DropdownMenuSeparator />

        {/* Acción para cerrar la sesión. */}
        <DropdownMenuItem
          variant="destructive"
          onSelect={onLogout}
          className="cursor-pointer justify-center gap-2 rounded-md py-3.5 text-sm font-medium"
        >
          <IoLogOut aria-hidden="true" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Dropdown principal de cuenta.
 */
export function UserMiniDropdown() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const { mutate: handleLogout } = useLogout();

  const isAuthenticated = !!token;

  if (isAuthenticated) {
    return <AccountDropdown user={user} onLogout={handleLogout} />;
  }

  return (
    <NextLink
      href={ROUTES.login}
      aria-label="Iniciar sesión"
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/40"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10">
        <FaUser size={20} aria-hidden="true" />
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span className="font-bold text-primary-foreground">¡Hola!</span>
        <span className="text-sm font-bold text-primary-foreground">
          Iniciar Sesión
        </span>
      </span>
    </NextLink>
  );
}