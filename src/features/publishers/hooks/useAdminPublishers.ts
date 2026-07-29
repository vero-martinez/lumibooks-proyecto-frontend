/**
 * Hook para la tabla de administración de editoriales.
 * Maneja paginación, filtros (con reseteo) y toggle de estado de la editorial.
 */
import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    getPublishersAdminService,
    togglePublisherStatusService,
} from "@/features/publishers/services";
import type { PublisherAdminFilters } from "@/features/publishers/types";

const DEFAULT_FILTERS: PublisherAdminFilters = { page: 0, size: 10 };

export function useAdminPublishers() {
    const queryClient = useQueryClient();
    const [filters, setFilters] = useState<PublisherAdminFilters>(DEFAULT_FILTERS);

    const query = useQuery({
        queryKey: ["admin-publishers", filters],
        queryFn: () => getPublishersAdminService(filters),
    });

    const toggleStatus = useMutation({
        mutationFn: togglePublisherStatusService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-publishers"] });
            toast.success("Estado de la editorial actualizado");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al cambiar estado");
        },
    });

    const updateFilters = useCallback((newFilters: PublisherAdminFilters) => {
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