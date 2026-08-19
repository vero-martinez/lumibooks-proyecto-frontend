/**
 * Hook para el detalle de un pedido en el panel gestor.
 * Solo consulta cuando se provee un orderId válido.
 */
import { useQuery } from "@tanstack/react-query";
import { getManagerOrderDetailService } from "@/features/orders/services";

export function useManagerOrderDetail(orderId: number | null) {
  return useQuery({
    queryKey: ["manager-order-detail", orderId],
    queryFn: () => getManagerOrderDetailService(orderId!),
    enabled: orderId !== null,
  });
}