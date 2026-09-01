/**
 * Servicios del módulo de reviews del panel de administración.
 * Se encargan de realizar peticiones HTTP al backend y retornar datos tipados.
 */
import api from "@/lib/axios";
import type {
    ReviewAdminDetail,
    ReviewAdminFilters,
    ReviewStatus,
    ReviewStatusUpdateRequest,
    ReviewSummary,
} from "@/features/reviews/types";
import type { PageResponse } from "@/types/api.types";

/**
 * Obtiene la lista paginada de reseñas para la tabla de administración.
 * Soporta filtros de búsqueda (título/ISBN del libro), calificación,
 * estado y ordenamiento.
 */
export async function getAdminReviewsService(
    filters: ReviewAdminFilters,
): Promise<PageResponse<ReviewSummary>> {
    const { data } = await api.get("/api/admin/reviews", { params: filters });
    return data;
}

/**
 * Obtiene el detalle completo de una reseña para el panel de administración.
 */
export async function getReviewDetailAdminService(
    reviewId: number,
): Promise<ReviewAdminDetail> {
    const { data } = await api.get(`/api/admin/reviews/${reviewId}`);
    return data;
}

/**
 * Cambia el estado de una reseña (pendiente, moderada u oculta).
 */
export async function updateReviewStatusService(
    reviewId: number,
    status: ReviewStatus,
): Promise<void> {
    const body: ReviewStatusUpdateRequest = { status };
    await api.patch(`/api/admin/reviews/${reviewId}/status`, body);
}