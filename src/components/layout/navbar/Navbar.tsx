/* components/layout/navbar/Navbar.tsx */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { IconButton } from "@/components/shared/IconButton";
import { SearchBar } from "@/components/shared/SearchBar";
import { AppLink } from "@/components/shared/AppLink";

interface NavLink {
  href: string;
  label: string;
}

// Enlaces de la barra de navegación secundaria (Inicio, Libros, Autores).
const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/books", label: "Libros" },
  { href: "/authors", label: "Autores" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Carrito: nunca navega, abre un dropdown propio.
  const openCartDropdown = () => {};

  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <div className="sticky top-0 z-50 shadow-lg">
      <header className="w-full bg-foreground px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-12">
          {/* LOGO — texto */}
          <Link href="/" className="flex items-center gap-4 shrink-0">
            <Image src="/logo.svg" alt="LumiBooks" width={85} height={85} />
            <span className="font-bold text-background text-xl lg:text-2xl">
              LumiBooks
            </span>
          </Link>

          {/* BARRA DE BÚSQUEDA — oculta en mobile (vive abajo, siempre visible) */}
          <div className="hidden lg:flex flex-1 max-w-xl">
            <SearchBar />
          </div>

          {/* ICONOS — ocultos en mobile */}
          <div className="hidden lg:flex items-center gap-6 shrink-0">
            <IconButton icon={FaShoppingCart} label="Carrito" onClick={openCartDropdown} />

            <Link href="/cliente/wishlist" aria-label="Favoritos">
              <IconButton icon={FaHeart} label="Favoritos" />
            </Link>

            <Link
              href="/login"
              className="flex flex-col items-start justify-center hover:opacity-80 transition-opacity"
            >
              <span className="font-bold text-primary-foreground">¡Hola!</span>
              <span className="text-sm font-bold text-primary-foreground">
                Iniciar Sesión
              </span>
            </Link>

            {/* Sin <Link>: abre un menú propio, no navega directo */}
            <IconButton icon={FaUser} label="Usuario" />
          </div>

          {/* ACCIONES MOBILE — carrito + hamburguesa, siempre visibles */}
          <div className="lg:hidden ml-auto flex items-center gap-4">
            {/* Mismo IconButton que en desktop, tamaño reducido para mobile */}
            <IconButton
              icon={FaShoppingCart}
              label="Carrito"
              size="sm"
              onClick={openCartDropdown}
            />

            <button
              className="text-background"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Menú"
            >
              {menuOpen ? <IoMdCloseCircle size={28} /> : <TiThMenu size={28} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-foreground px-6 py-6 flex flex-col gap-6 border-t border-primary-foreground/20">
            <div className="flex flex-col gap-4 text-background">
              <Link
                href="/cliente/wishlist"
                className="flex items-center gap-3 hover:opacity-80"
                onClick={closeMobileMenu}
              >
                <IconButton icon={FaHeart} label="Favoritos" size="sm" />
                <span className="text-sm font-medium">Favoritos</span>
              </Link>

              <Link
                href="/login"
                className="flex items-center gap-3 hover:opacity-80"
                onClick={closeMobileMenu}
              >
                <IconButton icon={FaUser} label="Usuario" size="sm" />
                <span className="text-sm font-medium">Iniciar Sesión</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* BÚSQUEDA MOBILE — siempre visible, debajo del nav secundario */}
      <div className="lg:hidden bg-foreground px-6 pt-4 pb-4">
        <SearchBar />
      </div>

      {/* BARRA DE NAVEGACIÓN SECUNDARIA */}
      <nav className="flex w-full bg-accent">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-12">
          {NAV_LINKS.map(({ href, label }) => (
            <AppLink key={href} href={href} className="hover:text-foreground font-semibold">
              {label}
            </AppLink>
          ))}
        </div>
      </nav>
    </div>
  );
}