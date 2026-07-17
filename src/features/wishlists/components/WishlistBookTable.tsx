"use client";

/**
 * Tabla de libros dentro de una wishlist.
 * Muestra portada, título, autores, precio y acciones (carrito, agregar a otra lista, eliminar).
 */
import Link from "next/link";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { BookWishlistResponse } from "@/features/books/types";
import { BookCover } from "@/components/shared/BookCover";
import { IconButton } from "@/components/shared/IconButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { buildBookDetailUrl } from "@/features/books/utils/buildBookDetailUrl";
import { formatPrice, cn } from "@/lib/utils";

const TH = "px-6 text-foreground font-semibold text-base text-center";
const TD = "py-6 px-6 align-middle text-center";

interface WishlistBookTableProps {
  books: BookWishlistResponse[];
  otherWishlistsCount: number;
  onRemove: (bookId: number) => void;
  onAdd?: (bookId: number, bookTitle: string) => void;
  onAddToCart: (book: BookWishlistResponse) => void;
  isRemoving?: boolean;
}

export function WishlistBookTable({
  books,
  otherWishlistsCount,
  onRemove,
  onAdd,
  onAddToCart,
  isRemoving = false,
}: WishlistBookTableProps) {
  return (
    <Table aria-label="Libros en la lista">
      <TableHeader className="bg-card">
        <TableRow>
          <TableHead className={cn(TH, "w-[120px]")}>Portada</TableHead>
          <TableHead className={TH}>Título</TableHead>
          <TableHead className={cn(TH, "hidden md:table-cell")}>Autor</TableHead>
          <TableHead className={TH}>Precio</TableHead>
          <TableHead className={TH}>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book, index) => (
          <TableRow
            key={book.id}
            className={cn("hover:bg-accent/20 transition-colors", index < books.length - 1 && "border-b border-border/10")}
          >
            <TableCell className={cn(TD, "text-center")}>
              <Link href={buildBookDetailUrl(book.id, book.title)}>
                <BookCover
                  src={book.coverImageUrl}
                  alt={book.title}
                  className="w-28 h-[200px] rounded-md shadow-md hover:shadow-lg transition-shadow"
                />
              </Link>
            </TableCell>
            <TableCell className={cn(TD, "text-center")}>
              <Link href={buildBookDetailUrl(book.id, book.title)} className="font-semibold text-base text-foreground hover:text-primary transition-colors line-clamp-2">
                {book.title}
              </Link>
            </TableCell>
            <TableCell className={cn(TD, "hidden md:table-cell text-muted-foreground text-base")}>
              {book.authors.join(", ")}
            </TableCell>
            <TableCell className={cn(TD, "font-bold text-foreground text-base")}>
              {formatPrice(book.price)}
            </TableCell>
            <TableCell className={cn(TD, "text-center")}>
              <div role="group" aria-label={`Acciones para ${book.title}`} className="flex items-center justify-center gap-2">
                <IconButton
                  icon={FaShoppingCart}
                  label="Agregar al carrito"
                  onClick={() => onAddToCart(book)}
                  size="sm"
                />
                {otherWishlistsCount > 0 && onAdd && (
                  <IconButton
                    icon={FaHeart}
                    label="Agregar a otra lista"
                    onClick={() => onAdd(book.id, book.title)}
                    size="sm"
                  />
                )}
                <IconButton
                  icon={FaTrash}
                  label="Eliminar de la lista"
                  onClick={() => onRemove(book.id)}
                  disabled={isRemoving}
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}