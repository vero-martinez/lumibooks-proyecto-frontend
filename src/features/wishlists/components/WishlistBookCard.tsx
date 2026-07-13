"use client";

/**
 * Tarjeta de libro dentro de una wishlist.
 * Muestra portada, título, autores, precio y acciones (carrito, eliminar, mover).
 * Optimizada con memo para evitar re-renders innecesarios.
 */
import Link from "next/link";
import { memo } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookWishlistResponse } from "@/features/books/types";
import { BookCover } from "@/components/shared/BookCover";
import { IconButton, QUICK_ACTION_HOVER } from "@/components/shared/IconButton";
import { buildBookDetailUrl } from "@/features/books/utils/buildBookDetailUrl";
import { formatPrice } from "@/lib/utils";
import { useAddToCart } from "@/features/cart/hooks";
import { buildAddToCartPayload } from "@/features/cart/services/index";
import { BOOK_COVER_SIZES } from "@/features/books/constants/catalog.constants";

interface WishlistBookCardProps {
  book: BookWishlistResponse;
  priority?: boolean;
  onRemove: (bookId: number) => void;
  onMove?: (bookId: number) => void;
  isRemoving?: boolean;
}

export const WishlistBookCard = memo(function WishlistBookCard({
  book,
  onRemove,
  onMove,
  isRemoving = false,
  priority = false,
}: WishlistBookCardProps) {
  const detailUrl = buildBookDetailUrl(book.id, book.title);
  const addToCart = useAddToCart();

  return (
    <Card className="shadow-lg shadow-foreground/30 bg-card w-full min-h-[300px] sm:min-h-[330px] md:min-h-[360px] lg:min-h-[390px] transition-shadow hover:shadow-xl duration-200">
      <CardContent className="flex flex-col items-center p-3 md:p-6">
        <Link href={detailUrl} className="flex flex-col items-center">
          <BookCover
            src={book.coverImageUrl}
            alt={book.title}
            sizes={BOOK_COVER_SIZES}
            priority={priority}
            className="w-[90px] h-[145px] sm:w-[105px] sm:h-[168px] md:w-[115px] md:h-[185px] lg:w-[125px] lg:h-[200px] shadow-sm rounded-lg"
          />

          <div className="flex flex-col items-center gap-2 md:gap-3 text-card-foreground mt-2">
            <h3 className="text-xs md:text-sm h-9 md:h-12 font-semibold line-clamp-2 text-center">
              {book.title}
            </h3>

            <p className="text-xs md:text-sm line-clamp-1 text-center">
              {book.authors.join(", ")}
            </p>

            <p className="text-xs md:text-sm font-bold text-foreground">
              {formatPrice(book.price)}
            </p>
          </div>
        </Link>

        <div className="flex flex-col items-center gap-2 mt-3 md:mt-4 w-full">
          <div className="flex items-center gap-2 md:gap-4">
            <IconButton
              icon={FaShoppingCart}
              label="Agregar al carrito"
              onClick={() => addToCart.mutate(buildAddToCartPayload(book))}
              className={QUICK_ACTION_HOVER}
            />

            <IconButton
              icon={FaTrash}
              label="Eliminar de la lista"
              onClick={() => onRemove(book.id)}
              disabled={isRemoving}
              className={QUICK_ACTION_HOVER}
            />
          </div>

          {onMove && (
            <Button
              variant="secondary"
              size="xs"
              onClick={() => onMove(book.id)}
            >
              Mover a otra lista
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
});