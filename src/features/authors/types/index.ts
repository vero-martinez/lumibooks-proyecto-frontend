/**
 * Tipos del módulo de autores.
 */

// Respuesta del endpoint público de obtener Autores
export interface AuthorPublicResponse {
    id: number;
    fullName: string;
    profileImageUrl?: string;
}

// Datos enviados al backend para filtrar autores
export interface AuthorsFilters {
    search?: string;
    page?: number;
    size?: number;
}