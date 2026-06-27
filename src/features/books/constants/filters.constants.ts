import { BookLanguage, BookFormat, BookSort } from "../types";

/**
 * Opciones disponibles para filtrar libros por idioma.
 */
export const BOOK_LANGUAGES: { label: string; value: BookLanguage }[] = [
    { label: "ESPAÑOL", value: "ESPAÑOL" },
    { label: "INGLÉS", value: "INGLES" },
];

/**
 * Opciones disponibles para filtrar libros por formato físico.
 */
export const BOOK_FORMATS: { label: string; value: BookFormat }[] = [
    { label: "TAPA BLANDA", value: "TAPA_BLANDA" },
    { label: "TAPA DURA", value: "TAPA_DURA" },
    { label: "BOLSILLO", value: "BOLSILLO" },
];

/**
 * Opciones disponibles para ordenar el catálogo de libros.
 */
export const BOOK_SORT_OPTIONS: { label: string; value: BookSort }[] = [
    { label: "Más recientes", value: "createdAt,desc" },
    { label: "Menor precio", value: "price,asc" },
    { label: "Mayor precio", value: "price,desc" },
];

/**
 * Rango de precios por defecto usado en el filtro de libros.
 * Representa el mínimo y máximo inicial del slider de precio.
 */
export const DEFAULT_PRICE_RANGE: [number, number] = [0, 500];

/**
 * Incremento de ajuste del slider de precio.
 * Define cada cuánto “salta” el valor del rango.
 */
export const PRICE_STEP = 10;

/**
 * Longitud mínima de texto para considerar una búsqueda válida en el frontend.
 * Debe ser siempre >= al mínimo que valida el backend (hoy: 2).
 */
export const MIN_SEARCH_LENGTH = 2;