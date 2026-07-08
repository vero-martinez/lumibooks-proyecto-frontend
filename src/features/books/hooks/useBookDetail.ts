/**
 * Hook de TanStack Query para obtener el detalle completo de un libro por su ID.
 */
import { useQuery } from "@tanstack/react-query";
import { getBookDetailService } from "@/features/books/services";

export function useBookDetail(id: number) {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookDetailService(id),
  });
}