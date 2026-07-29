/**
 * Hook para la tabla de administración de categorías.
 * Maneja paginación, filtros (con reseteo) y toggle de estado de la categoría.
 */
import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    getCategoriesAdminService,
    toggleCategoryStatusService,
} from "@/features/categories/services";
import type { CategoryAdminFilters } from "@/features/categories/types";

const DEFAULT_FILTERS: CategoryAdminFilters = { page: 0, size: 10 };

export function useAdminCategories() {
    const queryClient = useQueryClient();
    const [filters, setFilters] = useState<CategoryAdminFilters>(DEFAULT_FILTERS);

    const query = useQuery({
        queryKey: ["admin-categories", filters],
        queryFn: () => getCategoriesAdminService(filters),
    });

    const toggleStatus = useMutation({
        mutationFn: toggleCategoryStatusService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
            toast.success("Estado de la categoría actualizado");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al cambiar estado");
        },
    });

    const updateFilters = useCallback((newFilters: CategoryAdminFilters) => {
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