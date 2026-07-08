"use client";

import { useState } from "react";
import { LoadingState } from "@/components/shared/LoadingState";
import { useParams } from "next/navigation";
import { useBookDetail } from "@/features/books/hooks";
import { useBookReviews } from "@/features/reviews/hooks";
import { BookCover } from "@/components/shared/BookCover";
import { AppPagination } from "@/components/shared/AppPagination";
import { ErrorState } from "@/components/shared/ErrorState";
import { BookDetailOverview } from "@/features/books/components/BookDetailOverview";
import { BookFullDetail } from "@/features/books/components/BookFullDetail";
import { BookReviewsSection } from "@/features/reviews/components/BookReviewsSection";
import { AuthorResumeCard } from "@/features/authors/components/AuthorResumeCard";
import { Button } from "@/components/ui/button";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string; slug: string }>();
  const bookId = Number(id);
  const [tab, setTab] = useState<"detail" | "reviews">("detail");
  const [reviewParams, setReviewParams] = useState({ page: 0, size: 5 });

  const { data: book, isLoading, isError } = useBookDetail(bookId);
  const {
    data: reviewsData,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useBookReviews(bookId, reviewParams);

  return (
    <main className="max-w-screen-2xl mx-auto w-full p-4 md:p-8 lg:p-16">
      <div className="min-h-[60vh]">
        {isLoading && <LoadingState label="Cargando libro..." />}

        {isError && (
          <ErrorState
            message="Error al cargar el libro"
            description="Ocurrió un problema al obtener los detalles del libro. Intenta de nuevo más tarde."
          />
        )}

        {book && (
          <>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center mb-12">
              <BookCover
                src={book.coverImageUrl}
                alt={book.title}
                priority
                className="w-48 md:w-64 lg:w-[320px] aspect-[2/3] lg:h-[480px] lg:aspect-auto rounded-lg shadow-lg"
              />
              <BookDetailOverview book={book} />
            </div>

            <hr className="border-border/20 my-8" aria-hidden="true" />

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
                  className={`text-base font-semibold tracking-wide ${
                    tab === "detail"
                      ? "text-foreground"
                      : "text-muted-foreground/60 hover:text-foreground/80"
                  }`}
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
                  className={`text-base font-semibold tracking-wide ${
                    tab === "reviews"
                      ? "text-foreground"
                      : "text-muted-foreground/60 hover:text-foreground/80"
                  }`}
                >
                  Ver reviews
                </Button>
              </div>

              <div
                role="tabpanel"
                id={tab === "detail" ? "panel-detail" : "panel-reviews"}
                aria-labelledby={
                  tab === "detail" ? "tab-detail" : "tab-reviews"
                }
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

            <hr className="border-border/20 my-8" aria-hidden="true" />

            <section className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-xl font-bold text-foreground">
                Autor{book.authors.length > 1 ? "es" : ""}
              </h2>
              {book.authors.map((author) => (
                <AuthorResumeCard key={author.id} author={author} />
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  );
}