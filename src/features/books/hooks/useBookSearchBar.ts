/**
 * useBookSearchBar
 *
 * Estado y lógica de la barra de búsqueda global: input, debounce, sugerencias
 * en tiempo real y navegación (detalle de libro / catálogo filtrado).
 *
 * Este hook se monta en el navbar (visible en cualquier página), mientras que
 * los filtros de URL solo existen en /books.
 */

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookSuggestions } from "@/features/books/hooks/useBookSuggestions";
import { useDebounce } from "@/hooks/useDebounce";
import { MIN_SEARCH_LENGTH } from "@/features/books/constants/catalog.constants";
import { buildBookDetailUrl } from "@/features/books/utils/buildBookDetailUrl";


const BOOKS_PATH = "/books";
const SEARCH_DEBOUNCE_MS = 400;

export function useBookSearchBar() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS);
  const { data: suggestions = [], isFetching } = useBookSuggestions(debouncedQuery);

  const showDropdown = isOpen && debouncedQuery.trim().length >= MIN_SEARCH_LENGTH;

  /** Navega al detalle del libro y limpia la búsqueda. */
  const goToDetail = useCallback(
    (id: number, title: string) => {
      setIsOpen(false);
      setQuery("");
      router.push(buildBookDetailUrl(id, title));
    },
    [router],
  );

  /** Navega al catálogo filtrado por el texto ingresado. */
  const goToCatalog = useCallback(
    (rawQuery: string) => {
      const trimmed = rawQuery.trim();
      if (!trimmed) return;

      const params = new URLSearchParams({ search: trimmed });
      setIsOpen(false);
      router.push(`${BOOKS_PATH}?${params.toString()}`);
    },
    [router],
  );

  /** Submit del form: evita reload y va al catálogo. */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      goToCatalog(query);
    },
    [goToCatalog, query],
  );

  /** Actualiza el input y abre el dropdown. */
  const handleChange = useCallback((value: string) => {
    setQuery(value);
    setIsOpen(true);
  }, []);

  /** Reabre el dropdown al enfocar si hay sugerencias cacheadas. */
  const handleFocus = useCallback(() => {
    setIsOpen((prev) => prev || suggestions.length > 0);
  }, [suggestions.length]);

  /** Cierra el dropdown. */
  const close = useCallback(() => setIsOpen(false), []);

  return {
    query,
    suggestions,
    isFetching,
    showDropdown,
    handleChange,
    handleFocus,
    handleSubmit,
    goToDetail,
    goToCatalog,
    close,
  };
}
