/**
 * Opciones de ordenamiento para la tabla de administración de libros.
 */
export const ADMIN_BOOK_SORT_OPTIONS = [
  { value: "createdAt,desc", label: "Más recientes" },
  { value: "createdAt,asc", label: "Más antiguos" },
  { value: "stock,desc", label: "Stock mayor a menor" },
  { value: "stock,asc", label: "Stock menor a mayor" },
];

/** Umbral de stock para mostrar badge de stock bajo. */
export const STOCK_THRESHOLD = 10;

/** Cantidad de elementos por página por defecto en la tabla de administración. */
export const DEFAULT_PAGE_SIZE = 10;