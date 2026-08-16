/**
 * Hook de TanStack Query para obtener el perfil del usuario autenticado.
 * Utiliza useQuery de @tanstack/react-query para manejar la consulta.
 */

import { useQuery } from "@tanstack/react-query";
import { getProfileService } from "@/features/profile/services";
import { useAuthStore } from "@/stores/auth.store";

export function useProfile() {
    const isAuthenticated = useAuthStore((s) => !!s.token);

    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfileService,
        enabled: isAuthenticated,
    });
}