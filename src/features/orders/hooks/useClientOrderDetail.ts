/**
 * Hook para obtener el detalle completo de un pedido del usuario autenticado.
 */
import { useQuery } from "@tanstack/react-query";
import { getClientOrderDetailService } from "@/features/orders/services";

export function useClientOrderDetail(orderId: number | null) {
    return useQuery({
        queryKey: ["client-order-detail", orderId],
        queryFn: () => getClientOrderDetailService(orderId!),
        enabled: !!orderId,
    });
}