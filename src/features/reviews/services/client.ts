/**
 * Servicios del módulo de reviews del cliente.
 * Se encargan de realizar peticiones HTTP al backend y retornar datos tipados.
 */
import api from "@/lib/axios";
import type {
    MyReviewsFilters,
    PendingReviewsFilters,
    ReviewClientResponse,
    ReviewCreateRequest,
    ReviewPendingResponse,
    ReviewUpdateRequest,
} from "@/features/reviews/types";
import type { PageResponse } from "@/types/api.types";

/**
 * Obtiene la lista paginada de reseñas del usuario autenticado.
 */
export async function getMyReviewsService(
    filters: MyReviewsFilters,
): Promise<PageResponse<ReviewClientResponse>> {
    const { data } = await api.get("/api/client/reviews", {
        params: { ...filters, sort: "createdAt,desc" },
    });
    return data;
}

/**
 * Obtiene la lista paginada de libros comprados y recibidos
 * que el usuario autenticado aún no ha reseñado.
 */
export async function getPendingReviewsService(
    filters: PendingReviewsFilters,
): Promise<PageResponse<ReviewPendingResponse>> {
    const { data } = await api.get("/api/client/reviews/pending", {
        params: filters,
    });
    return data;
}

/**
 * Crea una reseña para un libro que el usuario autenticado
 * compró y recibió.
 */
export async function createReviewService(
    request: ReviewCreateRequest,
): Promise<ReviewClientResponse> {
    const { data } = await api.post("/api/client/reviews", request);
    return data;
}

/**
 * Edita el comentario de una reseña propia del usuario autenticado.
 */
export async function updateReviewService(
    reviewId: number,
    request: ReviewUpdateRequest,
): Promise<ReviewClientResponse> {
    const { data } = await api.patch(`/api/client/reviews/${reviewId}`, request);
    return data;
}

/**
 * Elimina una reseña propia del usuario autenticado.
 */
export async function deleteReviewService(reviewId: number): Promise<void> {
    await api.delete(`/api/client/reviews/${reviewId}`);
}