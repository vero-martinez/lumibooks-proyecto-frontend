/**
 * Hook para el formulario de edición de un libro.
 * Carga el detalle actual del libro (useQuery) y expone una mutación
 * para actualizarlo (useMutation) enviando los datos como multipart/form-data.
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateBookService, getBookDetailAdminService } from "@/features/books/services";
import type { BookUpdateRequest } from "@/features/books/types";

export function useUpdateBook(id: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const bookQuery = useQuery({
    queryKey: ["admin-book-detail", id],
    queryFn: () => getBookDetailAdminService(id),
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      data,
      coverImage,
    }: {
      data: BookUpdateRequest;
      coverImage?: File;
    }) => updateBookService(id, data, coverImage),
    onSuccess: () => {
      toast.success("Libro actualizado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["admin-books"] });
      queryClient.invalidateQueries({ queryKey: ["admin-book-detail", id] });
      router.push("/admin/books");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al actualizar el libro");
    },
  });

  return {
    book: bookQuery.data,
    isLoading: bookQuery.isLoading,
    isError: bookQuery.isError,
    updateBook: updateMutation.mutate,
    isPending: updateMutation.isPending,
  };
}