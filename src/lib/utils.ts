import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combina clases de Tailwind sin conflictos (clsx + tailwind-merge).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Da formato a un número como precio en soles, ej: S/ 50.00.
export function formatPrice(price: number, decimals = 2): string {
  return `S/ ${price.toFixed(decimals)}`;
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