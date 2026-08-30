/**
 * Hook para editar el comentario de una reseña propia.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateReviewService } from "@/features/reviews/services";
import type { ReviewUpdateRequest } from "@/features/reviews/types";

export function useUpdateReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ reviewId, request }: { reviewId: number; request: ReviewUpdateRequest }) =>
            updateReviewService(reviewId, request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
            queryClient.invalidateQueries({ queryKey: ["book-reviews"] });
            toast.success("Reseña actualizada");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al actualizar la reseña");
        },
    });
}