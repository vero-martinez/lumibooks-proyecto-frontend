/**
 * Tipos del módulo de reviews del cliente.
 */

// Filtros para la lista de reseñas del usuario autenticado
export interface MyReviewsFilters {
    page: number;
    size: number;
}

// Filtros para la lista de libros pendientes de reseña
export interface PendingReviewsFilters {
    page: number;
    size: number;
}

// Reseñas del cliente
export interface ReviewClientResponse {
    id: number;
    bookId: number;
    bookTitle: string;
    bookIsbn: string;
    bookCoverImageUrl: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

// Lista de reseñas pendientes del cliente
export interface ReviewPendingResponse {
    bookId: number;
    title: string;
    isbn: string;
    coverImageUrl: string;
}

// Datos enviados al backend para crear una reseña
export interface ReviewCreateRequest {
    bookId: number;
    rating: number;
    comment: string;
}

// Datos enviados al backend para editar el comentario de una reseña
export interface ReviewUpdateRequest {
    comment: string;
}