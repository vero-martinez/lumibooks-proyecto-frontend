/**
 * Servicios de administración del módulo de libros.
 * Endpoints para crear, editar y gestionar libros.
 */
import api from "@/lib/axios";
import { PageResponse } from "@/types/api.types";
import type { BookCreateRequest, BookUpdateRequest, BookResponse, BookSummary, BookAdminFilters, BookAdminDetail } from "@/features/books/types";

/**
 * Obtiene la lista de libros para la tabla de administración.
 * Soporta filtros dinámicos y paginación.
 */
export async function getBooksAdminService(filters: BookAdminFilters = {}): Promise<PageResponse<BookSummary>> {
  const { data } = await api.get("/api/admin/books", { params: filters });
  return data;
}

/**
 * Cambia el estado activo/inactivo de un libro.
 */
export async function toggleBookStatusService(id: number): Promise<void> {
  await api.patch(`/api/admin/books/${id}/status`);
}

/**
 * Obtiene el detalle completo de un libro para el panel de administración.
 */
export async function getBookDetailAdminService(id: number): Promise<BookAdminDetail> {
  const { data } = await api.get(`/api/admin/books/${id}`);
  return data;
}

/**
 * Crea un nuevo libro enviando los datos como multipart/form-data.
 * El campo "data" contiene el JSON con los campos del libro.
 * El campo "coverImage" contiene la imagen de portada.
 */
export async function createBookService(
  data: BookCreateRequest,
  coverImage: File,
): Promise<BookResponse> {
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(data)], { type: "application/json" }),
  );
  formData.append("coverImage", coverImage);

  const { data: response } = await api.post("/api/admin/books", formData);
  return response;
}

/**
 * Actualiza un libro existente enviando los datos como multipart/form-data.
 * El campo "data" contiene el JSON con los campos a actualizar.
 * El campo "coverImage" es opcional y contiene la nueva imagen de portada.
 */
export async function updateBookService(
  id: number,
  data: BookUpdateRequest,
  coverImage?: File,
): Promise<BookResponse> {
  const formData = new FormData();
  formData.append(
    "data",
    new Blob([JSON.stringify(data)], { type: "application/json" }),
  );
  if (coverImage) {
    formData.append("coverImage", coverImage);
  }

  const { data: response } = await api.patch(`/api/admin/books/${id}`, formData);
  return response;
}