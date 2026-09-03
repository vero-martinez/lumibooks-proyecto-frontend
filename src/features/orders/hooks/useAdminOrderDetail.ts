/**
 * Hook para el detalle de un pedido en el panel administrador.
 * Solo consulta cuando se provee un orderId válido.
 */
import { useQuery } from "@tanstack/react-query";
import { getAdminOrderDetailService } from "@/features/orders/services";

export function useAdminOrderDetail(orderId: number | null) {
  return useQuery({
    queryKey: ["admin-order-detail", orderId],
    queryFn: () => getAdminOrderDetailService(orderId!),
    enabled: orderId !== null,
  });
}