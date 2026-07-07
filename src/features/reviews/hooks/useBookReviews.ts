/**
 * Hook de TanStack Query para obtener las reseñas públicas de un libro.
 * Recibe el ID del libro y parámetros opcionales de paginación (page, size)
 * y devuelve una página de reseñas.
 */
import { useQuery } from "@tanstack/react-query";
import { getBookReviewsService } from "@/features/reviews/services";
import type { BookReviewsParams } from "@/features/reviews/types";

export function useBookReviews(bookId: number, params?: BookReviewsParams) {
  return useQuery({
    queryKey: ["book-reviews", bookId, params],
    queryFn: () => getBookReviewsService(bookId, params),
  });
}