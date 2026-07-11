/**
 * Hook para actualizar la cantidad de un libro en el carrito.
 * - Autenticado: backend.
 * - Anónimo: localStorage.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuantity } from "@/features/cart/services/cart-adapter";
import { toast } from "sonner";

export function useUpdateQuantity() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ bookId, quantity }: { bookId: number; quantity: number }) => {
            await updateQuantity(bookId, quantity);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al actualizar cantidad");
        },
    });
}