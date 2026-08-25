/**
 * Esquemas de validación Zod para el formulario de checkout.
 * Replica las validaciones del backend (OrderCreateRequest, PaymentRequest)
 * para dar feedback inmediato al usuario sin llamar al servidor.
 */
import { z } from "zod";

// Paso 1: Datos de envío
export const shippingSchema = z.object({
    addressId: z
        .number({ message: "Selecciona una dirección de envío" })
        .min(1, "Selecciona una dirección de envío"),

    recipientName: z
        .string()
        .trim()
        .min(1, "El nombre del destinatario es obligatorio")
        .max(150, "El nombre no puede superar los 150 caracteres")
        .regex(
            /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/,
            "El nombre solo puede contener letras y espacios",
        ),

    dni: z
        .string()
        .trim()
        .min(1, "El DNI es obligatorio")
        .regex(/^\d{8}$/, "El DNI debe tener exactamente 8 dígitos"),

    phone: z
        .string()
        .trim()
        .min(1, "El teléfono es obligatorio")
        .regex(/^\d{9}$/, "El teléfono debe tener exactamente 9 dígitos"),
});

export type ShippingSchema = z.infer<typeof shippingSchema>;

// Paso 2: Datos de pago
export const paymentSchema = z.object({
    cardHolderFirstName: z
        .string()
        .trim()
        .min(1, "El nombre del titular es obligatorio")
        .regex(
            /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/,
            "El nombre solo puede contener letras y espacios",
        ),

    cardHolderLastName: z
        .string()
        .trim()
        .min(1, "El apellido del titular es obligatorio")
        .regex(
            /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/,
            "El apellido solo puede contener letras y espacios",
        ),

    cardNumber: z
        .string()
        .trim()
        .min(1, "El número de tarjeta es obligatorio")
        .regex(/^(\d{4}\s?){4}$/, "El número de tarjeta debe tener 16 dígitos"),

    expiryDate: z
        .string()
        .trim()
        .min(1, "La fecha de vencimiento es obligatoria")
        .regex(
            /^(0[1-9]|1[0-2])\/\d{2}$/,
            "El formato debe ser MM/AA",
        ),

    cvv: z
        .string()
        .trim()
        .min(1, "El CVV es obligatorio")
        .regex(/^\d{3,4}$/, "El CVV debe tener 3 o 4 dígitos"),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;