/**
 * useBookSearchBar
 * Centraliza el estado y la lógica de la barra de búsqueda global:
 * input, debounce, sugerencias en tiempo real, navegación al detalle
 * de un libro y navegación al catálogo filtrado por texto.
 *
 * Es independiente de useBookFiltersUrl a propósito: este hook se monta
 * en el navbar (visible en cualquier página), mientras que useBookFiltersUrl
 * vive únicamente en BooksPage y asume que la ruta actual ya es /books.
 */

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookSuggestions } from "@/features/books/hooks/useBookSuggestions";
import { useDebounce } from "@/hooks/useDebounce";
import { MIN_SEARCH_LENGTH } from "@/features/books/constants/filters.constants";
import { buildBookDetailUrl } from "@/features/books/utils/buildBookDetailUrl";


const BOOKS_PATH = "/books";
const SEARCH_DEBOUNCE_MS = 400;

export function useBookSearchBar() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS);
  const { data: suggestions = [], isFetching } = useBookSuggestions(debouncedQuery);

  // El dropdown solo se muestra si está abierto Y el texto (ya debounced)
  // alcanza la longitud mínima de búsqueda — evita parpadeos mientras se escribe.
  const showDropdown = isOpen && debouncedQuery.trim().length >= MIN_SEARCH_LENGTH;

  // Navega al detalle del libro seleccionado desde el dropdown.
  // Cierra el dropdown y limpia el input para dejar la barra lista
  // para una nueva búsqueda una vez que el usuario llega al detalle.
  const goToDetail = useCallback(
    (id: number, title: string) => {
      setIsOpen(false);
      setQuery("");
      router.push(buildBookDetailUrl(id, title));
    },
    [router],
  );

  // Navega al catálogo filtrado por el texto recibido — usado tanto en el
  // submit del form como en el botón "ver todos los resultados" del dropdown.
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

  // Handler del submit del <form> (Enter o click en el botón de búsqueda).
  // Evita el reload por defecto del navegador y navega al catálogo.
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      goToCatalog(query);
    },
    [goToCatalog, query],
  );

  // Handler del onChange del input. Actualiza el texto en cada tecla
  // y marca el dropdown como "abierto" — su visibilidad real depende
  // además de showDropdown, que valida la longitud mínima de búsqueda.
  const handleChange = useCallback((value: string) => {
    setQuery(value);
    setIsOpen(true);
  }, []);

  // Handler del onFocus del input. Si el usuario vuelve a enfocar la barra
  // (por ejemplo, después de haber cerrado el dropdown con un click afuera)
  // y ya hay sugerencias en cache de una búsqueda previa, reabre el dropdown
  // sin que el usuario tenga que volver a escribir.
  const handleFocus = useCallback(() => {
    setIsOpen((prev) => prev || suggestions.length > 0);
  }, [suggestions.length]);

  // Cierra el dropdown. Usado por el componente en el listener de
  // "click fuera del contenedor" para ocultar las sugerencias.
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