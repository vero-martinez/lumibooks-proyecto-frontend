/**
 * Hook de TanStack Query para obtener las listas de deseos del usuario autenticado.
 * Utiliza useQuery de @tanstack/react-query para manejar la consulta.
 */

import { useQuery } from "@tanstack/react-query";
import { getWishlistsService } from "@/features/wishlists/services";
import { useAuthStore } from "@/stores/auth.store";

export function useWishlists() {
    const isAuthenticated = useAuthStore((s) => !!s.token);

    return useQuery({
        queryKey: ["wishlists"],
        queryFn: getWishlistsService,
        enabled: isAuthenticated,
    });
}