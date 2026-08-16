"use client";

import { useState } from "react";
import NextLink from "next/link";
import { IoMdCloseCircle } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { FaUser, FaHeart } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { useAuthStore } from "@/stores/auth.store";
import { useLogout } from "@/features/auth/hooks";
import { ROUTES } from "@/lib/routes";

const SECTION_LABEL =
  "px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/50";

const DIVIDER = "bg-primary-foreground/10";

const BORDER_DIVIDER = "border-primary-foreground/10";

const ITEM_CLASSES =
  "flex items-center gap-3 px-3 py-2.5 rounded-md text-primary-foreground/80 hover:text-primary-foreground hover:bg-accent/10 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const FOOTER_BUTTON_BASE =
  "w-full py-4 rounded-xl bg-accent text-foreground hover:bg-accent/90 transition-transform duration-150 active:scale-[0.98]";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useAuthStore((s) => !!s.token);
  const user = useAuthStore((s) => s.user);
  const { mutate: handleLogout } = useLogout();

  const closeMenu = () => setOpen(false);

  const handleLogoutClick = () => {
    handleLogout();
    closeMenu();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="rounded-full p-1 text-background transition-transform duration-200 ease-out hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/50"
          aria-label="Menú"
        >
          <span
            className={`block transition-transform duration-200 ease-out ${
              open ? "rotate-90" : ""
            }`}
          >
            {open ? <IoMdCloseCircle size={28} /> : <TiThMenu size={28} />}
          </span>
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className={`w-72 border-l ${BORDER_DIVIDER} bg-foreground p-0 text-primary-foreground sm:w-80`}
      >
        <SheetTitle className="sr-only">Menú</SheetTitle>
        <SheetDescription className="sr-only">
          Panel de navegación para dispositivos móviles
        </SheetDescription>

        <div className="flex h-full flex-col">
          {/* Encabezado: saludo del usuario o bienvenida */}
          <div className="flex items-center gap-3 px-6 py-6">
            {isAuthenticated && user ? (
              <UserAvatar
                name={
                  [user.firstName, user.lastName].filter(Boolean).join(" ") ||
                  "Usuario"
                }
                className="w-11 h-11 ring-2 ring-accent/50 ring-offset-2 ring-offset-foreground"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground"
              >
                <FaUser size={20} aria-hidden="true" />
              </span>
            )}

            <div className="min-w-0">
              {isAuthenticated ? (
                <>
                  <p className="truncate text-sm font-bold text-primary-foreground">
                    ¡Hola {user?.firstName}!
                  </p>
                  <p className="truncate text-xs text-primary-foreground/60">
                    {user?.email}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-bold text-primary-foreground">
                    ¡Bienvenido!
                  </p>
                  <p className="text-xs text-primary-foreground/60">
                    Inicia sesión para continuar
                  </p>
                </>
              )}
            </div>
          </div>

          <Separator className={DIVIDER} />

          {/* Opciones del menú */}
          <div className="custom-scrollbar flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
            <span className={SECTION_LABEL}>Listas</span>
            <NextLink
              href={ROUTES.client.wishlist}
              onClick={closeMenu}
              className={ITEM_CLASSES}
            >
              <span className="rounded-full bg-accent flex items-center justify-center w-9 h-9 text-foreground shrink-0">
                <FaHeart size={18} aria-hidden="true" />
              </span>
              <span className="text-sm font-medium">Mis listas</span>
            </NextLink>

            {isAuthenticated && (
              <>
                <Separator className={`my-5 ${DIVIDER}`} />
                <span className={SECTION_LABEL}>Cuenta</span>
                <NextLink
                  href={ROUTES.client.profile}
                  onClick={closeMenu}
                  className={ITEM_CLASSES}
                >
                  <span className="rounded-full bg-accent flex items-center justify-center w-9 h-9 text-foreground shrink-0">
                    <FaUser size={18} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium">Mi cuenta</span>
                </NextLink>
              </>
            )}
          </div>

          {/* Pie: cerrar sesión o iniciar sesión */}
          <div className={`border-t ${BORDER_DIVIDER} bg-foreground px-4 py-4`}>
            {isAuthenticated ? (
              <Button
                className={FOOTER_BUTTON_BASE}
                onClick={handleLogoutClick}
              >
                <IoLogOut aria-hidden="true" />
                Cerrar sesión
              </Button>
            ) : (
              <Button asChild className={FOOTER_BUTTON_BASE}>
                <NextLink href={ROUTES.login} onClick={closeMenu}>
                  <FaUser aria-hidden="true" />
                  Iniciar Sesión
                </NextLink>
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}