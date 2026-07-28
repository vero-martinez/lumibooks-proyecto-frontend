/**
 * Hook para crear un autor.
 * Usa useMutation de TanStack Query con envío multipart/form-data.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createAuthorService } from "@/features/authors/services";
import type { AuthorCreateRequest } from "@/features/authors/types";

export function useCreateAuthor() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            data,
            profileImage,
        }: {
            data: AuthorCreateRequest;
            profileImage?: File;
        }) => createAuthorService(data, profileImage),
        onSuccess: () => {
            toast.success("Autor creado exitosamente");
            queryClient.invalidateQueries({ queryKey: ["admin-authors"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al crear el autor");
        },
    });
}