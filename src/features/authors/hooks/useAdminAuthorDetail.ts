/**
 * Hook para obtener el detalle de un autor en el panel de administración.
 * Usado por el dialog de detalle y edición.
 */
import { useQuery } from "@tanstack/react-query";
import { getAuthorDetailAdminService } from "@/features/authors/services";

export function useAdminAuthorDetail(id: number | null, enabled = true) {
    return useQuery({
        queryKey: ["admin-author-detail", id],
        queryFn: () => getAuthorDetailAdminService(id!),
        enabled: enabled && id !== null,
    });
}