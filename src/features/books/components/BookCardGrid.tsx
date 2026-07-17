"use client";

/**
 * Grid de cards de libros con lógica compartida de carrito y wishlists.
 * Orquesta las mutaciones y el diálogo de selección de lista.
 * BookCard es un componente presentacional que solo renderiza UI.
 */
import { useState } from "react";
import { useAddToCart } from "@/features/cart/hooks";
import { useWishlists, useAddBookToWishlist, useBookWishlistStatus } from "@/features/wishlists/hooks";
import { useAuthStore } from "@/stores/auth.store";
import { WishlistSelectDialog } from "@/features/wishlists/components/WishlistSelectDialog";
import { AuthRequiredDialog } from "@/components/shared/AuthRequiredDialog";
import { BookCard } from "./BookCard";
import type { BookCard as BookCardType } from "@/features/books/types";

interface BookCardGridProps {
  books: BookCardType[];
  priorityCount?: number;
}

export function BookCardGrid({ books, priorityCount = 0 }: BookCardGridProps) {
  const addToCart = useAddToCart();
  const isAuthenticated = useAuthStore((s) => !!s.token);
  const { data: wishlists } = useWishlists();
  const addBookToWishlist = useAddBookToWishlist();

  const [selectedBook, setSelectedBook] = useState<BookCardType | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { data: selectedBookStatus } = useBookWishlistStatus(selectedBook?.id ?? 0);

  const isBusy = addBookToWishlist.isPending;

  const handleAddToWishlist = (book: BookCardType) => {
    if (!isAuthenticated) {
      setAuthDialogOpen(true);
      return;
    }
    setSelectedBook(book);
  };

  const handleSelectWishlist = (wishlistId: number) => {
    if (!selectedBook) return;
    addBookToWishlist.mutate(
      { wishlistId, bookId: selectedBook.id },
      { onSuccess: () => setSelectedBook(null) },
    );
  };

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
            <span className="font-semibold text-foreground">"{selectedBook?.title ?? ""}"</span>
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