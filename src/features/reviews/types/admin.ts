/**
 * Tipos del módulo de reviews del panel de administración.
 */

// Estados posibles de una reseña (coincide con el enum ReviewStatus del backend)
export type ReviewStatus = "PENDIENTE" | "MODERADA" | "OCULTA";

// Filtros para la tabla de administración de reseñas
export interface ReviewAdminFilters {
    search?: string;
    rating?: number;
    status?: ReviewStatus;
    sort?: string;
    page?: number;
    size?: number;
}

// Fila resumida para la tabla de administración
export interface ReviewSummary {
    id: number;
    userName: string;
    userDni: string;
    bookTitle: string;
    rating: number;
    status: ReviewStatus;
    createdAt: string;
}

// Detalle completo de una reseña para el dialog de administración
export interface ReviewAdminDetail {
    id: number;
    userName: string;
    userDni: string;
    bookTitle: string;
    bookIsbn: string;
    authors: string[];
    rating: number;
    comment: string;
    status: ReviewStatus;
    createdAt: string;
    updatedAt: string;
}

// Enviado al backend para cambiar el estado de una reseña
export interface ReviewStatusUpdateRequest {
    status: ReviewStatus;
}