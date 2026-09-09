/**
 * Barra de filtros para la tabla de administración de reseñas.
 * Buscador (título/ISBN del libro) + filtros de estado, calificación y orden.
 */
"use client";

import { useState } from "react";
import { SearchBar } from "@/components/shared/SearchBar";
import { SortSelect } from "@/components/shared/SortSelect";
import { ClearSearchButton } from "@/components/shared/ClearSearchButton";
import {
    ADMIN_REVIEW_RATING_OPTIONS,
    ADMIN_REVIEW_SORT_OPTIONS,
    REVIEW_STATUS_OPTIONS,
} from "@/features/reviews/constants/admin.constants";
import type { ReviewAdminFilters, ReviewStatus } from "@/features/reviews/types";

interface ReviewFiltersBarProps {
    filters: ReviewAdminFilters;
    updateFilters: (filters: ReviewAdminFilters) => void;
    onClear: () => void;
}

const SELECT_CLASS =
    "min-w-0 sm:min-w-[160px] w-full sm:w-auto bg-card hover:bg-muted border border-input";

export function ReviewFiltersBar({
    filters,
    updateFilters,
    onClear,
}: ReviewFiltersBarProps) {
    const [searchInput, setSearchInput] = useState(filters.search ?? "");

    const hasActiveFilters =
        filters.search !== undefined ||
        filters.rating !== undefined ||
        filters.status !== undefined ||
        filters.sort !== undefined;

    const handleSearch = () => {
        updateFilters({ search: searchInput.trim() || undefined });
    };

    const handleClear = () => {
        setSearchInput("");
        onClear();
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="w-full lg:w-1/2">
                <SearchBar
                    value={searchInput}
                    onChange={setSearchInput}
                    onSubmit={handleSearch}
                    placeholder="Buscar por título o ISBN..."
                />
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <SortSelect
                    value={filters.status}
                    onChange={(val) =>
                        updateFilters({ status: val as ReviewStatus | undefined })
                    }
                    placeholder="Todos los estados"
                    ariaLabel="Filtrar por estado de reseña"
                    className={SELECT_CLASS}
                    options={REVIEW_STATUS_OPTIONS}
                />

                <SortSelect
                    value={filters.rating !== undefined ? String(filters.rating) : undefined}
                    onChange={(val) =>
                        updateFilters({ rating: val === undefined ? undefined : Number(val) })
                    }
                    placeholder="Todas las calificaciones"
                    ariaLabel="Filtrar por calificación"
                    className={SELECT_CLASS}
                    options={ADMIN_REVIEW_RATING_OPTIONS}
                />

                <SortSelect
                    value={filters.sort}
                    onChange={(sort) => updateFilters({ sort })}
                    placeholder="Ordenar por"
                    ariaLabel="Ordenar reseñas"
                    className={SELECT_CLASS}
                    options={ADMIN_REVIEW_SORT_OPTIONS}
                />

                {hasActiveFilters && (
                    <ClearSearchButton onClick={handleClear} label="Limpiar filtros" />
                )}
            </div>
        </div>
    );
}