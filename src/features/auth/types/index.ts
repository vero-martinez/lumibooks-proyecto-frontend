/**
 * Tipos específicos del módulo de autenticación.
 */

import { Role } from "@/types/api.types";

// Respuesta del backend para login, registro y renovación de sesión
export interface AuthResponse {
    token: string;
    tokenType: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    message: string;
}

// Datos del formulario de login
export interface LoginFormData {
    email: string;
    password: string;
}

// Datos del formulario de registro
export interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dni: string;
    cellphone?: string; // opcional
    acceptsTerms: boolean;
    subscribedToNewsletter?: boolean; // opcional
}

// Datos enviados al backend para solicitar un código de recuperación
export interface ForgotPasswordRequest {
    email: string;
}

// Datos enviados al backend para restablecer la contraseña
export interface ResetPasswordRequest {
    email: string;
    code: string;
    newPassword: string;
}