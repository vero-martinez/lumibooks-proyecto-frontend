"use client";

import { Suspense } from "react";
import { ImSpinner2, ImSearch } from "react-icons/im";
import { useFiltersUrl } from "@/hooks/useFiltersUrl";
import { useBooks } from "@/features/books/hooks";
import {
  BookFilters,
  BookFiltersTrigger,
} from "@/features/books/components/BookFilters";
import { BookCard } from "@/features/books/components/BookCard";
import { BookSort } from "@/features/books/types";
import type { BookFilters as BookFiltersType } from "@/features/books/types";
import { SortSelect } from "@/components/shared/SortSelect";
import {
  BOOK_SORT_OPTIONS,
  BOOK_FILTER_KEYS,
  BOOK_NUMERIC_KEYS,
} from "@/features/books/constants/catalog.constants";
import { AppPagination } from "@/components/shared/AppPagination";
import { ClearSearchButton } from "@/components/shared/ClearSearchButton";
import { Button } from "@/components/ui/button";

// Las primeras 4 cards cargan la imagen sin lazy loading
// para mejorar el rendimiento (LCP).
const PRIORITY_CARDS_COUNT = 4;

function BooksPageContent() {
  // Lee los filtros desde la URL (search params) y permite actualizarlos.
  const { filters, setFilters } = useFiltersUrl<BookFiltersType>(
    BOOK_FILTER_KEYS,
    BOOK_NUMERIC_KEYS,
  );
  // Trae los libros desde la API según los filtros actuales.
  const { data, isLoading, isError } = useBooks({ size: 16, ...filters });

  const hasResults = !!data && data.content.length > 0;
  const hasNoResults = !!data && data.content.length === 0;

  // Vuelve al catálogo general sin ningún filtro aplicado.
  function handleClearAll() {
    setFilters({});
  }

  // Quita solo el filtro de búsqueda por texto, pero mantiene
  // los demás filtros (categoría, precio, etc.).
  function handleClearSearch() {
    const { search: _search, ...rest } = filters;
    setFilters({ ...rest, page: 0 });
  }

  return (
    <main className="max-w-screen-2xl mx-auto w-full p-4 md:p-8 lg:p-16 gap-8 lg:gap-12 flex flex-col lg:flex-row">
      {/* Sidebar de filtros en desktop, sheet en mobile */}
      <BookFilters filters={filters} onChange={setFilters} />

      <div className="flex-1 flex flex-col gap-6">
        {/* Encabezado: título, botón quitar búsqueda, ordenar y contador */}
        <div className="flex flex-col gap-4 pb-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            <h1 className="text-sm lg:text-3xl font-bold text-foreground">
              {filters.search
                ? `Resultados para "${filters.search}"`
                : "Catálogo de libros"}
            </h1>

            {filters.search && hasResults && (
              <ClearSearchButton onClick={handleClearSearch} />
            )}
          </div>

          <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <BookFiltersTrigger filters={filters} onChange={setFilters} />
              </div>
              <SortSelect
                value={filters.sort}
                onChange={(sort) =>
                  setFilters({
                    ...filters,
                    sort: sort as BookSort | undefined,
                    page: 0,
                  })
                }
                options={BOOK_SORT_OPTIONS}
                placeholder="Ordenar por"
                ariaLabel="Ordenar libros por"
              />
            </div>

            {data && (
              <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 inline-block" />
                {data.totalElements} libros encontrados
              </p>
            )}
          </div>
        </div>

        {/* Zona de resultados: loading, error, libros o vacío */}
        <div className="min-h-[60vh]">
          {/* Mientras se cargan los datos mostramos un spinner */}
          {isLoading && (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center justify-center py-20"
            >
              <ImSpinner2
                size={32}
                className="animate-spin text-primary"
                aria-hidden="true"
              />
              <span className="sr-only">Cargando libros...</span>
            </div>
          )}

          {isError && (
            <div
              role="alert"
              className="flex flex-col items-center justify-center py-20 gap-3"
            >
              <p className="text-lg font-medium text-destructive">
                Error al cargar los libros
              </p>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                Ocurrió un problema al obtener los libros. Intenta de nuevo más
                tarde.
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
              >
                Reintentar
              </Button>
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
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
                <ImSearch
                  size={24}
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <p className="text-lg font-semibold">No se encontraron libros</p>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                Intenta cambiar los filtros o realizar una búsqueda diferente.
              </p>
              <Button
                variant="outline"
                onClick={handleClearAll}
                className="border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>

        {/* Paginación: visible solo cuando ya se cargaron los datos */}
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

export default function BooksPage() {
  return (
    <Suspense
      fallback={
        <ImSpinner2
          size={32}
          className="animate-spin text-primary mx-auto mt-20"
        />
      }
    >
      <BooksPageContent />
    </Suspense>
  );
}