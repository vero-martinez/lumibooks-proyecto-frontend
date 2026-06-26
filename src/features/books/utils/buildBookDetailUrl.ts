// features/books/utils/buildBookDetailUrl.ts
import { slugify } from "@/lib/utils";

/**
 * Construye la URL de detalle de un libro: /books/{slug-del-titulo}/{id}.
 * Único lugar del proyecto que sabe cómo se forma esta ruta — evita que
 * cada componente reconstruya el patrón a mano y se desincronicen si
 * el formato de la URL cambia en el futuro.
 */
export function buildBookDetailUrl(id: number, title: string): string {
    return `/books/${slugify(title)}/${id}`;
}