/**
 * Esquema de validación Zod para el nombre de la lista de deseos.
 * Esta validación replica la del backend para dar feedback
 * inmediato al usuario sin necesidad de llamar al servidor.
 */
import { z } from "zod";

// Schema de validación del nombre de la lista de deseos
export const wishlistNameSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "El nombre es obligatorio")
        .max(100, "El nombre no puede superar los 100 caracteres"),
});

// Tipo de datos inferido del esquema de validación del nombre de la lista de deseos
export type WishlistNameSchema = z.infer<typeof wishlistNameSchema>;