/**
 * Hook para eliminar una reseña propia.
 * Al eliminarse, el libro vuelve a estar disponible para reseñar.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteReviewService } from "@/features/reviews/services";

export function useDeleteReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteReviewService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
            queryClient.invalidateQueries({ queryKey: ["pending-reviews"] });
            queryClient.invalidateQueries({ queryKey: ["book-reviews"] });
            toast.success("Reseña eliminada");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al eliminar la reseña");
        },
    });
}