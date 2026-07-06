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