/**
 * Hook de TanStack Query para obtener los libros de un autor con paginación.
 */
import { useQuery } from "@tanstack/react-query";
import { getAuthorBooksService } from "@/features/authors/services";

export function useAuthorBooks(authorId: number, page = 0, size = 8) {
    return useQuery({
        queryKey: ["author-books", authorId, page, size],
        queryFn: () => getAuthorBooksService(authorId, { page, size }),
    });
}