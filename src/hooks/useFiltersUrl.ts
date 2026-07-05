/**
 * Hook genérico para sincronizar filtros con los search params de la URL.
 * Toma una lista de claves de filtro y notifica cambios vía router.push,
 * permitiendo compartir el estado de filtros mediante la URL.
 */
import { useCallback, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useFiltersUrl<T>(
  filterKeys: readonly (keyof T)[],
  numericKeys: readonly (keyof T)[] = [],
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(() => {
    const result: Record<string, string | number> = {};

    searchParams.forEach((value, key) => {
      if (!(filterKeys as readonly string[]).includes(key)) return;
      result[key] = (numericKeys as readonly string[]).includes(key)
        ? Number(value)
        : value;
    });

    return result as T;
  }, [searchParams, filterKeys, numericKeys]);

  const setFilters = useCallback(
    (newFilters: T) => {
      const params = new URLSearchParams();

      Object.entries(newFilters as Record<string, unknown>).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.set(key, String(value));
        }
      });

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [router, pathname],
  );

  return { filters, setFilters };
}
