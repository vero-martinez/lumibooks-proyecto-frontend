/**
 * Hook para cambiar el estado de una reseña en el panel de administración.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateReviewStatusService } from "@/features/reviews/services";
import type { ReviewStatus } from "@/features/reviews/types";

export function useUpdateReviewStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ reviewId, status }: { reviewId: number; status: ReviewStatus }) =>
            updateReviewStatusService(reviewId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
            toast.success("Estado de la reseña actualizado");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al cambiar el estado de la reseña");
        },
    });
}