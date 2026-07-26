/**
 * Hook para crear un libro.
 * Usa useMutation de TanStack Query con envío multipart/form-data.
 */
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBookService } from "@/features/books/services";
import type { BookCreateRequest } from "@/features/books/types";

export function useCreateBook() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      data,
      coverImage,
    }: {
      data: BookCreateRequest;
      coverImage: File;
    }) => createBookService(data, coverImage),
    onSuccess: () => {
      toast.success("Libro creado exitosamente");
      router.push("/admin/books");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error al crear el libro");
    },
  });
}