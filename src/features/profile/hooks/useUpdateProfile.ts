/**
 * Hook para actualizar el perfil del usuario autenticado.
 * Expone una mutación que actualiza el perfil, refresca la caché
 * y sincroniza los datos del usuario en el store de autenticación.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProfileService } from "@/features/profile/services";
import type { UserProfileUpdateRequest } from "@/features/profile/types";
import { useAuthStore } from "@/stores/auth.store";

export function useUpdateProfile() {
    const queryClient = useQueryClient();
    const updateUser = useAuthStore((s) => s.updateUser);

    return useMutation({
        mutationFn: (data: UserProfileUpdateRequest) => updateProfileService(data),
        onSuccess: (updatedProfile) => {
            toast.success("Perfil actualizado exitosamente");
            queryClient.setQueryData(["profile"], updatedProfile);
            queryClient.invalidateQueries({ queryKey: ["profile"] });

            updateUser({
                firstName: updatedProfile.firstName,
                lastName: updatedProfile.lastName,
            });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al actualizar el perfil");
        },
    });
}