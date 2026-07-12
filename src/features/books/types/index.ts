/**
 * Tipos del módulo de libros.
 */

import { AuthorDetail } from "@/features/authors/types";

// Enums del Backend (format y language)
export type BookLanguage = "ESPAÑOL" | "INGLES";
export type BookFormat = "TAPA_BLANDA" | "TAPA_DURA" | "BOLSILLO";
// Valores de ordenamiento enviados al parámetro "sort" de Spring Boot
export type BookSort =
  | "createdAt,desc"
  | "price,asc"
  | "price,desc";

// Respuesta del endpoint público de Obtener libros 
export interface BookCard {
  id: number;
  coverImageUrl: string;
  title: string;
  authors: string[];
  price: number;
  averageRating: number;
  totalReviews: number;
}

// Respuesta del endpoint público de obtener sugerencias de libros en searchbar
export interface BookSuggestionResponse {
  id: number;
  coverImageUrl: string;
  title: string;
  author: string;
}

// Datos enviados al backend para filtrar libros
export interface BookFilters {
  search?: string;
  categoryId?: number;
  publisherId?: number;
  language?: BookLanguage;
  format?: BookFormat;
  minPrice?: number;
  maxPrice?: number;
  sort?: BookSort;
  page?: number;
  size?: number;
}

// Respuesta del endpoint público de obtener categorias para filtros de libros
export interface Category {
  id: number;
  name: string;
}

// Respuesta del endpoint público de obtener editoriales para filtros de libros
export interface Publisher {
  id: number;
  name: string;
}

// Respuesta del endpoint público de detalle de un libro
export interface BookDetail {
  id: number;
  coverImageUrl: string;
  title: string;
  authors: AuthorDetail[];
  available: boolean;
  description: string;
  price: number;
  isbn: string;
  pageCount: number;
  publisherName: string;
  language: BookLanguage;
  format: BookFormat;
  editionYear?: number;
  categories: string[];
  averageRating: number;
  totalReviews: number;
}

// Respuesta para obtener un libro de una lista.
export interface BookWishlistResponse {
  id: number;
  coverImageUrl: string;
  title: string;
  authors: string[];
  price: number;
}