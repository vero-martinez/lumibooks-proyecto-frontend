import { useQuery } from "@tanstack/react-query";
import { getPublishersService } from "@/features/books/services";

/**
 * Hook para obtener las editoriales disponibles.
 * Usado en los filtros del catálogo de libros.
 * Se mantiene en cache para evitar llamadas innecesarias al backend.
 */
export function usePublishers() {
    return useQuery({
        queryKey: ["publishers"],
        queryFn: getPublishersService,
    });
}