/**
 * Opciones de ordenamiento para la tabla de administración de editoriales.
 */
export const ADMIN_PUBLISHER_SORT_OPTIONS = [
    { value: "createdAt,desc", label: "Más recientes" },
    { value: "createdAt,asc", label: "Más antiguos" },
    { value: "name,asc", label: "Nombre A-Z" },
    { value: "name,desc", label: "Nombre Z-A" },
];

/** Cantidad de elementos por página por defecto en la tabla de administración. */
export const DEFAULT_PAGE_SIZE = 10;