"use client";

import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { IoMdCloseCircle } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { SearchBar } from "@/components/shared/SearchBar";
import { Link } from "@/components/shared/Link";
import { useBookSearchBar } from "@/features/books/hooks";
import { BookSearchDropdown } from "@/features/books/components/BookSearchDropdown";
import { CartMiniDropdown } from "@/features/cart/components/CartMiniDropdown";
import { WishlistMiniDropdown } from "@/features/wishlists/components";
import { UserMenu } from "@/features/auth/components/UserMenu";

interface NavLink {
  href: string;
  label: string;
}

// Links del menú de navegación inferior
const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/books", label: "Libros" },
  { href: "/authors", label: "Autores" },
];

export function Navbar() {
  // Controla la apertura/cierre del menú hamburguesa en mobile
  const [menuOpen, setMenuOpen] = useState(false);

  // Estado y lógica del buscador global (query, sugerencias, navegación)
  const {
    query,
    suggestions,
    isFetching,
    showDropdown,
    handleChange,
    handleFocus,
    goToDetail,
    goToCatalog,
    close,
  } = useBookSearchBar();

  const closeMobileMenu = () => setMenuOpen(false);

  // Cierra el menú mobile al presionar Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Renderiza el dropdown de sugerencias dentro del SearchBar
  const renderDropdown = useCallback(
    () => (
      <BookSearchDropdown
        suggestions={suggestions}
        isFetching={isFetching}
        showDropdown={showDropdown}
        query={query}
        onSelectSuggestion={goToDetail}
        onViewAll={goToCatalog}
      />
    ),
    [suggestions, isFetching, showDropdown, query, goToDetail, goToCatalog],
  );

  return (
    <div className="sticky top-0 z-50 shadow-lg bg-foreground/95 backdrop-blur-sm">
      <header className="w-full bg-foreground px-4 md:px-6 py-3 md:py-4">
        {/* Fila superior: logo, buscador desktop, iconos y menú hamburguesa */}
        <div className="max-w-7xl mx-auto flex items-center gap-4 md:gap-12">
          {/* Logo */}
          <NextLink href="/" className="flex items-center gap-4 shrink-0">
            <Image
              src="/logo.svg"
              alt="LumiBooks"
              width={70}
              height={70}
              className="md:w-[85px] md:h-[85px]"
            />
            <span
              className="font-extrabold text-background text-xl lg:text-2xl tracking-tight drop-shadow-sm"
              aria-hidden="true"
            >
              LumiBooks
            </span>
          </NextLink>

          {/* Buscador desktop (se oculta en mobile) */}
          <div className="hidden lg:flex flex-1 max-w-xl">
            <SearchBar
              value={query}
              onChange={handleChange}
              onSubmit={goToCatalog}
              onFocus={handleFocus}
              placeholder="Buscar por título, autor o ISBN..."
              renderDropdown={renderDropdown}
              onCloseDropdown={close}
              className="focus-within:ring-0 focus-within:border-input"
            />
          </div>

          {/* Iconos desktop: carrito, favoritos e inicio de sesión */}
          <div className="hidden lg:flex items-center gap-6 shrink-0">
            <CartMiniDropdown />

            <WishlistMiniDropdown />

            <UserMenu variant="full" />
          </div>

          {/* Botones mobile: carrito y menú hamburguesa */}
          <div className="lg:hidden ml-auto flex items-center gap-4">
            <CartMiniDropdown />

            <button
              className="text-background transition-transform duration-200 hover:scale-110"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Menú"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`block transition-transform duration-200 ${menuOpen ? "rotate-90" : ""}`}
              >
                {menuOpen ? (
                  <IoMdCloseCircle size={28} />
                ) : (
                  <TiThMenu size={28} />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Menú desplegable en mobile */}
        <div
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-6 flex flex-col gap-4 border-t border-primary-foreground/20">
            <WishlistMiniDropdown variant="mobile" onAction={closeMobileMenu} />

            <UserMenu variant="compact" onAction={closeMobileMenu} />
          </div>
        </div>
      </header>

      {/* Buscador mobile (debajo del header) */}
      <div className="lg:hidden bg-foreground px-4 pb-3">
        <SearchBar
          value={query}
          onChange={handleChange}
          onSubmit={goToCatalog}
          onFocus={handleFocus}
          placeholder="Buscar por título, autor o ISBN..."
          renderDropdown={renderDropdown}
          onCloseDropdown={close}
          className="focus-within:ring-0 focus-within:border-input"
        />
      </div>

      {/* Navegación inferior: Inicio, Libros, Autores */}
      <nav className="flex w-full bg-accent">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-12">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-semibold relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-foreground after:transition-all after:duration-200 hover:after:w-full"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}