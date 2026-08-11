"use client";

import { useParams, useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { useWishlistDetail, useWishlists, useRemoveBookFromWishlist, useAddBookToWishlist, useBookWishlistStatus } from "@/features/wishlists/hooks";
import { WishlistBookTable, WishlistSelectDialog, WishlistDetailHeader } from "@/features/wishlists/components";
import { useAddToCart } from "@/features/cart/hooks";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { useState, useMemo } from "react";

export default function WishlistDetailPage() {
  const params = useParams();
  const router = useRouter();
  const wishlistId = Number(params.id) || 0;

  const { data: wishlist, isLoading, isError, refetch } = useWishlistDetail(wishlistId);
  const { data: allWishlists } = useWishlists();
  const removeBook = useRemoveBookFromWishlist();
  const addBookToWishlist = useAddBookToWishlist();
  const addToCart = useAddToCart();

  const [removeTarget, setRemoveTarget] = useState<number | null>(null);
  const [addTarget, setAddTarget] = useState<{ bookId: number; bookTitle: string } | null>(null);

  const { data: addBookStatus } = useBookWishlistStatus(addTarget?.bookId ?? 0);

  const otherWishlists = useMemo(() => {
    if (!allWishlists) return [];
    return allWishlists.filter((wl) => wl.id !== wishlistId);
  }, [allWishlists, wishlistId]);

  const handleRemove = () => {
    if (removeTarget === null) return;
    removeBook.mutate(
      { wishlistId, bookId: removeTarget },
      { onSuccess: () => setRemoveTarget(null) },
    );
  };

  const handleAdd = (targetWishlistId: number) => {
    if (addTarget === null) return;
    addBookToWishlist.mutate(
      { wishlistId: targetWishlistId, bookId: addTarget.bookId },
      { onSuccess: () => setAddTarget(null) },
    );
  };

  if (isLoading) return <LoadingState label="Cargando lista..." />;
  if (isError) return <ErrorState message="Error al cargar la lista" onRetry={() => refetch()} />;

  return (
    <div className="mx-auto max-w-3xl pb-10 space-y-6">
      <WishlistDetailHeader wishlist={wishlist} />

      {!wishlist || wishlist.books.length === 0 ? (
        <EmptyState
          as="h2"
          title="Esta lista está vacía"
          description="Agrega libros desde el catálogo para guardarlos aquí."
          icon={<FaHeart size={24} className="text-muted-foreground" />}
          action={{ label: "Ver catálogo", onClick: () => router.push("/books") }}
        />
      ) : (
        <WishlistBookTable
          books={wishlist.books}
          otherWishlistsCount={otherWishlists.length}
          onRemove={(bookId) => setRemoveTarget(bookId)}
          onAdd={otherWishlists.length > 0 ? (bookId, bookTitle) => setAddTarget({ bookId, bookTitle }) : undefined}
          onAddToCart={(book) => addToCart.mutate({ book })}
          isRemoving={removeBook.isPending}
        />
      )}

      <ConfirmDialog
        open={!!removeTarget}
        title="Eliminar libro"
        message="¿Estás seguro de eliminar este libro de la lista?"
        confirmLabel="Eliminar"
        isLoading={removeBook.isPending}
        onConfirm={handleRemove}
        onCancel={() => setRemoveTarget(null)}
      />

      <WishlistSelectDialog
        open={!!addTarget}
        title="Agregar a otra lista"
        description={
          <>
            Elige una lista para{" "}
            <span className="font-semibold text-foreground">"{addTarget?.bookTitle ?? ""}"</span>
          </>
        }
        wishlists={otherWishlists}
        disabledIds={addBookStatus?.wishlists.map((wl) => wl.id) ?? []}
        isLoading={addBookToWishlist.isPending}
        onSelect={handleAdd}
        onCancel={() => setAddTarget(null)}
      />
    </div>
  );
}
