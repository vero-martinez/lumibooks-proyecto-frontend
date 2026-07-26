/**
 * Hook para la tabla de administración de libros.
 * Maneja paginación, filtros (con reseteo) y toggle de estado del libro.
 */
import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getBooksAdminService,
  toggleBookStatusService,
} from "@/features/books/services";
import type { BookAdminFilters } from "@/features/books/types";

const DEFAULT_FILTERS: BookAdminFilters = {
  page: 0,
  size: 10,
};

export function useAdminBooks() {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<BookAdminFilters>(DEFAULT_FILTERS);

  const query = useQuery({
    queryKey: ["admin-books", filters],
    queryFn: () => getBooksAdminService(filters),
  });

  const toggleStatus = useMutation({
    mutationFn: toggleBookStatusService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-books"] });
      toast.success("Estado del libro actualizado");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al cambiar estado");
    },
  });

  const updateFilters = useCallback((newFilters: BookAdminFilters) => {
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