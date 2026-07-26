/**
 * Servicios públicos del módulo de autores.
 * Contienen las llamadas HTTP al backend Spring Boot relacionadas al catálogo público de autores.
 * Se encargan de realizar peticiones HTTP al backend y retornar datos tipados.
 */
import api from "@/lib/axios";
import { PageResponse } from "@/types/api.types";
import { AuthorPublicResponse, AuthorsFilters } from "@/features/authors/types";

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