/**
 * Hook para eliminar una dirección existente.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteAddressService } from "@/features/addresses/services";

export function useDeleteAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAddressService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
            toast.success("Dirección eliminada");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al eliminar la dirección");
        },
    });
}