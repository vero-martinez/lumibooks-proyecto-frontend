/**
 * Sección de información de un libro en su página de detalle.
 * Muestra tabs para alternar entre detalles completos y reseñas.
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { AppPagination } from "@/components/shared/AppPagination";
import { BookFullDetail } from "@/features/books/components/BookFullDetail";
import { BookReviewsSection } from "@/features/reviews/components/BookReviewsSection";
import { useBookReviews } from "@/features/reviews/hooks";
import type { BookDetail } from "@/features/books/types";

const TAB_BASE = "text-base font-semibold tracking-wide";
const TAB_ACTIVE = "text-foreground";
const TAB_INACTIVE = "text-muted-foreground/60 hover:text-foreground/80";

interface BookInfoSectionProps {
  bookId: number;
  book: BookDetail;
}

export function BookInfoSection({ bookId, book }: BookInfoSectionProps) {
  const [tab, setTab] = useState<"detail" | "reviews">("detail");
  const [reviewParams, setReviewParams] = useState({ page: 0, size: 5 });

  const {
    data: reviewsData,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useBookReviews(bookId, reviewParams);

  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-xl font-bold text-foreground">
        Información del libro
      </h2>
      <div
        role="tablist"
        aria-label="Secciones del libro"
        className="flex items-center justify-center gap-16 pb-4"
      >
        <Button
          role="tab"
          id="tab-detail"
          aria-selected={tab === "detail"}
          aria-controls="panel-detail"
          variant="ghost"
          onClick={() => setTab("detail")}
          className={`${TAB_BASE} ${tab === "detail" ? TAB_ACTIVE : TAB_INACTIVE}`}
        >
          Detalle completo
        </Button>
        <Button
          role="tab"
          id="tab-reviews"
          aria-selected={tab === "reviews"}
          aria-controls="panel-reviews"
          variant="ghost"
          onClick={() => setTab("reviews")}
          className={`${TAB_BASE} ${tab === "reviews" ? TAB_ACTIVE : TAB_INACTIVE}`}
        >
          Ver reviews
        </Button>
      </div>

      <div
        role="tabpanel"
        id={tab === "detail" ? "panel-detail" : "panel-reviews"}
        aria-labelledby={tab === "detail" ? "tab-detail" : "tab-reviews"}
      >
        {tab === "detail" ? (
          <BookFullDetail book={book} />
        ) : isReviewsLoading ? (
          <LoadingState label="Cargando reseñas..." />
        ) : isReviewsError ? (
          <ErrorState
            message="Error al cargar las reseñas"
            description="Ocurrió un problema al obtener las reseñas. Intenta de nuevo más tarde."
          />
        ) : (
          <>
            <BookReviewsSection reviews={reviewsData?.content ?? []} />
            {reviewsData && reviewsData.totalPages > 0 && (
              <AppPagination
                currentPage={reviewParams.page ?? 0}
                totalPages={reviewsData.totalPages}
                isFirst={reviewsData.first}
                isLast={reviewsData.last}
                onPageChange={(page) =>
                  setReviewParams({ ...reviewParams, page })
                }
                className="mt-8"
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}