/**
 * Hook para agregar un libro a una lista de deseos.
 * Utiliza useMutation de @tanstack/react-query para manejar la adición.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addBookService } from "@/features/wishlists/services";

export function useAddBookToWishlist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ wishlistId, bookId }: { wishlistId: number; bookId: number }) =>
            addBookService(wishlistId, bookId),
        onSuccess: (_data, { bookId }) => {
            queryClient.invalidateQueries({ queryKey: ["wishlists"] });
            queryClient.invalidateQueries({ queryKey: ["wishlist-book-status", bookId] });
            toast.success("Libro agregado a la lista");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al agregar el libro a la lista");
        },
    });
}