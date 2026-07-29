/**
 * Hook para actualizar una categoría.
 * Expone una mutación que invalida la lista y el detalle en caché.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCategoryService } from "@/features/categories/services";
import type { CategoryRequest } from "@/features/categories/types";

export function useUpdateCategory(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CategoryRequest) => updateCategoryService(id, data),
        onSuccess: () => {
            toast.success("Categoría actualizada exitosamente");
            queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
            queryClient.invalidateQueries({ queryKey: ["admin-category-detail", id] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al actualizar la categoría");
        },
    });
}