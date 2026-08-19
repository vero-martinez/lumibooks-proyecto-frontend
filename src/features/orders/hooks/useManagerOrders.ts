/**
 * Hook para la tabla de gestión de pedidos (panel gestor).
 * Maneja paginación, filtros y consulta de pedidos.
 */
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getManagerOrdersService } from "@/features/orders/services";
import type { ManagerOrderFilters } from "@/features/orders/types";

const DEFAULT_FILTERS: ManagerOrderFilters = {
  page: 0,
  size: 10,
  sort: "createdAt,desc",
};

export function useManagerOrders() {
  const [filters, setFilters] = useState<ManagerOrderFilters>(DEFAULT_FILTERS);

  const query = useQuery({
    queryKey: ["manager-orders", filters],
    queryFn: () => getManagerOrdersService(filters),
  });

  const updateFilters = useCallback((newFilters: ManagerOrderFilters) => {
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