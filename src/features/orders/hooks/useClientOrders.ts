/**
 * Hook para obtener la lista paginada de pedidos del usuario autenticado.
 * Soporta filtro por status con paginación.
 */
import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getClientOrdersService } from "@/features/orders/services";
import type { ClientOrderFilters, OrderStatus } from "@/features/orders/types";

const DEFAULT_FILTERS: ClientOrderFilters = { page: 0, size: 8 };

export function useClientOrders() {
    const [filters, setFilters] = useState<ClientOrderFilters>(DEFAULT_FILTERS);

    const query = useQuery({
        queryKey: ["client-orders", filters],
        queryFn: () => getClientOrdersService(filters),
    });

    const setPage = useCallback((page: number) => {
        setFilters((prev) => ({ ...prev, page }));
    }, []);

    const setStatus = useCallback((status: OrderStatus | "") => {
        setFilters((prev) => ({ ...prev, status, page: 0 }));
    }, []);

    return {
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        refetch: query.refetch,
        filters,
        setPage,
        setStatus,
    };
}