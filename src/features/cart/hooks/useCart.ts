/**
 * Hook que obtiene el carrito completo del usuario autenticado.
 * Solo se ejecuta si hay un token válido.
 */
import { useQuery } from "@tanstack/react-query";
import { getCartService } from "@/features/cart/services/client";
import { useAuthStore } from "@/stores/auth.store";

export function useCart() {
    const isAuthenticated = useAuthStore((s) => !!s.token);

    return useQuery({
        queryKey: ["cart"],
        queryFn: getCartService,
        enabled: isAuthenticated,
    });
}