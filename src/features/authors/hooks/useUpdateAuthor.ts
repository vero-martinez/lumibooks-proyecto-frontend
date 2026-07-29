/**
 * Hook para el formulario de edición de un autor.
 * Carga el detalle actual del autor (useQuery) y expone una mutación
 * para actualizarlo (useMutation) enviando los datos como multipart/form-data.
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateAuthorService, getAuthorDetailAdminService } from "@/features/authors/services";
import type { AuthorUpdateRequest } from "@/features/authors/types";

export function useUpdateAuthor(id: number) {
    const queryClient = useQueryClient();

    const authorQuery = useQuery({
        queryKey: ["admin-author-detail", id],
        queryFn: () => getAuthorDetailAdminService(id),
        enabled: !!id,
    });

    const updateMutation = useMutation({
        mutationFn: ({
            data,
            profileImage,
        }: {
            data: AuthorUpdateRequest;
            profileImage?: File;
        }) => updateAuthorService(id, data, profileImage),
        onSuccess: () => {
            toast.success("Autor actualizado exitosamente");
            queryClient.invalidateQueries({ queryKey: ["admin-authors"] });
            queryClient.invalidateQueries({ queryKey: ["admin-author-detail", id] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Error al actualizar el autor");
        },
    });

    return {
        author: authorQuery.data,
        isLoading: authorQuery.isLoading,
        isError: authorQuery.isError,
        updateAuthor: updateMutation.mutate,
        isPending: updateMutation.isPending,
    };
}