/**
 * Hook para actualizar una dirección existente.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateAddressService } from "@/features/addresses/services";
import type { AddressUpdateRequest } from "@/features/addresses/types";

export function useUpdateAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            addressId,
            request,
        }: {
            addressId: number;
            request: AddressUpdateRequest;
        }) => updateAddressService(addressId, request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
            toast.success("Dirección actualizada");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al actualizar la dirección");
        },
    });
}