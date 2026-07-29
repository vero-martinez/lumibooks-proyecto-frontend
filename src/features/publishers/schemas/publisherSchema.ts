/**
 * Esquema de validación Zod para el formulario de editoriales.
 * Reutilizado tanto para crear como para editar.
 */
import { z } from "zod";

export const publisherSchema = z.object({
    name: z
        .string()
        .min(1, "El nombre es obligatorio")
        .max(150, "El nombre no puede superar los 150 caracteres"),
});

export type PublisherSchema = z.infer<typeof publisherSchema>;