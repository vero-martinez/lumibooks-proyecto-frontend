/**
 * Hook de TanStack Query para obtener el estado de un libro en la lista de deseos del usuario autenticado.
 * Utiliza useQuery de @tanstack/react-query para manejar la consulta.
 */

import { useQuery } from "@tanstack/react-query";
import { getBookStatusService } from "@/features/wishlists/services";
import { useAuthStore } from "@/stores/auth.store";

export function useBookWishlistStatus(bookId: number) {
    const isAuthenticated = useAuthStore((s) => !!s.token);

    return useQuery({
        queryKey: ["wishlist-book-status", bookId],
        queryFn: () => getBookStatusService(bookId),
        enabled: isAuthenticated,
    });
}