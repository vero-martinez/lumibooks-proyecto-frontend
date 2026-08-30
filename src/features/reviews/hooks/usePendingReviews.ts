/**
 * Hook para obtener la lista paginada de libros entregados
 * que el usuario autenticado aún no ha reseñado.
 * El param enabled permite desactivar la consulta (ej. pestaña inactiva).
 */
import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPendingReviewsService } from "@/features/reviews/services";
import type { PendingReviewsFilters } from "@/features/reviews/types";

const DEFAULT_FILTERS: PendingReviewsFilters = { page: 0, size: 8 };

export function usePendingReviews(enabled = true) {
    const [filters, setFilters] = useState<PendingReviewsFilters>(DEFAULT_FILTERS);

    const query = useQuery({
        queryKey: ["pending-reviews", filters],
        queryFn: () => getPendingReviewsService(filters),
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