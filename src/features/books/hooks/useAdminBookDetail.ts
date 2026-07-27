/**
 * Hook de TanStack Query para obtener el detalle completo de un libro
 * en el panel de administración.
 */
import { useQuery } from "@tanstack/react-query";
import { getBookDetailAdminService } from "@/features/books/services";

export function useAdminBookDetail(id: number | null, enabled = true) {
  return useQuery({
    queryKey: ["admin-book-detail", id],
    queryFn: () => getBookDetailAdminService(id!),
    enabled: enabled && id !== null,
  });
}