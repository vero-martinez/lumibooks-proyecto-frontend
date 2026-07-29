/**
 * Hook para la tabla de administración de autores.
 * Maneja paginación, filtros (con reseteo) y toggle de estado del autor.
 */
import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAuthorsAdminService, toggleAuthorStatusService } from "@/features/authors/services";
import type { AuthorAdminFilters } from "@/features/authors/types";

const DEFAULT_FILTERS: AuthorAdminFilters = { page: 0, size: 10 };

export function useAdminAuthors() {
    const queryClient = useQueryClient();
    const [filters, setFilters] = useState<AuthorAdminFilters>(DEFAULT_FILTERS);

    const query = useQuery({
        queryKey: ["admin-authors", filters],
        queryFn: () => getAuthorsAdminService(filters),
    });

    const toggleStatus = useMutation({
        mutationFn: toggleAuthorStatusService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-authors"] });
            toast.success("Estado del autor actualizado");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al cambiar estado");
        },
    });

    const updateFilters = useCallback((newFilters: AuthorAdminFilters) => {
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
        filters,
        updateFilters,
        setPage,
        resetFilters,
        toggleStatus,
    };
}