/** Opción genérica para los componentes de filtro (RadioGroup, etc.). */
export interface FilterOption {
  value: string;
  label: string;
}

/**
 * Transforma un array de { id, name } (categorías, editoriales) en opciones
 * de filtro con value string (id) y label con primera letra mayúscula.
 */
export function toFilterOptions(
  items: { id: number; name: string }[] | undefined,
): FilterOption[] {
  if (!items) return [];
  return items.map((item) => ({
    value: item.id.toString(),
    label: item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase(),
  }));
}
