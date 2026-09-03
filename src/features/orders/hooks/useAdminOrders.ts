/**
 * Hook para la tabla de administración de pedidos.
 * Maneja paginación, filtros y consulta de pedidos.
 */
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdminOrdersService } from "@/features/orders/services";
import type { AdminOrderFilters } from "@/features/orders/types";

const DEFAULT_FILTERS: AdminOrderFilters = {
  page: 0,
  size: 10,
  sort: "createdAt,desc",
};

export function useAdminOrders() {
  const [filters, setFilters] = useState<AdminOrderFilters>(DEFAULT_FILTERS);

  const query = useQuery({
    queryKey: ["admin-orders", filters],
    queryFn: () => getAdminOrdersService(filters),
  });

  const updateFilters = useCallback((newFilters: AdminOrderFilters) => {
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
  };
}