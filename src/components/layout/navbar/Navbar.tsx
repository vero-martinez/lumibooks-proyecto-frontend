"use client";

import { useBookSearchBar } from "@/features/books/hooks";
import { CartMiniDropdown } from "@/features/cart/components/CartMiniDropdown";
import { NavLogo } from "./NavLogo";
import { NavbarSearchBar } from "./NavbarSearchBar";
import { DesktopNavActions } from "./DesktopNavActions";
import { MobileMenu } from "./MobileMenu";
import { BottomNavLinks } from "./BottomNavLinks";

export function Navbar() {
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

  const searchBarProps = {
    query,
    suggestions,
    isFetching,
    showDropdown,
    onChange: handleChange,
    onFocus: handleFocus,
    onSubmit: goToCatalog,
    onSelectSuggestion: goToDetail,
    onViewAll: goToCatalog,
    onCloseDropdown: close,
  };

  return (
    <div className="sticky top-0 z-50 shadow-lg bg-foreground/95 backdrop-blur-sm">
      <header className="w-full bg-foreground px-4 md:px-6 py-3 md:py-4">
        {/* Fila superior: logo, buscador desktop, iconos y menú hamburguesa */}
        <div className="max-w-7xl mx-auto flex items-center gap-4 md:gap-12">
          {/* Logo */}
          <NavLogo />

          {/* Buscador desktop (se oculta en mobile) */}
          <div className="hidden lg:flex flex-1 max-w-xl">
            <NavbarSearchBar {...searchBarProps} />
          </div>

          {/* Iconos desktop: carrito, favoritos e inicio de sesión */}
          <DesktopNavActions />

          {/* Botones mobile: carrito y menú hamburguesa */}
          <div className="lg:hidden ml-auto flex items-center gap-4">
            <CartMiniDropdown />

            <MobileMenu />
          </div>
        </div>
      </header>

      {/* Buscador mobile (debajo del header) */}
      <div className="lg:hidden bg-foreground px-4 pb-3">
        <NavbarSearchBar {...searchBarProps} />
      </div>

      {/* Navegación inferior: Inicio, Libros, Autores */}
      <BottomNavLinks />
    </div>
  );
}