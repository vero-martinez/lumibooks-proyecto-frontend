/**
 * Hook para fusionar el carrito anónimo (localStorage) con el carrito del usuario autenticado.
 * Se llama al iniciar sesión si hay items locales pendientes.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mergeCart } from "@/features/cart/services/cart-adapter";

export function useMergeCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: mergeCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al fusionar carrito");
        },
    });
}