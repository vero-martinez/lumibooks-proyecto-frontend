/**
 * Barra de filtros para la tabla de administración de libros.
 * Buscador + filtros de estado, idioma y ordenamiento.
 */
"use client";

import { useState } from "react";
import { SearchBar } from "@/components/shared/SearchBar";
import { SortSelect } from "@/components/shared/SortSelect";
import { ClearSearchButton } from "@/components/shared/ClearSearchButton";
import { BOOK_LANGUAGES } from "@/features/books/constants/catalog.constants";
import { ADMIN_BOOK_SORT_OPTIONS } from "@/features/books/constants/admin.constants";
import type { BookAdminFilters, BookLanguage } from "@/features/books/types";

interface BookFiltersBarProps {
  filters: BookAdminFilters;
  updateFilters: (filters: BookAdminFilters) => void;
  onClear: () => void;
}

export function BookFiltersBar({ filters, updateFilters, onClear }: BookFiltersBarProps) {
  const [searchInput, setSearchInput] = useState(filters.search ?? "");

  const hasActiveFilters =
    filters.search || filters.isActive !== undefined || filters.language || filters.sort;

  const handleSearch = () => {
    updateFilters({ search: searchInput || undefined });
  };

  const handleClear = () => {
    setSearchInput("");
    onClear();
  };

  const SELECT_CLASS =
    "min-w-0 sm:min-w-[160px] w-full sm:w-auto bg-card hover:bg-muted border border-input";

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
      <div className="w-full lg:w-[28rem] shrink-0">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onSubmit={handleSearch}
          placeholder="Buscar por título, ISBN o autor..."
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
        {hasActiveFilters && (
          <ClearSearchButton onClick={handleClear} label="Limpiar filtros" />
        )}

        <SortSelect
          value={filters.isActive === undefined ? undefined : String(filters.isActive)}
          onChange={(val) => updateFilters({ isActive: val === undefined ? undefined : val === "true" })}
          placeholder="Todos los estados"
          ariaLabel="Filtrar por estado"
          className={SELECT_CLASS}
          options={[
            { value: "true", label: "Activo" },
            { value: "false", label: "Inactivo" },
          ]}
        />

        <SortSelect
          value={filters.language}
          onChange={(val) => updateFilters({ language: val as BookLanguage })}
          placeholder="Todos los idiomas"
          ariaLabel="Filtrar por idioma"
          className={SELECT_CLASS}
          options={BOOK_LANGUAGES}
        />

        <SortSelect
          value={filters.sort}
          onChange={(sort) => updateFilters({ sort })}
          placeholder="Ordenar por"
          ariaLabel="Ordenar por"
          className={SELECT_CLASS}
          options={ADMIN_BOOK_SORT_OPTIONS}
        />
      </div>
    </div>
  );
}