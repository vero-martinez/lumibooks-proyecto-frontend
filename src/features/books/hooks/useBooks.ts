/**
 * Hook de TanStack Query para obtener el catálogo de libros.
 * Recibe filtros (búsqueda, precio, categoría, etc.) y devuelve una página de resultados.
 */
import { useQuery } from "@tanstack/react-query";
import { getBooksService } from "@/features/books/services";
import { BookFilters } from "@/features/books/types";

export function useBooks(filters?: BookFilters) {
  return useQuery({
    queryKey: ["books", filters],
    queryFn: () => getBooksService(filters),
  });
}