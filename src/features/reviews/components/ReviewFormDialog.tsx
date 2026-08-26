"use client";

/**
 * Diálogo para crear o editar una reseña.
 * Creación: calificación + comentario.
 * Edición: solo comentario; la calificación se muestra pero no se puede cambiar.
 */
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaCommentDots } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/shared/FormField";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { BookCover } from "@/components/shared/BookCover";
import { StarRating } from "@/components/shared/StarRating";
import { StarRatingInput } from "./StarRatingInput";
import { useCreateReview, useUpdateReview } from "@/features/reviews/hooks";
import { reviewCreateSchema, type ReviewCreateSchema } from "@/features/reviews/schemas";
import type {
    ReviewClientResponse,
    ReviewPendingResponse,
} from "@/features/reviews/types";

/** Límite de caracteres del comentario.
 *  Debe coincidir con reviewCreateSchema y con la validación del backend. */
const COMMENT_MAX_LENGTH = 1000;

interface ReviewFormDialogProps {
    open: boolean;
    /** Libro pendiente: habilita modo creación */
    book?: ReviewPendingResponse | null;
    /** Reseña existente: habilita modo edición */
    review?: ReviewClientResponse | null;
    onClose: () => void;
}

export function ReviewFormDialog({ open, book, review, onClose }: ReviewFormDialogProps) {
    const createReview = useCreateReview();
    const updateReview = useUpdateReview();
    const isSubmitting = createReview.isPending || updateReview.isPending;

    const isEditing = !!review;
    const target = useMemo(
        () =>
            book
                ? { bookId: book.bookId, title: book.title, coverImageUrl: book.coverImageUrl }
                : review
                    ? {
                          bookId: review.bookId,
                          title: review.bookTitle,
                          coverImageUrl: review.bookCoverImageUrl,
                      }
                    : null,
        [book, review],
    );

    const defaultValues = useMemo(
        () => ({
            bookId: target?.bookId ?? 0,
            rating: isEditing && review ? review.rating : undefined,
            comment: isEditing && review ? review.comment : "",
        }),
        [target, isEditing, review],
    );

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ReviewCreateSchema>({
        resolver: zodResolver(reviewCreateSchema),
        defaultValues,
    });

    // Re-sincroniza el formulario al abrir con otro libro o reseña
    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const commentValue = watch("comment") ?? "";
    const currentRating = review?.rating ?? 0;

    if (!open || !target) return null;

    const handleValidSubmit = (values: ReviewCreateSchema) => {
        if (isEditing && review) {
            updateReview.mutate(
                { reviewId: review.id, request: { comment: values.comment } },
                { onSuccess: onClose },
            );
        } else if (book) {
            createReview.mutate(
                { bookId: book.bookId, rating: values.rating, comment: values.comment },
                { onSuccess: onClose },
            );
        }
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent showCloseButton className="gap-0 p-0 sm:max-w-lg">
                <DialogHeader className="items-center gap-2 px-6 pt-6 pb-2 text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                        <FaCommentDots size={22} className="text-primary" aria-hidden="true" />
                    </span>
                    <DialogTitle className="text-lg">
                        {isEditing ? "Editar reseña" : "Escribir reseña"}
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                        {isEditing
                            ? "Actualiza tu comentario. La calificación original se mantiene."
                            : "Cuéntanos qué te pareció el libro para ayudar a otros lectores."}
                    </DialogDescription>
                </DialogHeader>

                {/* Resumen del libro reseñado */}
                <div className="px-6 pt-4">
                    <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/40 p-3">
                        <BookCover
                            src={target.coverImageUrl}
                            alt={`Portada de ${target.title}`}
                            sizes="56px"
                            className="h-16 w-11 shrink-0 rounded-md shadow-sm ring-1 ring-border/40"
                        />
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-foreground">
                                {target.title}
                            </p>
                            {isEditing && (
                                <div className="mt-1 flex items-center gap-1.5">
                                    <StarRating rating={currentRating} size={13} />
                                    <span className="text-xs text-muted-foreground">
                                        ({currentRating}/5)
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(handleValidSubmit)} noValidate className="px-6 pt-5 pb-6">
                    <div className="space-y-5">
                        {!isEditing && (
                            <FormField
                                label="¿Cuánto te gustó?"
                                name="rating"
                                error={errors.rating}
                                required
                            >
                                <StarRatingInput
                                    id="rating"
                                    value={watch("rating") ?? null}
                                    onChange={(value) =>
                                        setValue("rating", value, { shouldValidate: true })
                                    }
                                />
                            </FormField>
                        )}

                        <FormField label="Comentario" name="comment" error={errors.comment} required>
                            <Textarea
                                id="comment"
                                rows={5}
                                maxLength={COMMENT_MAX_LENGTH}
                                placeholder="Cuéntanos tu experiencia con el libro..."
                                className="resize-none"
                                {...register("comment")}
                            />
                            <p className="mt-1 text-right text-xs text-muted-foreground tabular-nums">
                                {commentValue.length}/{COMMENT_MAX_LENGTH}
                            </p>
                        </FormField>
                    </div>

                    <div className="flex gap-3 pt-5">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                            size="lg"
                            className="flex-1"
                        >
                            Cancelar
                        </Button>
                        <LoadingButton
                            type="submit"
                            loading={isSubmitting}
                            loadingText="Guardando..."
                            size="lg"
                            className="flex-1"
                        >
                            {isEditing ? "Guardar cambios" : "Publicar reseña"}
                        </LoadingButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}