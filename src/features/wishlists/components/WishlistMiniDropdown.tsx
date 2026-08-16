"use client";

/**
 * Dropdown de wishlists en la navbar (desktop).
 * Muestra el listado de listas del usuario autenticado o un estado vacío
 * para no autenticados.
 */

import NextLink from "next/link";
import { FaHeart } from "react-icons/fa";
import { IconButton } from "@/components/shared/IconButton";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ROUTES, clientWishlistDetail } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";
import { useWishlists } from "@/features/wishlists/hooks";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

export function WishlistMiniDropdown() {
  const isAuthenticated = useAuthStore((s) => !!s.token);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton icon={FaHeart} label="Favoritos" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-6">
        {isAuthenticated ? <AuthenticatedDropdown /> : <UnauthDropdown />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AuthenticatedDropdown() {
  const { data: wishlists, isLoading } = useWishlists();

  return (
    <div>
      <div className="flex items-center justify-center gap-2 px-4 py-3 border-b border-border/10 bg-accent/30 rounded-md">
        <FaHeart size={14} className="text-foreground" aria-hidden="true" />
        <span className="font-semibold text-sm text-secondary-foreground">
          Mis listas de deseos
        </span>
      </div>

      <div
        className="max-h-72 overflow-y-auto custom-scrollbar"
        aria-live="polite"
      >
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 py-10">
            <Spinner className="size-5 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">Cargando listas...</p>
          </div>
        ) : !wishlists || wishlists.length === 0 ? (
          <div className="flex flex-col items-center text-center gap-3 py-10">
            <div className="rounded-full bg-card flex items-center justify-center w-12 h-12">
              <FaHeart
                size={22}
                className="text-muted-foreground/50"
                aria-hidden="true"
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-secondary-foreground">
                Todavía no creaste ninguna lista
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Crea una lista para guardar tus libros favoritos.
              </p>
            </div>
            <Button asChild size="sm" className="mt-1">
              <NextLink href={ROUTES.client.wishlist}>
                Crear mi primera lista
              </NextLink>
            </Button>
          </div>
        ) : (
          <ul>
            {wishlists.map((wishlist, index) => (
              <li key={wishlist.id}>
                <NextLink
                  href={clientWishlistDetail(wishlist.id)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 hover:bg-accent/30 transition-colors rounded-md",
                    index < wishlists.length - 1
                      ? "border-b border-border/10"
                      : "",
                  )}
                >
                  <span className="rounded-full bg-accent flex items-center justify-center w-8 h-8 shrink-0">
                    <FaHeart
                      size={13}
                      className="text-foreground"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-sm font-medium text-secondary-foreground truncate">
                    {wishlist.name}
                  </span>
                </NextLink>
              </li>
            ))}
          </ul>
        )}
      </div>

      {wishlists && wishlists.length > 0 && (
        <div className="border-t border-border/10 px-4 py-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="w-full justify-center text-sm text-foreground py-4"
          >
            <NextLink href={ROUTES.client.wishlist}>
              Ver todas mis listas
            </NextLink>
          </Button>
        </div>
      )}
    </div>
  );
}

function UnauthDropdown() {
  return (
    <div>
      <div className="flex flex-col items-center gap-4 px-4 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-card">
          <FaHeart
            size={24}
            className="text-muted-foreground"
            aria-hidden="true"
          />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-secondary-foreground">
            Guarda tus libros favoritos
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Inicia sesión para crear listas y guardar los libros que te
            interesan.
          </p>
        </div>
        <Button asChild size="sm" className="w-full">
          <NextLink href={ROUTES.login}>Iniciar sesión</NextLink>
        </Button>
      </div>
    </div>
  );
}