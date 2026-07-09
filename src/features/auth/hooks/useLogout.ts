/**
 * Hook para cerrar sesión.
 * Limpia el store de autenticación, llama al endpoint de logout y redirige al inicio.
 */
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutService } from "@/features/auth/services";
import { useAuthStore } from "@/stores/auth.store";

export function useLogout() {
    const router = useRouter();
    const { logout } = useAuthStore();

    return useMutation({
        mutationFn: logoutService,
        onSuccess: () => {
            logout();
            toast.success("Sesión cerrada");
            router.push("/");
        },
        onError: () => {
            toast.error("Error al cerrar sesión");
        },
    });
}