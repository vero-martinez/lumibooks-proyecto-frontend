/**
 * Tipos del módulo de cambio de contraseña.
 */

// Datos enviados al backend para cambiar la contraseña
export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}