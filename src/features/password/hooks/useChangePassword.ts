/**
 * Hook para cambiar la contraseña del usuario autenticado.
 *
 * Al cambiar la contraseña, el backend invalida todos los tokens de sesión
 * (access y refresh), por lo que la sesión actual deja de ser válida.
 * El hook limpia las cookies de sesión (mediante el logout del BFF),
 * elimina el estado local y redirige al usuario al inicio de sesión.
 */

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutService } from "@/features/auth/services";
import { cancelPendingRefresh } from "@/lib/refresh-session";
import { ROUTES } from "@/lib/routes";
import { useAuthStore } from "@/stores/auth.store";
import { changePasswordService } from "@/features/password/services";
import type { ChangePasswordRequest } from "@/features/password/types";

export function useChangePassword() {
    const router = useRouter();

    return useMutation({
        mutationFn: (data: ChangePasswordRequest) =>
            changePasswordService(data),

        onSuccess: async () => {
            toast.success("Contraseña actualizada exitosamente");

            // Cancela cualquier renovación de sesión en curso.
            cancelPendingRefresh();

            // Best-effort: revoca la sesión en el backend.
            try {
                await logoutService(useAuthStore.getState().token);
            } catch {
                // Se ignora: la sesión se limpia igualmente a continuación.
            }

            // Elimina la sesión local y redirige al login.
            useAuthStore.getState().logout();
            router.push(ROUTES.login);
        },

        onError: (error: Error) => {
            toast.error(error.message || "Error al cambiar la contraseña");
        },
    });
}