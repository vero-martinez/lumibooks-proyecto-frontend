/**
 * Hook para obtener el detalle de una categoría en el panel de administración.
 */
import { useQuery } from "@tanstack/react-query";
import { getCategoryAdminService } from "@/features/categories/services";

export function useAdminCategoryDetail(id: number | null, enabled = true) {
    return useQuery({
        queryKey: ["admin-category-detail", id],
        queryFn: () => getCategoryAdminService(id!),
        enabled: enabled && id !== null,
    });
}