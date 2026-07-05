/**
 * Hook de TanStack Query para obtener las editoriales disponibles.
 * Usado en el filtro de editorial del catálogo.
 */
import { useQuery } from "@tanstack/react-query";
import { getPublishersService } from "@/features/books/services";

export function usePublishers() {
  return useQuery({
    queryKey: ["publishers"],
    queryFn: getPublishersService,
  });
}