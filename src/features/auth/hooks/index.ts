/**
 * Hooks de autenticación usando TanStack Query.
 * Manejan el estado de carga, errores y éxito
 * de las peticiones de login y registro.
 */

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginService, registerService } from "@/features/auth/services";
import { useAuthStore } from "@/stores/auth.store";
import { LoginFormData, RegisterFormData } from "@/features/auth/types";

// Hook para el login
export function useLogin() {
    const router = useRouter();
    const { setAuth } = useAuthStore();

    return useMutation({
        mutationFn: (data: LoginFormData) => loginService(data),
        onSuccess: (response) => {
            // Guardar token y usuario en el store
            setAuth(response.token, {
                email: response.email,
                firstName: response.firstName,
                lastName: response.lastName,
                role: response.role,
            });

            toast.success(response.message);

            // Redirigir según el rol
            if (response.role === "ADMIN") router.push("/admin/dashboard");
            else if (response.role === "GESTOR") router.push("/gestor/dashboard");
            else router.push("/cliente/dashboard");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al iniciar sesión");
        },
    });
}

// Hook para el registro
export function useRegister() {
    const router = useRouter();
    const { setAuth } = useAuthStore();

    return useMutation({
        mutationFn: (data: RegisterFormData) => registerService(data),
        onSuccess: (response) => {
            // Guardar token y usuario en el store
            setAuth(response.token, {
                email: response.email,
                firstName: response.firstName,
                lastName: response.lastName,
                role: response.role,
            });

            toast.success(response.message);

            // El registro siempre crea un CLIENTE
            router.push("/cliente/dashboard");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al registrarse");
        },
    });
}