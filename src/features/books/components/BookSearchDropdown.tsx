"use client";

/**
 * Dropdown de sugerencias de búsqueda.
 * Se muestra debajo del SearchBar cuando hay query activa.
 * Muestra: loading, empty state, lista de sugerencias con portada, y botón "Ver todos".
 */
import { BookCover } from "@/components/shared/BookCover";
import { ImSpinner2 } from "react-icons/im";
import type { BookSuggestionResponse } from "@/features/books/types";

interface BookSearchDropdownProps {
  suggestions: BookSuggestionResponse[];
  isFetching: boolean;
  showDropdown: boolean;
  query: string;
  onSelectSuggestion: (id: number, title: string) => void;
  onViewAll: (query: string) => void;
}

interface SuggestionItemProps {
  book: BookSuggestionResponse;
  onSelect: (id: number, title: string) => void;
}

/** Item individual de sugerencia con portada, título y autor. */
function SuggestionItem({ book, onSelect }: SuggestionItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(book.id, book.title)}
      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-accent/20 focus-visible:bg-accent/20 focus-visible:outline-none transition-colors first:rounded-t-xl last:rounded-b-xl"
    >
      <BookCover
        src={book.coverImageUrl}
        alt={book.title}
        className="w-10 h-14 bg-muted shadow-sm"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-secondary-foreground">
          {book.title}
        </p>
        <p className="truncate text-xs text-muted-foreground mt-0.5">
          {book.author}
        </p>
      </div>
    </button>
  );
}

function DropdownLoading() {
  return (
    <div className="flex items-center justify-center py-6">
      <ImSpinner2
        size={20}
        className="animate-spin text-primary"
        aria-hidden="true"
      />
    </div>
  );
}

function DropdownEmpty() {
  return (
    <p className="text-sm text-muted-foreground text-center py-6">
      No se encontraron resultados.
    </p>
  );
}

export function BookSearchDropdown({
  suggestions,
  isFetching,
  showDropdown,
  query,
  onSelectSuggestion,
  onViewAll,
}: BookSearchDropdownProps) {
  if (!showDropdown) return null;

  const hasSuggestions = !isFetching && suggestions.length > 0;
  const hasNoResults = !isFetching && suggestions.length === 0;

  return (
    <div
      aria-label="Sugerencias de búsqueda"
      aria-busy={isFetching}
      className="absolute top-full left-0 right-0 mt-2 bg-background rounded-xl shadow-xl border border-border z-50 max-h-80 overflow-y-auto custom-scrollbar py-1"
    >
      <div aria-live="polite" aria-atomic="true">
        {isFetching && <DropdownLoading />}
        {hasNoResults && <DropdownEmpty />}
      </div>

      {hasSuggestions &&
        suggestions.map((book) => (
          <SuggestionItem
            key={book.id}
            book={book}
            onSelect={onSelectSuggestion}
          />
        ))}

      {hasSuggestions && (
        <button
          type="button"
          onClick={() => onViewAll(query)}
          className="w-full px-4 py-3.5 text-center text-sm font-semibold text-primary hover:bg-accent/30 focus-visible:bg-accent/30 focus-visible:outline-none transition-colors border-t border-border/50 rounded-b-xl"
        >
          Ver todos los resultados para &quot;{query}&quot;
        </button>
      )}
    </div>
  );
}