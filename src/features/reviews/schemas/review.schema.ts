/**
 * Esquemas de validación Zod para el formulario de reseñas.
 * Replica las validaciones del backend (ReviewCreateRequest, ReviewUpdateRequest)
 * para dar feedback inmediato al usuario sin llamar al servidor.
 */
import { z } from "zod";

// Comentario compartido entre creación y edición
const commentSchema = z
    .string()
    .trim()
    .min(1, "El comentario es obligatorio")
    .max(1000, "El comentario no puede superar los 1000 caracteres");

// Creación de reseña: libro, calificación (1-5) y comentario
export const reviewCreateSchema = z.object({
    bookId: z
        .number({ message: "El libro es obligatorio" })
        .min(1, "El libro es obligatorio"),

    rating: z
        .number({ message: "La calificación es obligatoria" })
        .int("La calificación debe ser un número entero")
        .min(1, "La calificación mínima es 1")
        .max(5, "La calificación máxima es 5"),

    comment: commentSchema,
});

export type ReviewCreateSchema = z.infer<typeof reviewCreateSchema>;

// Edición de reseña: solo el comentario
export const reviewUpdateSchema = z.object({
    comment: commentSchema,
});

export type ReviewUpdateSchema = z.infer<typeof reviewUpdateSchema>;