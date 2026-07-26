"use client";

import { useBanners } from "@/features/banners/hooks";
import { useLatestBooks, useTopRatedBooks } from "@/features/books/hooks";
import { BannerCarousel } from "@/features/banners/components/BannerCarousel";
import { BookCarousel } from "@/features/books/components/BookCarousel";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SubscribeSection } from "@/features/subscribers/components/SubscribeSection";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";

export default function Home() {
  const {
    data: banners,
    isLoading: isBannersLoading,
    isError: isBannersError,
  } = useBanners();
  const {
    data: latestBooks,
    isLoading: isBooksLoading,
    isError: isBooksError,
  } = useLatestBooks();
  const {
    data: topRatedBooks,
    isLoading: isTopRatedLoading,
    isError: isTopRatedError,
  } = useTopRatedBooks();

  const isLoading = isBannersLoading || isBooksLoading || isTopRatedLoading;
  const hasData = banners || latestBooks || topRatedBooks;

  return (
    <main className="min-h-[60vh]">
      {isLoading && !hasData && <LoadingState label="Cargando página..." />}

      {/* Banner carousel */}
      <section aria-label="Banner">
        {isBannersError && (
          <ErrorState
            message="Error al cargar los banners"
            description="Ocurrió un problema al obtener los banners. Intenta de nuevo más tarde."
          />
        )}
        {banners && banners.length > 0 && <BannerCarousel slides={banners} />}
      </section>

      {/* Libros recién agregados */}
      <section className="max-w-screen-xl mx-auto px-8 sm:px-10 md:px-16 lg:px-16 space-y-6 mt-12">
        {isBooksError && (
          <ErrorState
            message="Error al cargar los libros"
            description="Ocurrió un problema al obtener los libros. Intenta de nuevo más tarde."
          />
        )}
        {latestBooks && latestBooks.length > 0 && (
          <BookCarousel title="Recién agregados" books={latestBooks} />
        )}
      </section>

      {/* Top rated */}
      <section className="bg-gradient-to-br from-accent via-accent/80 to-primary/10 py-10 mt-14">
        <div className="max-w-screen-xl mx-auto px-8 sm:px-10 md:px-16 lg:px-16 space-y-6">
          {isTopRatedError && (
            <ErrorState
              message="Error al cargar los libros"
              description="Ocurrió un problema al obtener los libros. Intenta de nuevo más tarde."
            />
          )}
          {topRatedBooks && topRatedBooks.length > 0 && (
            <BookCarousel title="Mejor evaluados" books={topRatedBooks} />
          )}
        </div>
      </section>

      <HowItWorks />

      <section className="mt-8">
        <SubscribeSection />
      </section>
    </main>
  );
}