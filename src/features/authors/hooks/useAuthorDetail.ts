/**
 * Hook de TanStack Query para obtener el detalle de un autor.
 * Recibe el ID del autor y retorna sus datos públicos.
 */
import { useQuery } from "@tanstack/react-query";
import { getAuthorDetailService } from "@/features/authors/services";

export function useAuthorDetail(id: number) {
    return useQuery({
        queryKey: ["author-detail", id],
        queryFn: () => getAuthorDetailService(id),
    });
}