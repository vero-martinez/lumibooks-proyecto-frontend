/**
 * Hook para mover un libro de una lista de deseos a otra.
 * Utiliza useMutation de @tanstack/react-query para manejar el movimiento.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { moveBookService } from "@/features/wishlists/services";

export function useMoveBookBetweenWishlists() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            wishlistId,
            bookId,
            targetWishlistId,
        }: {
            wishlistId: number;
            bookId: number;
            targetWishlistId: number;
        }) => moveBookService(wishlistId, bookId, { targetWishlistId }),
        onSuccess: (_data, { bookId }) => {
            queryClient.invalidateQueries({ queryKey: ["wishlists"] });
            queryClient.invalidateQueries({ queryKey: ["wishlist-book-status", bookId] });
            toast.success("Libro movido a la otra lista");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al mover el libro entre listas");
        },
    });
}