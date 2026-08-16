/**
 * Hook para restablecer la contraseña con el código de recuperación.
 * El éxito se maneja en el componente (muestra mensaje y vuelve al login).
 */
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resetPasswordService } from "@/features/auth/services";
import type { ResetPasswordRequest } from "@/features/auth/types";

export function useResetPassword() {
    return useMutation({
        mutationFn: (data: ResetPasswordRequest) => resetPasswordService(data),
        onError: (error: Error) => {
            toast.error(error.message || "No se pudo restablecer la contraseña");
        },
    });
}