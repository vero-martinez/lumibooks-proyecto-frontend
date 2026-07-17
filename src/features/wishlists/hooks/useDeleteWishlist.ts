/**
 * Hook para eliminar una lista de deseos existente.
 * Utiliza useMutation de @tanstack/react-query para manejar la eliminación.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteWishlistService } from "@/features/wishlists/services";

export function useDeleteWishlist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteWishlistService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlists"] });
            toast.success("Lista eliminada");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al eliminar la lista");
        },
    });
}