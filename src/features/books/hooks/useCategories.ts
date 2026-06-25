import { useQuery } from "@tanstack/react-query";
import { getCategoriesService } from "@/features/books/services";

/**
 * Hook para obtener las categorías disponibles.
 * Usado principalmente en filtros del catálogo.
 * Se cachea automáticamente mientras la queryKey no cambie.
 */
export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getCategoriesService,
    });
}