/**
 * Hook para agregar un libro al carrito.
 * - Autenticado: envía la petición al backend.
 * - Anónimo: guarda en localStorage.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addItem } from "@/features/cart/services/cart-adapter";

export function useAddToCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            toast.success("Libro agregado al carrito");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al agregar al carrito");
        },
    });
}