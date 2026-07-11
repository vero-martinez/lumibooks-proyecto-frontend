/**
 * Hook para eliminar un libro del carrito por su bookId.
 * - Autenticado: backend.
 * - Anónimo: localStorage.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeItem } from "@/features/cart/services/cart-adapter";

export function useRemoveFromCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            toast.success("Libro eliminado del carrito");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al eliminar del carrito");
        },
    });
}