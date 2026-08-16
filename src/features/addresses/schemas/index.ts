/**
 * Esquema de validación Zod para el formulario de direcciones.
 * Replica las validaciones del backend (AddressCreateRequest)
 * para dar feedback inmediato al usuario sin llamar al servidor.
 */
import { z } from "zod";

export const addressSchema = z.object({
    departmentId: z
        .number({ message: "El departamento es obligatorio" })
        .min(1, "Selecciona un departamento"),

    provinceId: z
        .number({ message: "La provincia es obligatoria" })
        .min(1, "Selecciona una provincia"),

    districtId: z
        .number({ message: "El distrito es obligatorio" })
        .min(1, "Selecciona un distrito"),

    addressLine: z
        .string()
        .trim()
        .min(1, "La dirección es obligatoria")
        .max(255, "La dirección no puede superar los 255 caracteres"),

    reference: z
        .string()
        .trim()
        .min(1, "La referencia es obligatoria")
        .max(255, "La referencia no puede superar los 255 caracteres"),
});

export type AddressSchema = z.infer<typeof addressSchema>;