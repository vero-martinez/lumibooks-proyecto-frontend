/**
 * Esquemas de validación Zod para el formulario de cambio de contraseña.
 * Replican las validaciones del backend (ChangePasswordRequest)
 * para dar feedback inmediato al usuario sin llamar al servidor.
 */

import { z } from "zod";

export const changePasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(1, "La contraseña actual es obligatoria"),

        newPassword: z
            .string()
            .min(1, "La nueva contraseña es obligatoria")
            .min(8, "La nueva contraseña debe tener al menos 8 caracteres"),

        confirmPassword: z
            .string()
            .min(1, "Confirma tu nueva contraseña"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;