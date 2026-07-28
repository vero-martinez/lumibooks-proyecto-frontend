/**
 * Esquema de validación Zod para el formulario de creación de autores.
 * Replica las validaciones del backend (AuthorCreateRequest).
 */
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const authorCreateSchema = z.object({
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

    biography: z
        .string()
        .max(2000, "La biografía no puede superar los 2000 caracteres")
        .optional(),

    profileImage: z
        .custom<File>((val) => val instanceof File)
        .refine((file) => file.size <= MAX_FILE_SIZE, "La imagen no puede superar 5MB")
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Formato no válido. Usa JPG, PNG o WebP",
        )
        .optional()
        .or(z.literal(""))
        .transform((val) => (val instanceof File ? val : undefined)),
});

export type AuthorCreateSchema = z.infer<typeof authorCreateSchema>;