/**
 * Hook para obtener la lista paginada de reseñas del usuario autenticado.
 * Maneja la paginación en estado local.
 * El param enabled permite desactivar la consulta (ej. pestaña inactiva).
 */
import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyReviewsService } from "@/features/reviews/services";
import type { MyReviewsFilters } from "@/features/reviews/types";

const DEFAULT_FILTERS: MyReviewsFilters = { page: 0, size: 8 };

export function useMyReviews(enabled = true) {
    const [filters, setFilters] = useState<MyReviewsFilters>(DEFAULT_FILTERS);

    const query = useQuery({
        queryKey: ["my-reviews", filters],
        queryFn: () => getMyReviewsService(filters),
        enabled,
    });

    const setPage = useCallback((page: number) => {
        setFilters((prev) => ({ ...prev, page }));
    }, []);

    return {
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        refetch: query.refetch,
        filters,
        setPage,
    };
}