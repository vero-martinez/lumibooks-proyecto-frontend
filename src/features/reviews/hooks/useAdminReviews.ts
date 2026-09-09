/**
 * Hook para la tabla de administración de reseñas.
 * Maneja paginación, filtros (con reseteo) y la consulta paginada.
 */
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdminReviewsService } from "@/features/reviews/services";
import { DEFAULT_PAGE_SIZE } from "@/features/reviews/constants/admin.constants";
import type { ReviewAdminFilters } from "@/features/reviews/types";

const DEFAULT_FILTERS: ReviewAdminFilters = { page: 0, size: DEFAULT_PAGE_SIZE };

export function useAdminReviews() {
    const [filters, setFilters] = useState<ReviewAdminFilters>(DEFAULT_FILTERS);

    const query = useQuery({
        queryKey: ["admin-reviews", filters],
        queryFn: () => getAdminReviewsService(filters),
    });

    const updateFilters = useCallback((newFilters: ReviewAdminFilters) => {
        setFilters((prev) => ({ ...prev, ...newFilters, page: 0 }));
    }, []);

    const setPage = useCallback((page: number) => {
        setFilters((prev) => ({ ...prev, page }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters(DEFAULT_FILTERS);
    }, []);

    return {
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        refetch: query.refetch,
        filters,
        updateFilters,
        setPage,
        resetFilters,
    };
}