/**
 * Container de administración de autores.
 * Compone filtros, tabla, paginación y diálogos de detalle/confirmación/formulario.
 */
"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAdminAuthors } from "@/features/authors/hooks";
import { AuthorFiltersBar } from "@/features/authors/components/AuthorFiltersBar";
import { AuthorsTableAdmin } from "@/features/authors/components/AuthorsTableAdmin";
import { AuthorDetailDialog } from "@/features/authors/components/AuthorDetailDialog";
import { AuthorFormDialog } from "@/features/authors/components/AuthorFormDialog";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { AppPagination } from "@/components/shared/AppPagination";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { DEFAULT_PAGE_SIZE } from "@/features/authors/constants/admin.constants";
import type { AuthorSummary } from "@/features/authors/types";

export function AuthorsAdmin() {
  const {
    data,
    isLoading,
    filters,
    updateFilters,
    setPage,
    toggleStatus,
    resetFilters,
  } = useAdminAuthors();

  const [detailAuthorId, setDetailAuthorId] = useState<number | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [formAuthorId, setFormAuthorId] = useState<number | undefined>(
    undefined,
  );

  const [confirmAuthor, setConfirmAuthor] = useState<AuthorSummary | null>(
    null,
  );

  const handleToggleActive = (author: AuthorSummary) => {
    setConfirmAuthor(author);
  };

  const handleConfirmToggle = () => {
    if (!confirmAuthor) return;
    toggleStatus.mutate(confirmAuthor.id, {
      onSettled: () => setConfirmAuthor(null),
    });
  };

  const handleViewDetail = (id: number) => {
    setDetailAuthorId(id);
    setDetailOpen(true);
  };

  const handleEdit = (id: number) => {
    setFormAuthorId(id);
    setFormMode("edit");
    setFormOpen(true);
  };

  const handleCreate = () => {
    setFormAuthorId(undefined);
    setFormMode("create");
    setFormOpen(true);
  };

  const pageSize = filters.size ?? DEFAULT_PAGE_SIZE;
  const totalPages = data?.totalPages ?? 0;
  const currentPage = data?.number ?? 0;

  const paginationInfo = data
    ? `Mostrando ${currentPage * pageSize + 1}–${Math.min((currentPage + 1) * pageSize, data.totalElements)} de ${data.totalElements} autores`
    : undefined;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button className="p-4" onClick={handleCreate}>
          <FaPlus size={14} aria-hidden="true" />
          Crear Autor
        </Button>
      </div>

      <AuthorFiltersBar
        filters={filters}
        updateFilters={updateFilters}
        onClear={resetFilters}
      />

      <AuthorsTableAdmin
        authors={data?.content ?? []}
        isLoading={isLoading}
        isToggling={toggleStatus.isPending}
        onViewDetail={handleViewDetail}
        onToggleActive={handleToggleActive}
        onEdit={handleEdit}
      />

      <AppPagination
        currentPage={currentPage}
        totalPages={totalPages}
        isFirst={currentPage === 0}
        isLast={currentPage >= totalPages - 1}
        onPageChange={setPage}
        info={paginationInfo}
      />

      <AuthorDetailDialog
        authorId={detailAuthorId}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      <AuthorFormDialog
        mode={formMode}
        authorId={formAuthorId}
        open={formOpen}
        onOpenChange={setFormOpen}
      />

      <ConfirmDialog
        open={confirmAuthor !== null}
        title={confirmAuthor?.isActive ? "Desactivar autor" : "Activar autor"}
        message={
          confirmAuthor?.isActive
            ? `¿Deseas desactivar a "${confirmAuthor?.firstName} ${confirmAuthor?.lastName}"? El autor no será visible para los clientes.`
            : `¿Deseas activar a "${confirmAuthor?.firstName} ${confirmAuthor?.lastName}"? El autor será visible para los clientes.`
        }
        confirmLabel={confirmAuthor?.isActive ? "Desactivar" : "Activar"}
        confirmClassName={
          confirmAuthor?.isActive
            ? "bg-destructive text-white hover:bg-destructive/90"
            : "bg-success text-white hover:bg-success/90"
        }
        onConfirm={handleConfirmToggle}
        onCancel={() => setConfirmAuthor(null)}
        isLoading={toggleStatus.isPending}
      />
    </div>
  );
}