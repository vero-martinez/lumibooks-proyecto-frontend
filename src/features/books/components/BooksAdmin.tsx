/**
 * Container de administración de libros.
 * Compone filtros, tabla, paginación y diálogos de detalle/confirmación.
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useAdminBooks } from "@/features/books/hooks";
import { BookFiltersBar } from "@/features/books/components/BookFiltersBar";
import { BooksTableAdmin } from "@/features/books/components/BooksTableAdmin";
import { BookDetailDialog } from "@/features/books/components/BookDetailDialog";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { AppPagination } from "@/components/shared/AppPagination";
import { Button } from "@/components/ui/button";
import { DEFAULT_PAGE_SIZE } from "@/features/books/constants/admin.constants";
import type { BookSummary } from "@/features/books/types";

export function BooksAdmin() {
  const {
    data,
    isLoading,
    filters,
    updateFilters,
    setPage,
    toggleStatus,
    resetFilters,
  } = useAdminBooks();

  const [detailBookId, setDetailBookId] = useState<number | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [confirmBook, setConfirmBook] = useState<BookSummary | null>(null);

  const handleToggleActive = (book: BookSummary) => {
    setConfirmBook(book);
  };

  const handleConfirmToggle = () => {
    if (!confirmBook) return;
    toggleStatus.mutate(confirmBook.id, {
      onSettled: () => setConfirmBook(null),
    });
  };

  const handleViewDetail = (id: number) => {
    setDetailBookId(id);
    setDetailOpen(true);
  };

  const pageSize = filters.size ?? DEFAULT_PAGE_SIZE;
  const totalPages = data?.totalPages ?? 0;
  const currentPage = data?.number ?? 0;

  const paginationInfo = data
    ? `Mostrando ${currentPage * pageSize + 1}–${Math.min((currentPage + 1) * pageSize, data.totalElements)} de ${data.totalElements} libros`
    : undefined;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button asChild className="p-4">
          <Link href="/admin/books/create">
            <FaPlus size={14} aria-hidden="true" />
            Crear Libro
          </Link>
        </Button>
      </div>

      <BookFiltersBar
        filters={filters}
        updateFilters={updateFilters}
        onClear={resetFilters}
      />

      <BooksTableAdmin
        books={data?.content ?? []}
        isLoading={isLoading}
        isToggling={toggleStatus.isPending}
        onViewDetail={handleViewDetail}
        onToggleActive={handleToggleActive}
      />

      <AppPagination
        currentPage={currentPage}
        totalPages={totalPages}
        isFirst={currentPage === 0}
        isLast={currentPage >= totalPages - 1}
        onPageChange={setPage}
        info={paginationInfo}
      />

      <BookDetailDialog
        bookId={detailBookId}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      <ConfirmDialog
        open={confirmBook !== null}
        title={confirmBook?.isActive ? "Desactivar libro" : "Activar libro"}
        message={
          confirmBook?.isActive
            ? `¿Deseas desactivar "${confirmBook?.title}"? El libro no será visible para los clientes.`
            : `¿Deseas activar "${confirmBook?.title}"? El libro será visible para los clientes.`
        }
        confirmLabel={confirmBook?.isActive ? "Desactivar" : "Activar"}
        confirmClassName={
          confirmBook?.isActive
            ? "bg-destructive text-white hover:bg-destructive/90"
            : "bg-success text-white hover:bg-success/90"
        }
        onConfirm={handleConfirmToggle}
        onCancel={() => setConfirmBook(null)}
        isLoading={toggleStatus.isPending}
      />
    </div>
  );
}