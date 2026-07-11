/**
 * Hook para iniciar sesión.
 * Autentica al usuario, fusiona el carrito local si existe y redirige según el rol.
 */
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginService } from "@/features/auth/services";
import { useAuthStore } from "@/stores/auth.store";
import { mergeCartOnLogin } from "@/features/cart/services";
import type { LoginFormData } from "@/features/auth/types";

export function useLogin() {
    const router = useRouter();
    const { setAuth } = useAuthStore();
    return useMutation({
        mutationFn: (data: LoginFormData) => loginService(data),
        onSuccess: async (response) => {
            setAuth(response.token, {
                email: response.email,
                firstName: response.firstName,
                lastName: response.lastName,
                role: response.role,
            });

            await mergeCartOnLogin();

            toast.success(response.message);

            if (response.role === "ADMIN") router.push("/admin/dashboard");
            else if (response.role === "GESTOR") router.push("/gestor/dashboard");
            else router.push("/books");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al iniciar sesión");
        },
    });
}