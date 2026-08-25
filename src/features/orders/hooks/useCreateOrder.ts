/**
 * Hook para crear una orden desde el carrito del usuario autenticado.
 * Al crear la orden, el backend vacía el carrito y asigna un gestor.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createOrderService } from "@/features/orders/services";

export function useCreateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOrderService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            queryClient.invalidateQueries({ queryKey: ["mini-cart"] });
            toast.success("Orden creada exitosamente");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al crear la orden");
        },
    });
}