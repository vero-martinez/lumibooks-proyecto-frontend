/**
 * Esquemas de validación Zod para el formulario de perfil.
 * Replican las validaciones del backend (UserProfileUpdateRequest)
 * para dar feedback inmediato al usuario sin llamar al servidor.
 */

import { z } from "zod";

export const profileSchema = z.object({
    firstName: z
        .string()
        .min(1, "El nombre es obligatorio")
        .max(150, "El nombre no puede superar los 150 caracteres")
        .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, "Solo letras y espacios"),

    lastName: z
        .string()
        .min(1, "El apellido es obligatorio")
        .max(150, "El apellido no puede superar los 150 caracteres")
        .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, "Solo letras y espacios"),

    cellphone: z
        .string()
        .min(1, "El teléfono es obligatorio")
        .regex(/^[0-9]{9}$/, "El teléfono debe tener exactamente 9 dígitos"),
});

export type ProfileSchema = z.infer<typeof profileSchema>;