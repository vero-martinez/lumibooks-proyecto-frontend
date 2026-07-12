/**
 * Hook para renombrar una lista de deseos existente.
 * Utiliza useMutation de @tanstack/react-query para manejar el renombrado.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { renameWishlistService } from "@/features/wishlists/services";

export function useRenameWishlist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ wishlistId, name }: { wishlistId: number; name: string }) =>
            renameWishlistService(wishlistId, { name }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlists"] });
            toast.success("Lista renombrada");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al renombrar la lista");
        },
    });
}