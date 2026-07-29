/**
 * Barra de filtros para la tabla de administración de editoriales.
 * Buscador + filtros de estado y ordenamiento.
 */
"use client";

import { useState } from "react";
import { SearchBar } from "@/components/shared/SearchBar";
import { SortSelect } from "@/components/shared/SortSelect";
import { ClearSearchButton } from "@/components/shared/ClearSearchButton";
import { ADMIN_PUBLISHER_SORT_OPTIONS } from "@/features/publishers/constants/admin.constants";
import type { PublisherAdminFilters } from "@/features/publishers/types";

interface PublisherFiltersBarProps {
    filters: PublisherAdminFilters;
    updateFilters: (filters: PublisherAdminFilters) => void;
    onClear: () => void;
}

export function PublisherFiltersBar({
    filters,
    updateFilters,
    onClear,
}: PublisherFiltersBarProps) {
    const [searchInput, setSearchInput] = useState(filters.name ?? "");

    const hasActiveFilters =
        filters.name || filters.isActive !== undefined || filters.sort;

    const handleSearch = () => {
        updateFilters({ name: searchInput || undefined });
    };

    const handleClear = () => {
        setSearchInput("");
        onClear();
    };

    const SELECT_CLASS =
        "min-w-0 sm:min-w-[160px] w-full sm:w-auto bg-card hover:bg-muted border border-input";

    return (
        <div className="flex flex-col gap-3">
            <div className="w-full lg:w-1/2">
                <SearchBar
                    value={searchInput}
                    onChange={setSearchInput}
                    onSubmit={handleSearch}
                    placeholder="Buscar por nombre..."
                />
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <SortSelect
                    value={
                        filters.isActive === undefined
                            ? undefined
                            : String(filters.isActive)
                    }
                    onChange={(val) =>
                        updateFilters({
                            isActive: val === undefined ? undefined : val === "true",
                        })
                    }
                    placeholder="Todos los estados"
                    ariaLabel="Filtrar por estado"
                    className={SELECT_CLASS}
                    options={[
                        { value: "true", label: "Activo" },
                        { value: "false", label: "Inactivo" },
                    ]}
                />

                <SortSelect
                    value={filters.sort}
                    onChange={(sort) => updateFilters({ sort })}
                    placeholder="Ordenar por"
                    ariaLabel="Ordenar por"
                    className={SELECT_CLASS}
                    options={ADMIN_PUBLISHER_SORT_OPTIONS}
                />

                {hasActiveFilters && (
                    <ClearSearchButton onClick={handleClear} label="Limpiar filtros" />
                )}
            </div>
        </div>
    );
}