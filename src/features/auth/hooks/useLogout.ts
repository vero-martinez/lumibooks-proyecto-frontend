/**
 * Hook para cerrar sesión.
 *
 * Invalida la sesión en el backend y, al finalizar,
 * limpia la sesión local y redirige al usuario.
 */

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutService } from "@/features/auth/services";
import { cancelPendingRefresh } from "@/lib/refresh-session";
import { useAuthStore } from "@/stores/auth.store";

export function useLogout() {
    const router = useRouter();

    return useMutation({
        mutationFn: () => {
            // Cancela cualquier renovación de sesión que siga en curso.
            cancelPendingRefresh();

            // Solicita al backend el cierre de la sesión actual.
            return logoutService(useAuthStore.getState().token);
        },
        
        // Se ejecuta tanto si el logout fue exitoso como si falló.
        onSettled: () => {
            // Independientemente del resultado, elimina la sesión local
            // para garantizar que el usuario quede desconectado.
            useAuthStore.getState().logout();

            toast.success("Sesión cerrada");

            // Redirige al usuario a la página principal.
            router.push("/");
        },
    });
}