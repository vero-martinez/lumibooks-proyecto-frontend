/**
 * Hook de TanStack Query para obtener los 10 libros mejor evaluados.
 * Usado en la landing page.
 */
import { useQuery } from "@tanstack/react-query";
import { getTopRatedBooksService } from "@/features/books/services";

export function useTopRatedBooks() {
  return useQuery({
    queryKey: ["books", "top-rated"],
    queryFn: getTopRatedBooksService,
  });
}