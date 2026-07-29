/**
 * Hook para crear una categoría.
 * Usa useMutation de TanStack Query con envío JSON.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCategoryService } from "@/features/categories/services";
import type { CategoryRequest } from "@/features/categories/types";

export function useCreateCategory() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CategoryRequest) => createCategoryService(data),
        onSuccess: () => {
            toast.success("Categoría creada exitosamente");
            queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al crear la categoría");
        },
    });
}