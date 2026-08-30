/**
 * Hook para crear una reseña desde la cuenta del usuario autenticado.
 * Al crearse se refrescan las reseñas propias y los libros pendientes.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createReviewService } from "@/features/reviews/services";

export function useCreateReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createReviewService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-reviews"] });
            queryClient.invalidateQueries({ queryKey: ["pending-reviews"] });
            toast.success("¡Reseña publicada! Gracias por compartir tu opinión.");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al crear la reseña");
        },
    });
}