/**
 * useBookSuggestions
 * Hook que obtiene sugerencias de libros en tiempo real (autocompletado).
 * Usado en la barra de búsqueda del navbar.
 * No se ejecuta hasta que el usuario escriba el mínimo de caracteres,
 * y mantiene cache de 30s para evitar refetch innecesario.
 */

import { useQuery } from "@tanstack/react-query";
import { getBookSuggestionsService } from "@/features/books/services";
import { MIN_SEARCH_LENGTH } from "@/features/books/constants/filters.constants";

export function useBookSuggestions(search: string) {
  const trimmed = search.trim();

  return useQuery({
    queryKey: ["book-suggestions", trimmed],
    queryFn: () => getBookSuggestionsService(trimmed),
    enabled: trimmed.length >= MIN_SEARCH_LENGTH,
    staleTime: 1000 * 30,
  });
}