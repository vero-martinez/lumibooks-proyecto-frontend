/**
 * Hook compartido por BookCardGrid, BookCarousel y BookDetailOverview.
 * Encapsula la lógica de agregar al carrito y a wishlists,
 * incluyendo el manejo de diálogos de selección y autenticación.
 */
import { useState } from "react";
import { useAddToCart } from "@/features/cart/hooks";
import {
  useWishlists,
  useAddBookToWishlist,
  useBookWishlistStatus,
} from "@/features/wishlists/hooks";
import { useAuthStore } from "@/stores/auth.store";

/** Tipo mínimo que el hook necesita del libro. BookCard y BookDetail lo satisfacen. */
interface BookForAction {
  id: number;
  title: string;
}

export function useBookCardActions() {
  const addToCart = useAddToCart();
  const addBookToWishlist = useAddBookToWishlist();
  const isAuthenticated = useAuthStore((s) => !!s.token);
  const { data: wishlists } = useWishlists();

  // Guarda el libro que se está agregando para mostrarlo en el título del diálogo.
  const [selectedBook, setSelectedBook] = useState<BookForAction | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  // Solo consulta las listas que ya tienen el libro cuando se abre el diálogo.
  const { data: selectedBookStatus } = useBookWishlistStatus(
    selectedBook?.id ?? 0,
  );

  const isBusy = addBookToWishlist.isPending;

  // Si no está logueado, muestra el diálogo de login. Si sí, abre el selector de lista.
  const handleAddToWishlist = (book: BookForAction) => {
    if (!isAuthenticated) {
      setAuthDialogOpen(true);
      return;
    }
    setSelectedBook(book);
  };

  // Agrega el libro a la lista elegida y cierra el diálogo.
  const handleSelectWishlist = (wishlistId: number) => {
    if (!selectedBook) return;
    addBookToWishlist.mutate(
      { wishlistId, bookId: selectedBook.id },
      { onSuccess: () => setSelectedBook(null) },
    );
  };

  // setSelectedBook y setAuthDialogOpen se exponen para que los componentes
  // puedan cerrar los diálogos desde su propio JSX (onCancel handlers).
  return {
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
  };
}