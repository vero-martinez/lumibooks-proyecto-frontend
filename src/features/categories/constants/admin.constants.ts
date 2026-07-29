/**
 * Opciones de ordenamiento para la tabla de administración de categorías.
 */
export const ADMIN_CATEGORY_SORT_OPTIONS = [
  { value: "createdAt,desc", label: "Más recientes" },
  { value: "createdAt,asc", label: "Más antiguos" },
  { value: "firstName,asc", label: "Nombre A-Z" },
  { value: "firstName,desc", label: "Nombre Z-A" },
];

/** Cantidad de elementos por página por defecto en la tabla de administración. */
export const DEFAULT_PAGE_SIZE = 10;