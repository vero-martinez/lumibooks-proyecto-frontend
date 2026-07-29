/**
 * Hook para obtener el detalle de una editorial en el panel de administración.
 */
import { useQuery } from "@tanstack/react-query";
import { getPublisherAdminService } from "@/features/publishers/services";

export function useAdminPublisherDetail(id: number | null, enabled = true) {
    return useQuery({
        queryKey: ["admin-publisher-detail", id],
        queryFn: () => getPublisherAdminService(id!),
        enabled: enabled && id !== null,
    });
}