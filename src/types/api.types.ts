/**
 * Tipos globales para las respuestas del backend (Spring Boot).
 * Se irán agregando más tipos conforme se desarrollen nuevas features.
 */

// Roles disponibles en el sistema
export type Role = "ADMIN" | "GESTOR" | "CLIENTE";

// Respuesta del endpoint de login y registro
export interface AuthResponse {
    token: string;
    tokenType: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    message: string;
}