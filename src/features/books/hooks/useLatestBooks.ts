/**
 * Hook de TanStack Query para obtener los 10 libros más recientes.
 * Usado en la landing page.
 */
import { useQuery } from "@tanstack/react-query";
import { getLatestBooksService } from "@/features/books/services";

export function useLatestBooks() {
  return useQuery({
    queryKey: ["books", "latest"],
    queryFn: getLatestBooksService,
  });
}