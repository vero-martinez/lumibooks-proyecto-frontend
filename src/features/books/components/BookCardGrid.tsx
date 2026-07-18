"use client";

/**
 * Grid de cards de libros con lógica compartida de carrito y wishlists.
 * Orquesta las mutaciones y el diálogo de selección de lista.
 * BookCard es un componente presentacional que solo renderiza UI.
 */
import { useBookCardActions } from "@/features/books/hooks";
import { WishlistSelectDialog } from "@/features/wishlists/components/WishlistSelectDialog";
import { AuthRequiredDialog } from "@/components/shared/AuthRequiredDialog";
import { BookCard } from "./BookCard";
import type { BookCard as BookCardType } from "@/features/books/types";

interface BookCardGridProps {
  books: BookCardType[];
  priorityCount?: number;
}

export function BookCardGrid({ books, priorityCount = 0 }: BookCardGridProps) {
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
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {books.map((book, index) => (
          <BookCard
            key={book.id}
            book={book}
            priority={index < priorityCount}
            onAddToCart={() => addToCart.mutate({ book })}
            onAddToWishlist={() => handleAddToWishlist(book)}
          />
        ))}
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