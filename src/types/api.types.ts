/**
 * Tipos globales para las respuestas del backend (Spring Boot).
 * Se irán agregando más tipos conforme se desarrollen nuevas features.
 */

// Roles disponibles en el sistema
export type Role = "ADMIN" | "GESTOR" | "CLIENTE";

// Respuesta paginada de Spring Boot
export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
}

// Respuesta genérica con mensaje del backend
export interface ApiResponse {
    message: string;
}