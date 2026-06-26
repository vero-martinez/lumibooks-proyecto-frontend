// components/shared/SearchBar.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { useBookSearchBar } from "@/features/books/hooks";
import { BookSuggestionResponse } from "@/features/books/types";

interface SuggestionItemProps {
  book: BookSuggestionResponse;
  onSelect: (id: number, title: string) => void;
}

/**
 * Ítem individual del dropdown de sugerencias: portada, título y autor.
 */
function SuggestionItem({ book, onSelect }: SuggestionItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(book.id, book.title)}
      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary transition-colors"
    >
      <div className="relative w-10 h-14 shrink-0 rounded overflow-hidden bg-muted">
        <Image src={book.coverImageUrl} alt={book.title} fill className="object-cover" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-secondary-foreground">
          {book.title}
        </p>
        <p className="truncate text-xs text-muted-foreground">{book.author}</p>
      </div>
    </button>
  );
}

/**
 * Estado de carga del dropdown: spinner mientras se busca.
 */
function DropdownLoading() {
  return (
    <div className="flex items-center justify-center py-6">
      <Loader2 size={20} className="animate-spin text-primary" />
    </div>
  );
}

/**
 * Estado vacío del dropdown: no se encontraron coincidencias.
 */
function DropdownEmpty() {
  return (
    <p className="text-sm text-muted-foreground text-center py-6">
      No se encontraron resultados.
    </p>
  );
}

export function SearchBar() {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    query,
    suggestions,
    isFetching,
    showDropdown,
    handleChange,
    handleFocus,
    handleSubmit,
    goToDetail,
    goToCatalog,
    close,
  } = useBookSearchBar();

  // Cierra el dropdown al hacer click fuera del componente.
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  const hasSuggestions = !isFetching && suggestions.length > 0;
  const hasNoResults = !isFetching && suggestions.length === 0;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input + botón de búsqueda */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center rounded-full bg-background overflow-hidden"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={handleFocus}
          placeholder="Buscar por título, autor o ISBN..."
          className="flex-1 px-4 py-2 text-sm text-secondary-foreground placeholder:text-muted-foreground bg-transparent outline-none"
        />
        <button
          type="submit"
          aria-label="Buscar"
          className="px-4 py-3 h-full bg-accent text-foreground flex items-center justify-center hover:bg-accent/80 transition-colors"
        >
          <BsFillSearchHeartFill size={22} />
        </button>
      </form>

      {/* Dropdown de sugerencias */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover rounded-xl shadow-lg border border-border overflow-hidden z-50 max-h-80 overflow-y-auto custom-scrollbar">
          {isFetching && <DropdownLoading />}
          {hasNoResults && <DropdownEmpty />}

          {hasSuggestions &&
            suggestions.map((book) => (
              <SuggestionItem key={book.id} book={book} onSelect={goToDetail} />
            ))}

          {/* Acceso directo al catálogo completo con el texto buscado */}
          {hasSuggestions && (
            <button
              type="button"
              onClick={() => goToCatalog(query)}
              className="w-full border-t px-4 py-3 text-left text-sm text-primary hover:bg-secondary transition-colors"
            >
              Ver todos los resultados para &quot;{query}&quot;
            </button>
          )}
        </div>
      )}
    </div>
  );
}