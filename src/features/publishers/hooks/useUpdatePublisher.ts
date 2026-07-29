/**
 * Hook para actualizar una editorial.
 * Expone una mutación que invalida la lista y el detalle en caché.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updatePublisherService } from "@/features/publishers/services";
import type { PublisherRequest } from "@/features/publishers/types";

export function useUpdatePublisher(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: PublisherRequest) => updatePublisherService(id, data),
        onSuccess: () => {
            toast.success("Editorial actualizada exitosamente");
            queryClient.invalidateQueries({ queryKey: ["admin-publishers"] });
            queryClient.invalidateQueries({ queryKey: ["admin-publisher-detail", id] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al actualizar la editorial");
        },
    });
}