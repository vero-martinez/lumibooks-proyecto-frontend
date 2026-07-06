/**
 * Servicios públicos del módulo de reviews.
 * Se encargan de realizar peticiones HTTP al backend y retornar datos tipados.
 */
import { ReviewPublic, BookReviewsParams } from "@/features/reviews/types";
import { PageResponse } from "@/types/api.types";
import api from "@/lib/axios";

/**
 * Obtiene las reseñas públicas de un libro por su ID con paginación.
 */
export async function getBookReviewsService(
  bookId: number,
  params: BookReviewsParams = {},
): Promise<PageResponse<ReviewPublic>> {
  const { data } = await api.get(`/api/public/books/${bookId}/reviews`, { params });
  return data;
}