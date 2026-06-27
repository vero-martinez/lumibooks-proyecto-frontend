"use client";

import { X } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useBooks, useBookFiltersUrl } from "@/features/books/hooks";
import {
  BookFilters,
  BookFiltersTrigger,
} from "@/features/books/components/BookFilters";
import { BookCard } from "@/features/books/components/BookCard";
import { BookSortSelect } from "@/features/books/components/BookSortSelect";
import { AppPagination } from "@/components/shared/AppPagination";
import { Button } from "@/components/ui/button";

// Cantidad de columnas en el breakpoint más ancho del grid (xl:grid-cols-4).
// Solo esas cards de la primera fila deben cargar eager para el LCP.
const PRIORITY_CARDS_COUNT = 4;

export default function BooksPage() {
  const { filters, setFilters } = useBookFiltersUrl();
  const { data, isLoading, isError } = useBooks(filters);

  const hasResults = !!data && data.content.length > 0;
  const hasNoResults = !!data && data.content.length === 0;

  function handleClearAll() {
    setFilters({});
  }

  function handleClearSearch() {
    const { search: _search, ...rest } = filters;
    setFilters({ ...rest, page: 0 });
  }

  return (
    <main className="max-w-screen-2xl mx-auto w-full p-4 md:p-8 lg:p-16 gap-8 lg:gap-12 flex flex-col lg:flex-row">
      <BookFilters filters={filters} onChange={setFilters} />

      <div className="flex-1 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">
            {filters.search
              ? `Resultados para "${filters.search}"`
              : "Catálogo de libros"}
          </h1>

          {filters.search && hasResults && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Quitar búsqueda"
            >
              <X size={16} />
              Quitar búsqueda
            </button>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <BookFiltersTrigger filters={filters} onChange={setFilters} />
            </div>
            <BookSortSelect
              value={filters.sort}
              onChange={(sort) => setFilters({ ...filters, sort, page: 0 })}
            />
          </div>

          {data && (
            <p className="text-sm text-muted-foreground">
              {data.totalElements} libros encontrados
            </p>
          )}
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <div className="flex items-center justify-center py-20">
            <p className="text-destructive">Error al cargar los libros.</p>
          </div>
        )}

        {hasResults && (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.content.map((book, index) => (
              <BookCard
                key={book.id}
                book={book}
                priority={index < PRIORITY_CARDS_COUNT}
              />
            ))}
          </div>
        )}

        {hasNoResults && (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <p className="text-lg font-medium">No se encontraron libros</p>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Intenta cambiar los filtros o realizar una búsqueda diferente.
            </p>
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="bg-foreground text-secondary"
            >
              Limpiar filtros
            </Button>
          </div>
        )}

        {data && (
          <AppPagination
            currentPage={filters.page ?? 0}
            totalPages={data.totalPages}
            isFirst={data.first}
            isLast={data.last}
            onPageChange={(page) => setFilters({ ...filters, page })}
          />
        )}
      </div>
    </main>
  );
}