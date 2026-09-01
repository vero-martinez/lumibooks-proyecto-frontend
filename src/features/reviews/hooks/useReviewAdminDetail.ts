/**
 * Hook para obtener el detalle de una reseña en el panel de administración.
 * Usado por el dialog de detalle.
 */
import { useQuery } from "@tanstack/react-query";
import { getReviewDetailAdminService } from "@/features/reviews/services";

export function useReviewAdminDetail(reviewId: number | null, enabled = false) {
    return useQuery({
        queryKey: ["admin-review-detail", reviewId],
        queryFn: () => getReviewDetailAdminService(reviewId!),
        enabled: enabled && reviewId !== null,
    });
}