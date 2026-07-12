/**
 * Hook para eliminar un libro de una lista de deseos.
 * Utiliza useMutation de @tanstack/react-query para manejar la eliminación.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeBookService } from "@/features/wishlists/services";

export function useRemoveBookFromWishlist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ wishlistId, bookId }: { wishlistId: number; bookId: number }) =>
            removeBookService(wishlistId, bookId),
        onSuccess: (_data, { bookId }) => {
            queryClient.invalidateQueries({ queryKey: ["wishlists"] });
            queryClient.invalidateQueries({ queryKey: ["wishlist-book-status", bookId] });
            toast.success("Libro eliminado de la lista");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al eliminar el libro de la lista");
        },
    });
}