/**
 * Servicios de autenticación.
 * Llaman a los endpoints internos de Next.js (/api/auth)
 * que a su vez llaman al backend Spring Boot y crean las cookies httpOnly.
 */

import { AuthResponse } from "@/types/api.types";
import { LoginFormData, RegisterFormData } from "@/features/auth/types";

// Llama al endpoint interno de Next.js para login
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

// Llama al endpoint interno de Next.js para registro
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