/**
 * Tipos del módulo de perfil de usuario.
 */

// Perfil del usuario autenticado (respuesta de GET /api/me)
export interface UserMeResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dni: string;
    cellphone: string | null;
    isSubscribed: boolean;
}

// Datos enviados al backend para actualizar el perfil (PATCH /api/me)
export interface UserProfileUpdateRequest {
    firstName: string;
    lastName: string;
    cellphone: string;
}
