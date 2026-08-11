/**
 * Hook para establecer una dirección como predeterminada.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { setDefaultAddressService } from "@/features/addresses/services";

export function useSetDefaultAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: setDefaultAddressService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
            toast.success("Dirección predeterminada actualizada");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al actualizar la dirección predeterminada");
        },
    });
}