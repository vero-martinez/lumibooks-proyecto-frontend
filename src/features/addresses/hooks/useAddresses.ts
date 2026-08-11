/**
 * Hook de TanStack Query para obtener las direcciones del usuario autenticado.
 */
import { useQuery } from "@tanstack/react-query";
import { getAddressesService } from "@/features/addresses/services";
import { useAuthStore } from "@/stores/auth.store";

export function useAddresses() {
    const isAuthenticated = useAuthStore((s) => !!s.token);

    return useQuery({
        queryKey: ["addresses"],
        queryFn: async () => {
            const data = await getAddressesService();
            return [...data].sort((a, b) => Number(b.isDefault) - Number(a.isDefault));
        },
        enabled: isAuthenticated,
    });
}