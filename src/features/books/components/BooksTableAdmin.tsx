/**
 * Tabla de libros para administración.
 * Solo renderiza filas — sin hooks, sin estado, sin diálogos.
 */
"use client";

import Link from "next/link";
import { FaEye, FaPencilAlt, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";
import { STOCK_THRESHOLD } from "@/features/books/constants/admin.constants";
import type { BookSummary } from "@/features/books/types";

const COL_COUNT = 8;

interface BooksTableAdminProps {
  books: BookSummary[];
  isLoading: boolean;
  isToggling: boolean;
  onViewDetail: (id: number) => void;
  onToggleActive: (book: BookSummary) => void;
}

export function BooksTableAdmin({
  books,
  isLoading,
  isToggling,
  onViewDetail,
  onToggleActive,
}: BooksTableAdminProps) {
  return (
    <div className="rounded-xl border border-border overflow-x-auto">
      <Table className="min-w-[700px] [&_td]:px-4 md:[&_td]:px-8 [&_th]:px-4 md:[&_th]:px-8 [&_td]:py-4 [&_th]:py-4 [&_td]:text-secondary-foreground">
        <TableHeader>
          <TableRow className="bg-foreground hover:bg-foreground">
            <TableHead className="text-white">ISBN</TableHead>
            <TableHead className="text-white">Título</TableHead>
            <TableHead className="text-white">Autores</TableHead>
            <TableHead className="text-white">Precio</TableHead>
            <TableHead className="text-white">Stock</TableHead>
            <TableHead className="text-white">Estado</TableHead>
            <TableHead className="text-white">Fecha</TableHead>
            <TableHead className="text-white">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
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
              <TableRow key={book.id} className={`hover:bg-accent ${i % 2 === 0 ? "bg-card" : "bg-transparent"}`}>
                <TableCell className="font-medium tracking-widest">{book.isbn}</TableCell>
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
                  <Badge
                    variant={book.stock <= STOCK_THRESHOLD ? "destructive" : "outline"}
                    className="text-sm font-medium"
                    aria-label={book.stock <= STOCK_THRESHOLD ? "Stock bajo" : "Stock disponible"}
                  >
                    {book.stock}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={book.isActive ? "secondary" : "destructive"} className={`text-sm font-medium ${book.isActive ? "bg-success-bg text-success" : ""}`}>
                    {book.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {formatDate(book.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => onViewDetail(book.id)}
                      aria-label={`Ver detalle de ${book.title}`}
                      className="text-foreground"
                    >
                      <FaEye aria-hidden="true" />
                    </Button>
                    <Link href={`/admin/books/edit/${book.id}`}>
                      <Button variant="ghost" size="icon-xs" aria-label={`Editar ${book.title}`} className="text-foreground">
                        <FaPencilAlt aria-hidden="true" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => onToggleActive(book)}
                      disabled={isToggling}
                      aria-label={book.isActive ? `Desactivar ${book.title}` : `Activar ${book.title}`}
                      className="text-foreground"
                    >
                      {book.isActive ? (
                        <FaToggleOn aria-hidden="true" />
                      ) : (
                        <FaToggleOff aria-hidden="true" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}