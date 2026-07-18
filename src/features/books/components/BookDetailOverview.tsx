"use client";

/**
 * Vista del libro con título, autores, rating, disponibilidad,
 * descripción, precio, selector de cantidad y botones de acción.
 * Usa useBookCardActions para lógica de carrito/wishlist/auth.
 */
import { useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "@/components/shared/StarRating";
import { QuantitySelector } from "@/components/shared/QuantitySelector";
import { formatPrice, formatAuthors, cn } from "@/lib/utils";
import type { BookDetail } from "@/features/books/types";
import { useBookCardActions } from "@/features/books/hooks";
import { WishlistSelectDialog } from "@/features/wishlists/components/WishlistSelectDialog";
import { AuthRequiredDialog } from "@/components/shared/AuthRequiredDialog";

interface BookDetailOverviewProps {
  book: BookDetail;
}

export function BookDetailOverview({ book }: BookDetailOverviewProps) {
  const [quantity, setQuantity] = useState(1);
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

  const BUTTON_BASE = "gap-2 h-10 md:h-11 rounded-lg transition-all text-sm md:text-base";
  const PRIMARY_BUTTON = "px-5 md:px-6 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30";
  const OUTLINE_BUTTON = "px-5 md:px-4 border-primary/30 text-foreground hover:bg-primary/5 hover:border-primary/60";

  return (
    <Card className="max-w-2xl bg-transparent">
      <CardContent className="p-5 md:p-8 space-y-5 md:space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
            {book.title}
          </h1>
          <p className="text-sm md:text-base text-secondary-foreground">
            {formatAuthors(book.authors)}
          </p>
        </div>

        <hr className="border-border/40" aria-hidden="true" />

        <div
          className="flex items-center gap-1.5"
          aria-label={`Calificación ${book.averageRating.toFixed(1)} de 5 estrellas, ${book.totalReviews} ${book.totalReviews === 1 ? "comentario" : "comentarios"}`}
        >
          <StarRating rating={book.averageRating} />
          <span
            aria-hidden="true"
            className="ml-2 px-2 py-0.5 rounded-md bg-star/20 text-secondary-foreground text-xs md:text-sm"
          >
            {book.averageRating.toFixed(1)}
          </span>
          <span
            aria-hidden="true"
            className="text-foreground text-xs md:text-sm ml-1"
          >
            ({book.totalReviews}{" "}
            {book.totalReviews === 1 ? "comentario" : "comentarios"})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div
            role="status"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
              book.available
                ? "bg-success-bg text-success"
                : "bg-red-100 text-red-700"
            }`}
          >
            {book.available ? (
              <>
                <FaCheckCircle size={12} aria-hidden="true" />
                <span>Disponible</span>
              </>
            ) : (
              <>
                <FaTimesCircle size={12} aria-hidden="true" />
                <span>No disponible</span>
              </>
            )}
          </div>
        </div>

        <p className="text-sm md:text-base text-secondary-foreground leading-relaxed">
          {book.description}
        </p>

        <hr className="border-border/40" aria-hidden="true" />

        <div>
          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-3">
            Precio
          </p>
          <div className="flex items-end justify-between">
            <span className="text-xl md:text-2xl font-bold text-foreground">
              {formatPrice(book.price)}
            </span>
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              max={5}
              disabled={!book.available}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 pt-2">
          <Button
            onClick={() => addToCart.mutate({ book, quantity })}
            disabled={addToCart.isPending || !book.available}
            className={cn(BUTTON_BASE, PRIMARY_BUTTON)}
          >
            <FaShoppingCart size={16} aria-hidden="true" />
            {addToCart.isPending ? "Agregando..." : "Añadir al carrito"}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleAddToWishlist(book)}
            disabled={isBusy}
            className={cn(BUTTON_BASE, OUTLINE_BUTTON)}
          >
            <FaHeart size={16} aria-hidden="true" />
            Añadir a la lista de deseos
          </Button>
        </div>
      </CardContent>

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
    </Card>
  );
}