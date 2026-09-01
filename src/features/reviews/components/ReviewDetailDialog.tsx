/**
 * Dialog de detalle de una reseña en el panel de administración.
 * Solo lectura: usuario, libro, calificación, comentario y metadatos.
 */
"use client";

import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XIcon, BookOpenIcon, ClockIcon } from "lucide-react";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { StarRating } from "@/components/shared/StarRating";
import { ReviewStatusBadge } from "./ReviewStatusBadge";
import { useReviewAdminDetail } from "@/features/reviews/hooks";
import { formatDateTime } from "@/lib/utils";

interface ReviewDetailDialogProps {
    reviewId: number | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ReviewDetailDialog({
    reviewId,
    open,
    onOpenChange,
}: ReviewDetailDialogProps) {
    const { data: review, isLoading, isError } = useReviewAdminDetail(reviewId, open);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-lg max-h-[85vh] overflow-y-auto p-0 gap-0"
                showCloseButton={false}
            >
                {/* Header */}
                <div className="relative bg-primary text-primary-foreground px-6 sm:px-8 py-6">
                    <DialogTitle className="text-lg font-semibold text-primary-foreground pr-8">
                        Detalle de la reseña
                    </DialogTitle>
                    <DialogClose asChild>
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            className="absolute right-4 top-4 text-primary-foreground hover:bg-primary-foreground/20"
                        >
                            <XIcon className="size-4" />
                            <span className="sr-only">Cerrar</span>
                        </Button>
                    </DialogClose>
                </div>

                <div className="px-6 sm:px-8 py-6">
                    {isLoading ? (
                        <LoadingState label="Cargando detalle..." />
                    ) : isError ? (
                        <ErrorState message="No se pudo cargar el detalle" />
                    ) : review ? (
                        <div className="flex flex-col gap-7">
                            {/* Usuario, estado y calificación */}
                            <div className="flex items-start gap-3">
                                <UserAvatar name={review.userName} />
                                <div className="flex flex-col min-w-0">
                                    <span className="font-semibold text-foreground truncate">
                                        {review.userName}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        DNI {review.userDni}
                                    </span>
                                </div>
                                <div className="ml-auto flex flex-col items-end gap-1.5 shrink-0">
                                    <ReviewStatusBadge status={review.status} />
                                </div>
                            </div>

                            {/* Libro */}
                            <div className="flex gap-3 rounded-md bg-card border border-border px-4 py-3.5">
                                <BookOpenIcon className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                                <div className="min-w-0">
                                    <p className="font-medium text-foreground leading-snug">
                                        {review.bookTitle}
                                    </p>
                                    {review.authors.length > 0 && (
                                        <p className="text-sm text-muted-foreground mt-0.5">
                                            {review.authors.join(", ")}
                                        </p>
                                    )}
                                    <p className="text-xs text-muted-foreground mt-1">
                                        ISBN {review.bookIsbn}
                                    </p>
                                </div>
                            </div>

                            {/* Calificación y comentario */}
                            <section>
                                <p className="font-semibold text-foreground mb-4">Reseña</p>
                                <div className="rounded-2xl border border-border/20 shadow-sm px-4 py-5 space-y-4">
                                    <InfoRow
                                        icon={FaStar}
                                        iconColor="text-amber-500"
                                        label={
                                            <span className="flex items-center gap-2">
                                                <StarRating rating={review.rating} size={14} />
                                                <span className="font-medium text-foreground">
                                                    {review.rating}
                                                </span>
                                            </span>
                                        }
                                    />
                                    <div className="flex items-start gap-2.5 text-sm">
                                        <FaQuoteLeft
                                            className="size-3 shrink-0 mt-1 text-violet-500"
                                            aria-hidden
                                        />
                                        <span className="text-foreground leading-relaxed">
                                            {review.comment}
                                            <FaQuoteRight
                                                className="inline size-3 ml-1.5 -translate-y-0.5 text-violet-500"
                                                aria-hidden
                                            />
                                        </span>
                                    </div>
                                </div>
                            </section>

                            {/* Metadatos */}
                            <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground border-t border-border/60">
                                <div className="flex items-center gap-1.5 mt-4">
                                    <ClockIcon className="size-3.5" aria-hidden="true" />
                                    <span>Creado {formatDateTime(review.createdAt)}</span>
                                </div>
                                <span className="mt-4 text-border" aria-hidden="true">·</span>
                                <div className="mt-4">
                                    Actualizado {formatDateTime(review.updatedAt)}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </DialogContent>
        </Dialog>
    );
}

/** Fila de info con icono */
function InfoRow({
    icon: Icon,
    iconColor,
    label,
}: {
    icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
    iconColor: string;
    label: React.ReactNode;
}) {
    return (
        <div className="flex items-start gap-2.5 text-sm">
            <Icon className={`size-3.5 shrink-0 mt-0.5 ${iconColor}`} aria-hidden />
            <span className="text-foreground">{label}</span>
        </div>
    );
}