import { useQuery } from "@tanstack/react-query";
import { getBooksService } from "@/features/books/services";
import { BookFilters } from "@/features/books/types";

/**
 * Hook para obtener el catálogo de libros.
 * Soporta filtros, paginación y cache automático basado en los filtros aplicados.
 */
export function useBooks(filters: BookFilters = {}) {
    return useQuery({
        queryKey: ["books", filters],
        queryFn: () => getBooksService(filters),
    });
}