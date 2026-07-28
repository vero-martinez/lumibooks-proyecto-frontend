/**
 * Servicios públicos del módulo de autores.
 * Contienen las llamadas HTTP al backend Spring Boot relacionadas al catálogo público de autores.
 * Se encargan de realizar peticiones HTTP al backend y retornar datos tipados.
 */
import api from "@/lib/axios";
import { PageResponse } from "@/types/api.types";
import { AuthorPublicResponse, AuthorsFilters, AuthorDetail } from "@/features/authors/types";
import { BookCard } from "@/features/books/types";

/**
 * Obtiene el catálogo de autores con filtros y paginación.
 * Los filtros se envían como query params al backend.
 */
export async function getAuthorsService(filters: AuthorsFilters = {}): Promise<PageResponse<AuthorPublicResponse>> {
  const { data } = await api.get("/api/public/authors", { params: filters });
  return data;
}

/**
 * Obtiene todos los autores activos sin paginación.
 * Usado en selects/dropdowns de formularios de libros.
 */
export async function getAllAuthorsService(search?: string): Promise<AuthorPublicResponse[]> {
  const { data } = await api.get("/api/public/authors/all", {
    params: search ? { search } : undefined,
  });
  return data;
}

/**
 * Obtiene el detalle público de un autor por su ID.
 * Retorna información básica: nombre, apellido, biografía e imagen de perfil.
 */
export async function getAuthorDetailService(id: number): Promise<AuthorDetail> {
  const { data } = await api.get(`/api/public/authors/${id}`);
  return data;
}

/**
 * Obtiene los libros de un autor con paginación.
 * Usa el endpoint público de libros filtrando por authorId.
 */
export async function getAuthorBooksService(
  authorId: number,
  filters: { page?: number; size?: number } = {}
): Promise<PageResponse<BookCard>> {
  const { data } = await api.get("/api/public/books", {
    params: { authorId, ...filters },
  });
  return data;
}