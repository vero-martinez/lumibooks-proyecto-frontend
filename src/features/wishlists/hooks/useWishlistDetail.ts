/**
 * Hook de TanStack Query para obtener el detalle de una lista de deseos específica del usuario autenticado.
 * Utiliza useQuery de @tanstack/react-query para manejar la consulta.
 */

import { useQuery } from "@tanstack/react-query";
import { getWishlistDetailService } from "@/features/wishlists/services";
import { useAuthStore } from "@/stores/auth.store";

export function useWishlistDetail(wishlistId: number) {
    const isAuthenticated = useAuthStore((s) => !!s.token);

    return useQuery({
        queryKey: ["wishlists", wishlistId],
        queryFn: () => getWishlistDetailService(wishlistId),
        enabled: isAuthenticated,
    });
}