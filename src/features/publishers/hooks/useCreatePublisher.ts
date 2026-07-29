/**
 * Hook para crear una editorial.
 * Usa useMutation de TanStack Query con envío JSON.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPublisherService } from "@/features/publishers/services";
import type { PublisherRequest } from "@/features/publishers/types";

export function useCreatePublisher() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: PublisherRequest) => createPublisherService(data),
        onSuccess: () => {
            toast.success("Editorial creada exitosamente");
            queryClient.invalidateQueries({ queryKey: ["admin-publishers"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al crear la editorial");
        },
    });
}