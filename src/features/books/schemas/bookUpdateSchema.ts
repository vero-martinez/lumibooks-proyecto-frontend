/**
 * Esquema de validación Zod para el formulario de edición de libros.
 * Replica las validaciones del backend (BookUpdateRequest).
 * Todos los campos son opcionales.
 */
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const bookUpdateSchema = z.object({
  title: z
    .string()
    .min(1, "El título es obligatorio")
    .max(200, "El título no puede superar los 200 caracteres")
    .optional(),

  description: z
    .string()
    .min(1, "La descripción es obligatoria")
    .max(2000, "La descripción no puede superar los 2000 caracteres")
    .optional(),

  price: z
    .number({ message: "El precio es obligatorio" })
    .min(0.01, "El precio debe ser mayor a 0")
    .max(99999999.99, "El precio es demasiado alto")
    .optional(),

  stock: z
    .number({ message: "El stock es obligatorio" })
    .int("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo")
    .optional(),

  pageCount: z
    .number({ message: "El número de páginas es obligatorio" })
    .int("Las páginas deben ser un número entero")
    .min(1, "Debe tener al menos 1 página")
    .optional(),

  language: z
    .enum(["ESPAÑOL", "INGLES"], {
      message: "El idioma es obligatorio",
    })
    .optional(),

  format: z
    .enum(["TAPA_BLANDA", "TAPA_DURA", "BOLSILLO"], {
      message: "El formato es obligatorio",
    })
    .optional(),

  editionYear: z
    .number()
    .int("El año debe ser un número entero")
    .min(1450, "El año es demasiado antiguo")
    .max(2100, "El año no puede ser futuro")
    .optional()
    .or(z.nan())
    .transform((val) => (val && !isNaN(val) ? val : undefined)),

  publisherId: z
    .number({ message: "La editorial es obligatoria" })
    .min(1, "Selecciona una editorial")
    .optional(),

  authorIds: z
    .array(z.number())
    .min(1, "Selecciona al menos un autor")
    .optional(),

  categoryIds: z
    .array(z.number())
    .min(1, "Selecciona al menos una categoría")
    .optional(),

  coverImage: z
    .custom<File>((val) => val instanceof File, "La imagen de portada es obligatoria")
    .refine((file) => file.size <= MAX_FILE_SIZE, "La imagen no puede superar 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Formato no válido. Usa JPG, PNG o WebP",
    )
    .optional()
    .or(z.literal(""))
    .transform((val) => (val instanceof File ? val : undefined)),
});

export type BookUpdateSchema = z.infer<typeof bookUpdateSchema>;