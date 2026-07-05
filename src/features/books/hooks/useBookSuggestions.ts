/**
 * Hook de TanStack Query para sugerencias de búsqueda en tiempo real.
 * Solo se activa cuando el texto ingresado alcanza MIN_SEARCH_LENGTH.
 * Cachea las sugerencias por 30 segundos para evitar llamadas repetitivas mientras se escribe.
 */
import { useQuery } from "@tanstack/react-query";
import { getBookSuggestionsService } from "@/features/books/services";
import { MIN_SEARCH_LENGTH } from "@/features/books/constants/catalog.constants";

export function useBookSuggestions(search: string) {
  const trimmed = search.trim();

  return useQuery({
    queryKey: ["book-suggestions", trimmed],
    queryFn: () => getBookSuggestionsService(trimmed),
    enabled: trimmed.length >= MIN_SEARCH_LENGTH,
    staleTime: 1000 * 30,
  });
}
