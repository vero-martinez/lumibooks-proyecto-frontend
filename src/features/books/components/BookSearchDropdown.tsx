"use client";

/**
 * Dropdown de sugerencias de búsqueda.
 * Se muestra debajo del SearchBar cuando hay query activa.
 * Muestra: loading, empty state, lista de sugerencias con portada, y "Ver todos".
 */
import { ImSpinner2 } from "react-icons/im";
import { FaSearch } from "react-icons/fa";
import { BookCover } from "@/components/shared/BookCover";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command";
import type { BookSuggestionResponse } from "@/features/books/types";

interface BookSearchDropdownProps {
  suggestions: BookSuggestionResponse[];
  isFetching: boolean;
  showDropdown: boolean;
  query: string;
  onSelectSuggestion: (id: number, title: string) => void;
  onViewAll: (query: string) => void;
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
    <Command className="absolute inset-x-0 top-full z-50 mt-2 h-auto overflow-hidden rounded-xl border border-border bg-popover p-0 text-popover-foreground shadow-xl">
      <CommandList className="max-h-80 py-1">
        {isFetching && (
          <div
            role="status"
            className="flex flex-col items-center justify-center gap-2 py-8"
          >
            <ImSpinner2
              size={18}
              className="animate-spin text-primary"
              aria-hidden="true"
            />
            <p className="text-xs text-muted-foreground">Buscando libros...</p>
          </div>
        )}

        {hasNoResults && (
          <CommandEmpty className="flex flex-col items-center gap-3 py-8 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50">
              <FaSearch
                size={15}
                className="text-muted-foreground/60"
                aria-hidden="true"
              />
            </span>
            <div className="space-y-1">
              <p className="text-sm font-medium text-secondary-foreground">
                Sin resultados para &quot;{query}&quot;
              </p>
              <p className="text-xs text-muted-foreground">
                Prueba con otro título, autor o palabra clave.
              </p>
            </div>
          </CommandEmpty>
        )}

        {hasSuggestions && (
          <div className="divide-y divide-border/10">
            {suggestions.map((book) => (
              <CommandItem
                key={book.id}
                value={String(book.id)}
                onSelect={() => onSelectSuggestion(book.id, book.title)}
                className="flex items-center gap-3 rounded-none px-4 py-3 transition-colors data-selected:bg-accent/20"
              >
                <BookCover
                  src={book.coverImageUrl}
                  alt={book.title}
                  className="h-14 w-10 shrink-0 rounded-sm bg-muted shadow-sm"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-secondary-foreground">
                    {book.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {book.author}
                  </p>
                </div>
              </CommandItem>
            ))}
          </div>
        )}
      </CommandList>

      {hasSuggestions && (
        <CommandItem
          value="ver-todos"
          onSelect={() => onViewAll(query)}
          className="rounded-none border-t border-border/50 px-4 py-3.5 text-sm font-semibold text-primary transition-colors data-selected:bg-accent/30"
        >
          <span className="w-full text-center">
            Ver todos los resultados para &quot;{query}&quot;
          </span>
        </CommandItem>
      )}
    </Command>
  );
}