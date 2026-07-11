/**
 * Hook que obtiene el resumen del carrito (mini carrito) del usuario autenticado.
 * Se usa en el dropdown de la navbar.
 * Solo se ejecuta si hay un token válido.
 */
import { useQuery } from "@tanstack/react-query";
import { getMiniCartService } from "@/features/cart/services/client";
import { useAuthStore } from "@/stores/auth.store";

export function useMiniCart() {
    const isAuthenticated = useAuthStore((s) => !!s.token);

    return useQuery({
        queryKey: ["cart", "mini"],
        queryFn: getMiniCartService,
        enabled: isAuthenticated,
    });
}