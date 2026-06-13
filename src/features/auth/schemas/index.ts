/**
 * Esquemas de validación Zod para los formularios de autenticación.
 * Estas validaciones replican las del backend para dar feedback
 * inmediato al usuario sin necesidad de llamar al servidor.
 */

import { z } from "zod";

// Schema de validación del formulario de login
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "El email es obligatorio")
        .email("El email no tiene un formato válido"),

    password: z
        .string()
        .min(1, "La contraseña es obligatoria")
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

// Schema de validación del formulario de registro
export const registerSchema = z.object({
    firstName: z
        .string()
        .min(1, "El nombre es obligatorio")
        .max(150, "El nombre no puede superar los 150 caracteres")
        .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, "El nombre solo puede contener letras y espacios"),

    lastName: z
        .string()
        .min(1, "El apellido es obligatorio")
        .max(150, "El apellido no puede superar los 150 caracteres")
        .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, "El apellido solo puede contener letras y espacios"),

    email: z
        .string()
        .min(1, "El email es obligatorio")
        .email("El email no tiene un formato válido")
        .max(150, "El email no puede superar los 150 caracteres"),

    password: z
        .string()
        .min(1, "La contraseña es obligatoria")
        .min(8, "La contraseña debe tener al menos 8 caracteres"),

    dni: z
        .string()
        .min(1, "El DNI es obligatorio")
        .regex(/^[0-9]{8}$/, "El DNI debe tener exactamente 8 dígitos"),

    cellphone: z
        .string()
        .regex(/^[0-9]{9}$/, "El teléfono debe tener exactamente 9 dígitos")
        .optional()
        .or(z.literal("")),

    acceptsTerms: z
        .boolean()
        .refine((val) => val === true, "Debes aceptar los términos y condiciones"),

    subscribedToNewsletter: z.boolean().optional(),
});

// Tipos inferidos desde los schemas
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;