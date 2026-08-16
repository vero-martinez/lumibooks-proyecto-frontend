/**
 * Servicios de autenticación.
 *
 * Se comunican con los endpoints internos de Next.js (/api/auth),
 * los cuales funcionan como BFF y gestionan la comunicación con Spring Boot.
 *
 * Las cookies httpOnly son creadas y manejadas por Next.js.
 */

import { ApiResponse } from "@/types/api.types";
import {
    AuthResponse,
    LoginFormData,
    RegisterFormData,
    ForgotPasswordRequest,
    ResetPasswordRequest,
} from "@/features/auth/types";

/**
 * Inicia sesión mediante el endpoint interno de Next.js.
 */
export async function loginService(data: LoginFormData): Promise<AuthResponse> {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Error al iniciar sesión");
    }

    return result;
}

/**
 * Registra un nuevo usuario mediante el endpoint interno de Next.js.
 */
export async function registerService(
    data: RegisterFormData
): Promise<AuthResponse> {
    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Error al registrarse");
    }

    return result;
}

/**
 * Cierra la sesión del usuario.
 *
 * Envía el Access Token para que el backend pueda invalidar
 * la sesión si corresponde.
 */
export async function logoutService(token: string | null): Promise<void> {
    const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!response.ok) {
        throw new Error("Error al cerrar sesión");
    }
}

/**
 * Renueva el Access Token utilizando el Refresh Token.
 *
 * El Refresh Token se envía automáticamente mediante
 * la cookie httpOnly almacenada en el navegador.
 */
export async function refreshService(): Promise<string> {
    const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Sesión expirada");
    }

    return result.token;
}

/**
 * Solicita el envío de un código de recuperación de contraseña.
 *
 * El backend responde siempre 200 (incluso si el correo no está registrado)
 * para no revelar qué cuentas existen.
 */
export async function forgotPasswordService(
    data: ForgotPasswordRequest
): Promise<ApiResponse> {
    const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "No se pudo enviar el código");
    }

    return result;
}

/**
 * Restablece la contraseña con el código de recuperación.
 */
export async function resetPasswordService(
    data: ResetPasswordRequest
): Promise<ApiResponse> {
    const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "No se pudo restablecer la contraseña");
    }

    return result;
}