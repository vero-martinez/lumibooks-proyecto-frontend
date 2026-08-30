"use client";

/**
 * Card de un libro pendiente de reseña.
 * Muestra la portada, el título y el botón para escribir la reseña.
 */
import NextLink from "next/link";
import { FaPenNib } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookCover } from "@/components/shared/BookCover";
import { buildBookDetailUrl } from "@/features/books/utils/buildBookDetailUrl";
import type { ReviewPendingResponse } from "@/features/reviews/types";

interface PendingReviewCardProps {
    book: ReviewPendingResponse;
    onWrite: (book: ReviewPendingResponse) => void;
}

export function PendingReviewCard({ book, onWrite }: PendingReviewCardProps) {
    const detailUrl = buildBookDetailUrl(book.bookId, book.title);

    return (
        <Card className="rounded-2xl border-border/40 p-0 shadow-sm transition-all hover:shadow-md">
            <CardContent className="flex gap-4 p-5">
                <NextLink href={detailUrl} className="shrink-0">
                    <BookCover
                        src={book.coverImageUrl}
                        alt={`Portada de ${book.title}`}
                        className="h-[110px] w-18 shrink-0 rounded-sm"
                    />
                </NextLink>

                <div className="flex min-w-0 flex-1 flex-col">
                    <NextLink
                        href={detailUrl}
                        className="line-clamp-1 font-semibold leading-snug text-foreground hover:text-primary hover:underline"
                    >
                        {book.title}
                    </NextLink>
                    <p className="mt-1 text-xs">
                        ISBN: {book.isbn}
                    </p>

                    <p className="mt-3 text-sm line-clamp-2">
                        Cuéntanos qué te pareció este libro. Tu opinión ayuda a otros
                        lectores.
                    </p>

                    <div className="mt-auto pt-3">
                        <Button onClick={() => onWrite(book)} className="px-4">
                            <FaPenNib aria-hidden="true" />
                            Escribir reseña
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}