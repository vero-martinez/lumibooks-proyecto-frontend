/**
 * useBookFiltersUrl
 * Sincroniza los filtros del catálogo de libros con los query params de la URL.
 * Permite compartir links, recargar sin perder filtros, y usar el botón "atrás"
 * del navegador de forma natural.
 */

import { useCallback, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { BookFilters as BookFiltersType } from "@/features/books/types";

// Todas las keys válidas de BookFilters. Cualquier query param que no esté
// aquí se ignora al leer la URL, evitando que parámetros desconocidos o mal
// escritos (ej. "categoria" en vez de "categoryId") lleguen al backend.
const FILTER_KEYS: (keyof BookFiltersType)[] = [
  "search",
  "categoryId",
  "publisherId",
  "language",
  "format",
  "minPrice",
  "maxPrice",
  "sort",
  "page",
  "size",
];

// Subconjunto de FILTER_KEYS que debe convertirse a number al leer la URL,
// ya que los query params siempre llegan como string.
const NUMERIC_KEYS: (keyof BookFiltersType)[] = [
  "categoryId",
  "publisherId",
  "minPrice",
  "maxPrice",
  "page",
  "size",
];

export function useBookFiltersUrl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Deriva los filtros actuales directamente desde la URL.
  // useMemo evita reconstruir el objeto en cada render si searchParams no cambió.
  const filters: BookFiltersType = useMemo(() => {
    const result: Record<string, string | number> = {};

    searchParams.forEach((value, key) => {
      if (!FILTER_KEYS.includes(key as keyof BookFiltersType)) return;

      result[key] = NUMERIC_KEYS.includes(key as keyof BookFiltersType)
        ? Number(value)
        : value;
    });

    return result as BookFiltersType;
  }, [searchParams]);

  // Reemplaza los filtros actuales por unos nuevos, actualizando la URL.
  // Usa replace (no push) para no llenar el historial del navegador
  // con una entrada por cada filtro que el usuario cambia.
  const setFilters = useCallback(
    (newFilters: BookFiltersType) => {
      const params = new URLSearchParams();

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.set(key, String(value));
        }
      });

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    },
    [router, pathname],
  );

  return { filters, setFilters };
}