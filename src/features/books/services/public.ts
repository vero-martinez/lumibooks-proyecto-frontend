/**
 * Servicios públicos del módulo de libros.
 * Se encargan de realizar peticiones HTTP al backend y retornar datos tipados.
 */
import api from "@/lib/axios";
import { PageResponse } from "@/types/api.types";
import { BookCard, BookFilters, BookSuggestionResponse, Category, Publisher, BookDetail } from "@/features/books/types";

/**
 * Obtiene el catálogo de libros con filtros y paginación.
 * Los filtros se envían como query params al backend.
 */
export async function getBooksService(filters: BookFilters = {}): Promise<PageResponse<BookCard>> {
  const { data } = await api.get("/api/public/books", { params: filters });
  return data;
}

/**
 * Obtiene todas las sugerencias de libros al realizar
 * una búsqueda.
 */
export async function getBookSuggestionsService(search: string): Promise<BookSuggestionResponse[]> {
  const { data } = await api.get("/api/public/books/suggestions", {
    params: { search },
  });
  return data;
}

/**
 * Obtiene todas las categorías activas disponibles.
 * Soporta búsqueda opcional por nombre.
 */
export async function getCategoriesService(name?: string): Promise<Category[]> {
  const { data } = await api.get("/api/public/categories", {
    params: name ? { name } : undefined,
  });
  return data;
}

/**
 * Obtiene todas las editoriales activas disponibles.
 * Soporta búsqueda opcional por nombre.
 */
export async function getPublishersService(name?: string): Promise<Publisher[]> {
  const { data } = await api.get("/api/public/publishers", {
    params: name ? { name } : undefined,
  });
  return data;
}

/**
 * Obtiene el detalle público de un libro por su ID.
 */
export async function getBookDetailService(id: number): Promise<BookDetail> {
  const { data } = await api.get(`/api/public/books/${id}`);
  return data;
}

/**
 * Obtiene los 10 libros más recientes activos.
 */
export async function getLatestBooksService(): Promise<BookCard[]> {
  const { data } = await api.get("/api/public/books/latest");
  return data;
}

/**
 * Obtiene los 10 libros mejor evaluados activos.
 */
export async function getTopRatedBooksService(): Promise<BookCard[]> {
  const { data } = await api.get("/api/public/books/top-rated");
  return data;
}