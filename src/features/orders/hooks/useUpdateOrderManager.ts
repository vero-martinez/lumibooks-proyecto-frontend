/**
 * Hook para asignar/reasignar un gestor a una orden.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateOrderManagerService } from "@/features/orders/services";

export function useUpdateOrderManager() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      request,
    }: {
      orderId: number;
      request: { managerId: number };
    }) => updateOrderManagerService(orderId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Gestor asignado correctamente");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al asignar el gestor");
    },
  });
}