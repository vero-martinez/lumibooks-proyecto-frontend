/**
 * Hook para registrar un nuevo usuario.
 * Crea la cuenta, autentica automáticamente y redirige al dashboard de cliente.
 */
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { registerService } from "@/features/auth/services";
import { useAuthStore } from "@/stores/auth.store";
import type { RegisterFormData } from "@/features/auth/types";

export function useRegister() {
    const router = useRouter();
    const { setAuth } = useAuthStore();

    return useMutation({
        mutationFn: (data: RegisterFormData) => registerService(data),
        onSuccess: (response) => {
            setAuth(response.token, {
                email: response.email,
                firstName: response.firstName,
                lastName: response.lastName,
                role: response.role,
            });

            toast.success(response.message);

            router.push("/cliente/dashboard");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al registrarse");
        },
    });
}