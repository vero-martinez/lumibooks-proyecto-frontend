/**
 * Hook de TanStack Query para obtener las editoriales disponibles.
 * Soporta búsqueda opcional por nombre.
 */
import { useQuery } from "@tanstack/react-query";
import { getPublishersService } from "@/features/books/services";

export function usePublishers(name?: string) {
  return useQuery({
    queryKey: ["publishers", name],
    queryFn: () => getPublishersService(name),
  });
}