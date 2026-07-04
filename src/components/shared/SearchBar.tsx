/**
 * Barra de búsqueda con dropdown de sugerencias.
 *
 * Props principales:
 * - value / onChange: input controlado.
 * - onSubmit: se dispara al presionar Enter o el botón de búsqueda.
 * - renderDropdown: función que renderiza el contenido del dropdown.
 * - onCloseDropdown: se llama al hacer clic fuera del contenedor.
 *
 * Edge cases:
 * - Si no hay renderDropdown, no se adjunta el listener de cierre.
 */
"use client";

import { memo, useRef, type ReactNode } from "react";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  className?: string;
  /** Renderiza el dropdown de sugerencias debajo del input */
  renderDropdown?: () => ReactNode;
  /** Se llama al hacer clic fuera del contenedor para cerrar el dropdown */
  onCloseDropdown?: () => void;
}

export const SearchBar = memo(function SearchBar({
  value,
  onChange,
  onSubmit,
  onFocus,
  placeholder = "Buscar...",
  className,
  renderDropdown,
  onCloseDropdown,
}: SearchBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(value);
  }

  function handleClickOutside(e: React.MouseEvent) {
    if (
      onCloseDropdown &&
      renderDropdown &&
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      onCloseDropdown();
    }
  }

  return (
    <div
      ref={containerRef}
      onClick={handleClickOutside}
      className="relative w-full"
    >
      <form
        onSubmit={handleSubmit}
        className={cn(
          "flex items-center rounded-full bg-background overflow-hidden border border-input ring-ring/40 transition-shadow duration-200 focus-within:border-ring focus-within:ring-4",
          className,
        )}
      >
        <input
          type="search"
          aria-label="Buscar"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 text-sm text-secondary-foreground placeholder:text-muted-foreground bg-transparent outline-none [&::-webkit-search-decoration]:hidden [&::-webkit-search-cancel-button]:hidden"
        />
        <button
          type="submit"
          aria-label="Buscar"
          className="px-5 py-2.5 bg-accent text-accent-foreground flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
        >
          <BsFillSearchHeartFill size={20} aria-hidden="true" />
        </button>
      </form>

      {renderDropdown?.()}
    </div>
  );
});