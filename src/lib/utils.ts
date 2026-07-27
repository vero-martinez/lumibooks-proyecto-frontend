import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combina clases de Tailwind sin conflictos (clsx + tailwind-merge).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convierte un array de autores con firstName/lastName a string separado por comas.
export function formatAuthors(
  authors: { firstName: string; lastName: string }[],
): string {
  return authors.map((a) => `${a.firstName} ${a.lastName}`).join(", ");
}

// Da formato a un número como precio en soles, ej: S/ 50.00.
export function formatPrice(price: number, decimals = 2): string {
  return `S/ ${price.toFixed(decimals)}`;
}

// Da formato a una fecha ISO al estilo local peruano: "15 dic. 2025".
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Da formato a una fecha ISO con hora: "15 dic. 2025, 3:45 p. m."
export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString("es-PE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// Convierte un texto en un slug para URLs (sin tildes, sin espacios).
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}