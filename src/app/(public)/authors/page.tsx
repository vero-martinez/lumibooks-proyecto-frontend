"use client";

import { useState, useEffect, Suspense } from "react";
import { ImSpinner2, ImSearch } from "react-icons/im";
import { ClearSearchButton } from "@/components/shared/ClearSearchButton";
import { useFiltersUrl } from "@/hooks/useFiltersUrl";
import { useAuthors } from "@/features/authors/hooks";
import type { AuthorsFilters } from "@/features/authors/types";
import { AuthorCard } from "@/features/authors/components/AuthorCard";
import { SearchBar } from "@/components/shared/SearchBar";
import { AppPagination } from "@/components/shared/AppPagination";
import { Button } from "@/components/ui/button";

// Las primeras 4 cards cargan la imagen sin lazy loading
// para mejorar el rendimiento (LCP).
const PRIORITY_CARDS_COUNT = 4;

const AUTHOR_FILTER_KEYS: (keyof AuthorsFilters)[] = ["search", "page", "size"];
const AUTHOR_NUMERIC_KEYS: (keyof AuthorsFilters)[] = ["page", "size"];

function AuthorsPageContent() {
  // Lee los filtros desde la URL (search params) y permite actualizarlos.
  const { filters, setFilters } = useFiltersUrl<AuthorsFilters>(AUTHOR_FILTER_KEYS, AUTHOR_NUMERIC_KEYS);
  // Trae los autores desde la API según los filtros actuales.
  const { data, isLoading, isError } = useAuthors({ size: 16, ...filters });

  // El input del SearchBar se maneja aparte porque está en la misma página,
  // no en el Navbar. Se sincroniza con el search param de la URL.
  const [searchInput, setSearchInput] = useState(filters.search ?? "");

  // Cuando la URL cambia (ej. con el botón "Limpiar búsqueda"),
  // actualiza el texto del input local.
  useEffect(() => {
    setSearchInput(filters.search ?? "");
  }, [filters.search]);

  const hasResults = !!data && data.content.length > 0;
  const hasNoResults = !!data && data.content.length === 0;

  // Al enviar el formulario, guarda la búsqueda en la URL.
  function handleSearch(value: string) {
    setFilters({ search: value || undefined, page: 0 });
  }

  // Limpia la búsqueda: borra el input local y el search param de la URL.
  function handleClearSearch() {
    setSearchInput("");
    setFilters({ search: undefined, page: 0 });
  }

  return (
    <main className="max-w-screen-2xl mx-auto w-full p-4 md:p-8 lg:p-16 flex flex-col gap-6">
      {/* Encabezado: título, botón quitar búsqueda, buscador y contador */}
      <div className="flex flex-col gap-4 pb-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <h1 className="text-sm lg:text-3xl font-bold text-foreground">
            {filters.search ? `Resultados para "${filters.search}"` : "Autores"}
          </h1>

          {/* Botón "✕ Quitar búsqueda" solo cuando hay texto buscado y resultados */}
          {filters.search && hasResults && (
            <ClearSearchButton onClick={handleClearSearch} />
          )}
        </div>

        <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:justify-between">
          {/* Buscador local de la página de autores */}
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onSubmit={handleSearch}
            placeholder="Buscar autor por nombre..."
            className="max-w-md"
          />

          {/* Contador de autores encontrados */}
          {data && (
            <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 inline-block shrink-0" />
              {data.totalElements} autores encontrados
            </p>
          )}
        </div>
      </div>

      {/* Zona de resultados: loading, error, autores o vacío */}
      <div className="min-h-[60vh]">
        {/* Mientras se cargan los datos mostramos un spinner */}
        {isLoading && (
          <div role="status" aria-live="polite" className="flex items-center justify-center py-20">
            <ImSpinner2 size={32} className="animate-spin text-primary" aria-hidden="true" />
            <span className="sr-only">Cargando autores...</span>
          </div>
        )}

        {/* Mensaje de error con botón para recargar */}
        {isError && (
          <div role="alert" className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-lg font-medium text-destructive">Error al cargar los autores</p>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Ocurrió un problema al obtener los autores. Intenta de nuevo más tarde.
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

        {/* Grid de autores cuando hay resultados */}
        {hasResults && (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
            {data.content.map((author, index) => (
              <AuthorCard key={author.id} author={author} priority={index < PRIORITY_CARDS_COUNT} />
            ))}
          </div>
        )}

        {/* Estado vacío: sin resultados con la búsqueda actual */}
        {hasNoResults && (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
              <ImSearch size={24} className="text-muted-foreground" aria-hidden="true" />
            </div>
            <p className="text-lg font-semibold">No se encontraron autores</p>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {filters.search
                ? `No hay autores que coincidan con "${filters.search}".`
                : "Aún no hay autores registrados."}
            </p>
            <Button
              variant="outline"
              onClick={handleClearSearch}
              className="border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
            >
              Limpiar búsqueda
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
    </main>
  );
}

export default function AuthorsPage() {
  return (
    <Suspense fallback={<ImSpinner2 size={32} className="animate-spin text-primary mx-auto mt-20" />}>
      <AuthorsPageContent />
    </Suspense>
  );
}