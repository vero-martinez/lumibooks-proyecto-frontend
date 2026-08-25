/**
 * Hook para actualizar el estado de un pedido (panel gestor).
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateOrderStatusService } from "@/features/orders/services";
import type { OrderStatusUpdateRequest } from "@/features/orders/types";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, request }: { orderId: number; request: OrderStatusUpdateRequest }) =>
      updateOrderStatusService(orderId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manager-orders"] });
      toast.success("Estado del pedido actualizado");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al actualizar el estado");
    },
  });
}