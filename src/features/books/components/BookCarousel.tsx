/**
 * Carrusel de libros con navegación horizontal.
 * Se reutiliza para secciones de la landing page (recién agregados, mejor evaluados).
 * Orquesta las mutaciones de carrito/wishlists y sus diálogos.
 */
"use client";

import { useState, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { BookCard } from "@/features/books/components/BookCard";
import { useBookCardActions } from "@/features/books/hooks";
import { WishlistSelectDialog } from "@/features/wishlists/components/WishlistSelectDialog";
import { AuthRequiredDialog } from "@/components/shared/AuthRequiredDialog";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { GiKnockedOutStars } from "react-icons/gi";
import { WiStars } from "react-icons/wi";
import type { BookCard as BookCardType } from "@/features/books/types";

interface BookCarouselProps {
  title: string;
  books: BookCardType[];
}

export function BookCarousel({ title, books }: BookCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  const handleSetApi = useCallback((api: CarouselApi) => {
    setApi(api);
  }, []);

  const {
    addToCart,
    wishlists,
    selectedBook,
    setSelectedBook,
    authDialogOpen,
    setAuthDialogOpen,
    selectedBookStatus,
    isBusy,
    handleAddToWishlist,
    handleSelectWishlist,
  } = useBookCardActions();

  return (
    <>
      <div className="space-y-1">
        <h2 className="text-3xl font-bold text-foreground text-center flex items-center justify-center gap-4 sm:gap-6 lg:gap-12">
          <WiStars className="text-accent" size={58} />
          {title}
          <GiKnockedOutStars className="text-accent" size={58} />
        </h2>

        <div className="relative">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full group"
            setApi={handleSetApi}
          >
            <CarouselContent className="-ml-4">
              {books.map((book) => (
                <CarouselItem
                  key={book.id}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
                >
                  <div className="py-8 px-4 max-w-[280px] mx-auto lg:max-w-none">
                    <BookCard
                      book={book}
                      onAddToCart={() => addToCart.mutate({ book })}
                      onAddToWishlist={() => handleAddToWishlist(book)}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <button
            type="button"
            aria-label="Slide anterior"
            onClick={() => api?.scrollPrev()}
            className="absolute -left-3 lg:-left-8 top-1/2 -translate-y-1/2 z-20 text-foreground hover:text-accent transition-colors"
          >
            <HiArrowCircleLeft className="w-8 h-8 md:w-10 md:h-10" />
          </button>
          <button
            type="button"
            aria-label="Slide siguiente"
            onClick={() => api?.scrollNext()}
            className="absolute -right-3 lg:-right-8 top-1/2 -translate-y-1/2 z-20 text-foreground hover:text-accent transition-colors"
          >
            <HiArrowCircleRight className="w-8 h-8 md:w-10 md:h-10" />
          </button>
        </div>
      </div>

      <WishlistSelectDialog
        open={!!selectedBook}
        title="Agregar a una lista"
        description={
          <>
            Elige una lista para{" "}
            <span className="font-semibold text-foreground">
              &quot;{selectedBook?.title ?? ""}&quot;
            </span>
          </>
        }
        wishlists={wishlists ?? []}
        disabledIds={selectedBookStatus?.wishlists.map((wl) => wl.id) ?? []}
        isLoading={isBusy}
        onSelect={handleSelectWishlist}
        onCancel={() => setSelectedBook(null)}
      />

      <AuthRequiredDialog
        open={authDialogOpen}
        onCancel={() => setAuthDialogOpen(false)}
      />
    </>
  );
}