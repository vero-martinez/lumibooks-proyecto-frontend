"use client";

/**
 * Dropdown de wishlists en la navbar.
 * Muestra el listado de listas del usuario autenticado o un estado vacío para no autenticados.
 */
import NextLink from "next/link";
import { FaHeart } from "react-icons/fa";
import { IconButton } from "@/components/shared/IconButton";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/stores/auth.store";
import { useWishlists } from "@/features/wishlists/hooks";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

interface WishlistMiniDropdownProps {
  variant?: "icon" | "mobile";
  onAction?: () => void;
}

function MobileTrigger() {
  return (
    <DropdownMenuTrigger asChild>
      <button
        type="button"
        className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground rounded-md hover:bg-accent/10 transition-colors text-sm font-medium w-full"
      >
        <span className="rounded-full bg-accent flex items-center justify-center w-9 h-9 text-foreground">
          <FaHeart size={18} aria-hidden="true" />
        </span>
        <span className="text-sm font-medium">Mis listas</span>
      </button>
    </DropdownMenuTrigger>
  );
}

function DesktopTrigger() {
  return (
    <DropdownMenuTrigger asChild>
      <IconButton icon={FaHeart} label="Favoritos" />
    </DropdownMenuTrigger>
  );
}

export function WishlistMiniDropdown({ variant = "icon", onAction }: WishlistMiniDropdownProps) {
  const isAuthenticated = useAuthStore((s) => !!s.token);
  const isMobile = variant === "mobile";

  return (
    <DropdownMenu>
      {isMobile ? <MobileTrigger /> : <DesktopTrigger />}
      <DropdownMenuContent align={isMobile ? "start" : "end"} className="w-72 p-6">
        {isAuthenticated
          ? <AuthenticatedDropdown onAction={onAction} />
          : <UnauthDropdown />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AuthenticatedDropdown({ onAction }: { onAction?: () => void }) {
  const { data: wishlists, isLoading } = useWishlists();

  return (
    <div>
      <div className="flex items-center justify-center gap-2 px-4 py-3 border-b border-border/10 bg-accent/30 rounded-md">
        <FaHeart size={14} className="text-foreground" aria-hidden="true" />
        <span className="font-semibold text-sm text-secondary-foreground">
          Mis listas de deseos
        </span>
      </div>

      <div className="max-h-72 overflow-y-auto custom-scrollbar" aria-live="polite">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 py-10">
            <Spinner className="size-5 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">Cargando listas...</p>
          </div>
        ) : !wishlists || wishlists.length === 0 ? (
          <div className="flex flex-col items-center text-center gap-3 py-10">
            <div className="rounded-full bg-card flex items-center justify-center w-12 h-12">
              <FaHeart size={22} className="text-muted-foreground/50" aria-hidden="true" />
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
              <NextLink href="/client/wishlist" onClick={onAction}>
                Crear mi primera lista
              </NextLink>
            </Button>
          </div>
        ) : (
          <ul>
            {wishlists.map((wishlist, index) => (
              <li key={wishlist.id}>
                <NextLink
                  href={`/client/wishlist/${wishlist.id}`}
                  onClick={onAction}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-accent/30 transition-colors rounded-md ${
                    index < wishlists.length - 1 ? "border-b border-border/10" : ""
                  }`}
                >
                  <span className="rounded-full bg-accent flex items-center justify-center w-8 h-8 shrink-0">
                    <FaHeart size={13} className="text-foreground" aria-hidden="true" />
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
          <Button asChild variant="ghost" size="sm" className="w-full justify-center text-sm text-foreground py-4">
            <NextLink href="/client/wishlist" onClick={onAction}>
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
      <div className="flex items-center justify-center gap-2 px-4 py-3 border-b border-border/10 bg-accent/30 rounded-md">
        <span className="font-semibold text-sm text-secondary-foreground">
          Mis listas de deseos
        </span>
      </div>

      <div className="flex flex-col items-center text-center px-4 py-8 gap-4">
        <div className="rounded-full bg-card flex items-center justify-center w-14 h-14">
          <FaHeart size={24} className="text-muted-foreground" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-secondary-foreground">
            Guarda tus libros favoritos
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Inicia sesión para crear listas y guardar los libros que te interesan.
          </p>
        </div>
      </div>
    </div>
  );
}