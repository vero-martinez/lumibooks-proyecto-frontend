// features/authors/utils/buildAuthorDetailUrl.ts
import { slugify } from "@/lib/utils";

/**
 * Construye la URL de detalle de un autor: /authors/{slug-del-nombre}/{id}.
 * Único lugar del proyecto que sabe cómo se forma esta ruta — evita que
 * cada componente reconstruya el patrón a mano y se desincronicen si
 * el formato de la URL cambia en el futuro.
 */
export function buildAuthorDetailUrl(id: number, name: string): string {
    return `/authors/${slugify(name)}/${id}`;
}
