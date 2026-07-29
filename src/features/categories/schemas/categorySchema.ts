/**
 * Esquema de validación Zod para el formulario de categorías.
 * Reutilizado tanto para crear como para editar.
 * Replica las validaciones del backend.
 */
import { z } from "zod";

export const categorySchema = z.object({
    name: z
        .string()
        .min(1, "El nombre es obligatorio")
        .max(150, "El nombre no puede superar los 150 caracteres"),
});

export type CategorySchema = z.infer<typeof categorySchema>;