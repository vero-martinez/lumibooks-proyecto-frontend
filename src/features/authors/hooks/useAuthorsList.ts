/**
 * Hook de TanStack Query para obtener la lista de autores activos.
 * Soporta búsqueda server-side por nombre.
 */
import { useQuery } from "@tanstack/react-query";
import { getAllAuthorsService } from "@/features/authors/services";

export function useAuthorsList(search?: string) {
  return useQuery({
    queryKey: ["authorsList", search],
    queryFn: () => getAllAuthorsService(search),
  });
}