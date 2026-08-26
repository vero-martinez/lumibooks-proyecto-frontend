"use client";

/**
 * Card de una reseña propia del cliente.
 * Muestra la portada y el título del libro (con link al detalle),
 * la calificación, el comentario, la fecha y las acciones editar/eliminar.
 */
import NextLink from "next/link";
import { FaPen, FaTrash } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookCover } from "@/components/shared/BookCover";
import { StarRating } from "@/components/shared/StarRating";
import { formatDateTime } from "@/lib/utils";
import { buildBookDetailUrl } from "@/features/books/utils/buildBookDetailUrl";
import type { ReviewClientResponse } from "@/features/reviews/types";

interface MyReviewCardProps {
    review: ReviewClientResponse;
    onEdit: (review: ReviewClientResponse) => void;
    onDelete: (review: ReviewClientResponse) => void;
}

const PLAIN_ICON_BUTTON =
    "flex items-center justify-center p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export function MyReviewCard({ review, onEdit, onDelete }: MyReviewCardProps) {
    const detailUrl = buildBookDetailUrl(review.bookId, review.bookTitle);
    const wasEdited = review.updatedAt !== review.createdAt;

    return (
        <Card className="grid grid-cols-[1fr_44px] overflow-hidden rounded-2xl border-border/40 p-0 shadow-sm transition-all hover:shadow-md">
            {/* Cuerpo izquierdo: portada + datos de la reseña */}
            <CardContent className="flex gap-4 p-5">
                <NextLink href={detailUrl} className="shrink-0">
                    <BookCover
                        src={review.bookCoverImageUrl}
                        alt={`Portada de ${review.bookTitle}`}
                        className="h-[110px] w-18 shrink-0 rounded-sm"
                    />
                </NextLink>

                <div className="min-w-0 flex-1">
                    <NextLink
                        href={detailUrl}
                        className="line-clamp-1 font-semibold leading-snug text-foreground hover:text-primary hover:underline"
                    >
                        {review.bookTitle}
                    </NextLink>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <StarRating rating={review.rating} size={16} />
                        <span>
                            {formatDateTime(review.createdAt)}
                        </span>
                        {wasEdited && (
                            <Badge
                                variant="secondary"
                                className="px-2 bg-accent/80"
                            >
                                Editada: {formatDateTime(review.updatedAt)}
                            </Badge>
                        )}
                    </div>

                    <p className="mt-3 leading-relaxed line-clamp-4">
                        {review.comment}
                    </p>
                </div>
            </CardContent>

            {/* Cuerpo derecho: editar / eliminar */}
            <div className="grid grid-rows-2 divide-y divide-border/60 border-l border-border/60">
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        onClick={() => onEdit(review)}
                        aria-label={`Editar reseña de ${review.bookTitle}`}
                        className={cn(
                            PLAIN_ICON_BUTTON,
                            "text-foreground hover:text-foreground/70",
                        )}
                    >
                        <FaPen size={15} aria-hidden="true" />
                    </button>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        onClick={() => onDelete(review)}
                        aria-label={`Eliminar reseña de ${review.bookTitle}`}
                        className={cn(
                            PLAIN_ICON_BUTTON,
                            "text-foreground hover:text-destructive",
                        )}
                    >
                        <FaTrash size={15} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </Card>
    );
}