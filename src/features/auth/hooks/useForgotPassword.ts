/**
 * Hook para solicitar el envío del código de recuperación de contraseña.
 * El éxito se maneja en el componente (avanza al siguiente paso).
 */
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { forgotPasswordService } from "@/features/auth/services";
import type { ForgotPasswordRequest } from "@/features/auth/types";

export function useForgotPassword() {
    return useMutation({
        mutationFn: (data: ForgotPasswordRequest) => forgotPasswordService(data),
        onError: (error: Error) => {
            toast.error(error.message || "No se pudo enviar el código");
        },
    });
}