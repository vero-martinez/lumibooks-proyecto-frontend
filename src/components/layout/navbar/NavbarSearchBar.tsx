"use client";

/**
 * Buscador de la navbar.
 * Presentacional: recibe el estado de búsqueda por props (una sola instancia
 * del hook en Navbar) y compone el SearchBar con su dropdown de sugerencias.
 */
import { SearchBar } from "@/components/shared/SearchBar";
import { BookSearchDropdown } from "@/features/books/components/BookSearchDropdown";
import type { BookSuggestionResponse } from "@/features/books/types";

interface NavbarSearchBarProps {
  query: string;
  suggestions: BookSuggestionResponse[];
  isFetching: boolean;
  showDropdown: boolean;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onSubmit: (value: string) => void;
  onSelectSuggestion: (id: number, title: string) => void;
  onViewAll: (query: string) => void;
  onCloseDropdown?: () => void;
}

export function NavbarSearchBar({
  query,
  suggestions,
  isFetching,
  showDropdown,
  onChange,
  onFocus,
  onSubmit,
  onSelectSuggestion,
  onViewAll,
  onCloseDropdown,
}: NavbarSearchBarProps) {
  return (
    <SearchBar
      value={query}
      onChange={onChange}
      onSubmit={onSubmit}
      onFocus={onFocus}
      placeholder="Buscar por título, autor o ISBN..."
      renderDropdown={() => (
        <BookSearchDropdown
          suggestions={suggestions}
          isFetching={isFetching}
          showDropdown={showDropdown}
          query={query}
          onSelectSuggestion={onSelectSuggestion}
          onViewAll={onViewAll}
        />
      )}
      onCloseDropdown={onCloseDropdown}
      className="focus-within:ring-0 focus-within:border-input"
    />
  );
}