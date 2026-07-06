/**
 * Tipos del módulo de reviews.
 */

// Respuesta pública de una reseña de libro
export interface ReviewPublic {
    id: number;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

// Parámetros de paginación para el servicio de reseñas
export interface BookReviewsParams {
    page?: number;
    size?: number;
    rating?: number;
}