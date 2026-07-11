/**
 * Hook para vaciar el carrito eliminando todos los items.
 * - Autenticado: backend.
 * - Anónimo: localStorage.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { clearCart } from "@/features/cart/services/cart-adapter";

export function useClearCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: clearCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            toast.success("Carrito vaciado");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al vaciar el carrito");
        },
    });
}