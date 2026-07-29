/**
 * Tabla de libros para administración.
 * Solo renderiza filas — sin hooks, sin estado, sin diálogos.
 */
"use client";

import { FaEye, FaPencilAlt, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { cn, formatPrice, formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";
import { STOCK_THRESHOLD } from "@/features/books/constants/admin.constants";
import type { BookSummary } from "@/features/books/types";
import { ActiveBadge } from "@/components/shared/ActiveBadge";
import { TableActions } from "@/components/shared/TableActions";

const COL_COUNT = 8;

interface BooksTableAdminProps {
  books: BookSummary[];
  isLoading: boolean;
  isToggling: boolean;
  onViewDetail: (id: number) => void;
  onToggleActive: (book: BookSummary) => void;
}

function StockBadge({ stock }: { stock: number }) {
  const isLow = stock <= STOCK_THRESHOLD;
  return (
    <Badge
      variant={isLow ? "destructive" : "outline"}
      className="text-sm font-medium"
      aria-label={isLow ? "Stock bajo" : "Stock disponible"}
    >
      {stock}
    </Badge>
  );
}

export function BooksTableAdmin({
  books,
  isLoading,
  isToggling,
  onViewDetail,
  onToggleActive,
}: BooksTableAdminProps) {
  return (
    <div className="rounded-xl border border-border overflow-x-auto w-full">
      <Table className="text-sm">
        <TableHeader className="[&_th]:px-6">
          <TableRow className="bg-foreground hover:bg-foreground [&_th]:text-white">
            <TableHead>ISBN</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Autores</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_td]:p-6">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={COL_COUNT} className="h-32">
                <LoadingState label="Cargando libros..." />
              </TableCell>
            </TableRow>
          ) : books.length === 0 ? (
            <TableRow>
              <TableCell colSpan={COL_COUNT} className="h-32">
                <EmptyState title="No se encontraron libros." />
              </TableCell>
            </TableRow>
          ) : (
            books.map((book, i) => (
              <TableRow
                key={book.id}
                className={cn("hover:bg-accent", i % 2 === 0 && "bg-card")}
              >
                <TableCell className="font-medium tracking-widest">
                  {book.isbn}
                </TableCell>
                <TableCell className="font-medium max-w-[200px] truncate">
                  {book.title}
                </TableCell>
                <TableCell className="font-medium max-w-[180px] truncate">
                  {book.authors.join(", ")}
                </TableCell>
                <TableCell className="font-medium">
                  {formatPrice(book.price)}
                </TableCell>
                <TableCell>
                  <StockBadge stock={book.stock} />
                </TableCell>
                <TableCell>
                  <ActiveBadge isActive={book.isActive} />
                </TableCell>
                <TableCell className="font-medium">
                  {formatDate(book.createdAt)}
                </TableCell>
                <TableCell>
                  <TableActions
                    actions={[
                      { label: `Ver detalle de ${book.title}`, icon: <FaEye aria-hidden="true" />, onClick: () => onViewDetail(book.id) },
                      { label: `Editar ${book.title}`, icon: <FaPencilAlt aria-hidden="true" />, href: `/admin/books/edit/${book.id}` },
                      { label: book.isActive ? `Desactivar ${book.title}` : `Activar ${book.title}`, icon: book.isActive ? <FaToggleOn aria-hidden="true" /> : <FaToggleOff aria-hidden="true" />, onClick: () => onToggleActive(book), disabled: isToggling },
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}