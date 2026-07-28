/**
 * Tipos del panel de administración de autores.
 */

// Datos enviados al backend para crear un autor (campo "data" del FormData)
export interface AuthorCreateRequest {
    firstName: string;
    lastName: string;
    biography?: string;
}

// Datos enviados al backend para actualizar un autor (campo "data" del FormData)
export interface AuthorUpdateRequest {
    firstName?: string;
    lastName?: string;
    biography?: string;
}

// Resumen de autores para la tabla de administración
export interface AuthorSummary {
    id: number;
    firstName: string;
    lastName: string;
    profileImageUrl: string | null;
    isActive: boolean;
    createdAt: string;
}

// Detalle completo de un autor para el panel de administración
export interface AuthorAdminDetail {
    id: number;
    firstName: string;
    lastName: string;
    biography: string | null;
    profileImageUrl: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Filtros para el endpoint de administración de autores
export interface AuthorAdminFilters {
    search?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
    sort?: string;
}