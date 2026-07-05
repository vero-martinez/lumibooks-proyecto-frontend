/**
 * Hook de TanStack Query para obtener el catálogo de autores.
 * Recibe filtros (búsqueda, paginación) y devuelve una página de resultados.
 */
import { useQuery } from "@tanstack/react-query";
import { getAuthorsService } from "@/features/authors/services";
import { AuthorsFilters } from "@/features/authors/types";

export function useAuthors(filters?: AuthorsFilters) {
  return useQuery({
    queryKey: ["authors", filters],
    queryFn: () => getAuthorsService(filters),
  });
}