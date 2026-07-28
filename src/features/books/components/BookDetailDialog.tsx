/**
 * Dialogo modal que muestra el detalle completo de un libro
 * en el panel de administración.
 *
 * Obtiene los datos del libro via TanStack Query y muestra
 * portada, información general, categorías y metadatos.
 */
"use client";

import { FaStar } from "react-icons/fa";

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "lucide-react";
import { BookCover } from "@/components/shared/BookCover";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { useAdminBookDetail } from "@/features/books/hooks";
import { BOOK_FORMATS, BOOK_LANGUAGES } from "@/features/books/constants/catalog.constants";
import { STOCK_THRESHOLD } from "@/features/books/constants/admin.constants";
import { formatPrice, formatDateTime } from "@/lib/utils";
import type { BookAdminDetail } from "@/features/books/types";
import { ActiveBadge } from "@/components/shared/ActiveBadge";

interface BookDetailDialogProps {
  bookId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getLanguageLabel(value: string): string {
  return BOOK_LANGUAGES.find((l) => l.value === value)?.label ?? value;
}

function getFormatLabel(value: string): string {
  return BOOK_FORMATS.find((f) => f.value === value)?.label ?? value;
}

function buildDetailRows(book: BookAdminDetail) {
  return [
    {
      label: "Rating",
      value: (
        <span className="inline-flex items-center gap-1">
          <FaStar className="text-star" size={12} aria-hidden="true" />
          {book.averageRating?.toFixed(1) ?? "—"}
        </span>
      ),
    },
    { label: "Comentarios", value: book.totalReviews },
    {
      label: "ISBN",
      value: <span className="tracking-widest">{book.isbn}</span>,
    },
    {
      label: "Precio",
      value: <span className="tracking-widest">{formatPrice(book.price)}</span>,
    },
    {
      label: "Stock",
      value: (
        <Badge
          variant={book.stock <= STOCK_THRESHOLD ? "destructive" : "outline"}
          aria-label={book.stock <= STOCK_THRESHOLD ? "Stock bajo" : "Stock disponible"}
        >
          {book.stock}
        </Badge>
      ),
    },
    { label: "Páginas", value: book.pageCount },
    { label: "Idioma", value: getLanguageLabel(book.language) },
    { label: "Formato", value: getFormatLabel(book.format) },
    { label: "Editorial", value: book.publisherName },
    ...(book.editionYear
      ? [{ label: "Año edición", value: book.editionYear }]
      : []),
    ...(book.categories.length > 0
      ? [
          {
            label: "Categorías",
            value: (
              <div className="flex flex-wrap gap-1.5">
                {book.categories.map((cat) => (
                  <Badge key={cat} variant="outline" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>
            ),
          },
        ]
      : []),
    { label: "Creado", value: formatDateTime(book.createdAt) },
    { label: "Actualizado", value: formatDateTime(book.updatedAt) },
  ];
}

export function BookDetailDialog({
  bookId,
  open,
  onOpenChange,
}: BookDetailDialogProps) {
  const { data: book, isLoading, isError } = useAdminBookDetail(bookId, open);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-3xl max-h-[85vh] overflow-y-auto p-0"
        showCloseButton={false}
      >
        <div className="bg-primary text-primary-foreground px-4 sm:px-10 py-4 rounded-t-lg flex items-center justify-between">
          <DialogTitle className="text-lg">Detalle del Libro</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon-sm" className="text-primary-foreground hover:bg-primary-foreground/20">
              <XIcon className="size-4" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </DialogClose>
        </div>
        <div className="px-4 sm:px-10 py-6">
          {isLoading ? (
            <LoadingState label="Cargando detalle..." />
          ) : isError ? (
            <ErrorState message="No se pudo cargar el detalle" />
          ) : book ? (
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="shrink-0 flex flex-col items-center gap-3 w-full lg:w-1/2">
                <DialogHeader className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-base font-semibold leading-snug">
                      {book.title}
                    </span>
                    <ActiveBadge isActive={book.isActive} />
                  </div>
                </DialogHeader>
                <p className="text-sm text-muted-foreground text-center">
                  Autor(es): {book.authors.join(", ")}
                </p>
                {book.coverImageUrl && (
                  <BookCover
                    src={book.coverImageUrl}
                    alt={book.title}
                    className="w-48 h-72 rounded-lg bg-muted"
                  />
                )}
                {book.description && (
                  <div className="space-y-1 text-left">
                    <p className="text-xs font-medium text-muted-foreground">
                      Descripción
                    </p>
                    <p className="text-sm leading-relaxed text-secondary-foreground">
                      {book.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="w-full lg:w-1/2 space-y-4">
                <table className="w-full border-collapse text-sm" aria-label="Datos del libro">
                  <tbody>
                    {buildDetailRows(book).map((row, i) => (
                      <tr
                        key={row.label}
                        className={`border-b border-border/20 last:border-0 ${
                          i % 2 === 0 ? "bg-card" : "bg-transparent"
                        }`}
                      >
                        <th
                          scope="row"
                          className="py-3 pl-4 pr-3 text-muted-foreground font-semibold whitespace-nowrap text-left align-top"
                        >
                          {row.label}
                        </th>
                        <td className="py-3 pr-4 text-secondary-foreground">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}