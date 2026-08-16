/**
 * Hook para crear una nueva dirección.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createAddressService } from "@/features/addresses/services";

export function useCreateAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAddressService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
            toast.success("Dirección agregada");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al agregar la dirección");
        },
    });
}