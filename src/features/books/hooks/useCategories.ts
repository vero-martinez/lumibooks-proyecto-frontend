/**
 * Hook de TanStack Query para obtener las categorías disponibles.
 * Soporta búsqueda opcional por nombre.
 */
import { useQuery } from "@tanstack/react-query";
import { getCategoriesService } from "@/features/books/services";

export function useCategories(name?: string) {
  return useQuery({
    queryKey: ["categories", name],
    queryFn: () => getCategoriesService(name),
  });
}