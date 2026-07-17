/**
 * Hook para crear una lista de deseos.
 * Utiliza useMutation de @tanstack/react-query para manejar la creación.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createWishlistService } from "@/features/wishlists/services";

export function useCreateWishlist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createWishlistService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlists"] });
            toast.success("Lista de deseos creada");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al crear la lista de deseos");
        },
    });
}