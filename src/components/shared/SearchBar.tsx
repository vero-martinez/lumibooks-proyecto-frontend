"use client";

/**
 * Barra de búsqueda con dropdown de sugerencias.
 *
 * Solo agrega el listener de cierre cuando se provee renderDropdown,
 * para evitar adjuntar eventos innecesarios si no hay dropdown.
 */
import { memo, useEffect, useRef, type ReactNode } from "react";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";

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

  useClickOutside(containerRef, () => onCloseDropdown?.(), {
  eventType: "click",
  enabled: !!renderDropdown,
  checkVisibility: true,
});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(value);
  }

  return (
    <div ref={containerRef} className="relative w-full">
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