/**
 * Hook de TanStack Query para obtener las categorías disponibles.
 * Usado en el filtro de categoría del catálogo.
 */
import { useQuery } from "@tanstack/react-query";
import { getCategoriesService } from "@/features/books/services";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesService,
  });
}