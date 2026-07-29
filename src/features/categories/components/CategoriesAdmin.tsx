/**
 * Container de administración de categorías.
 * Compone filtros, tabla, paginación y diálogos de detalle/confirmación/formulario.
 */
"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAdminCategories } from "@/features/categories/hooks";
import { CategoryFiltersBar } from "@/features/categories/components/CategoryFiltersBar";
import { CategoriesTableAdmin } from "@/features/categories/components/CategoriesTableAdmin";
import { CategoryDetailDialog } from "@/features/categories/components/CategoryDetailDialog";
import { CategoryFormDialog } from "@/features/categories/components/CategoryFormDialog";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { AppPagination } from "@/components/shared/AppPagination";
import { Button } from "@/components/ui/button";
import { DEFAULT_PAGE_SIZE } from "@/features/categories/constants/admin.constants";
import type { CategorySummary } from "@/features/categories/types";

export function CategoriesAdmin() {
  const {
    data,
    isLoading,
    filters,
    updateFilters,
    setPage,
    toggleStatus,
    resetFilters,
  } = useAdminCategories();

  const [detailCategoryId, setDetailCategoryId] = useState<number | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [formCategory, setFormCategory] = useState<CategorySummary | undefined>(undefined);

  const [confirmCategory, setConfirmCategory] = useState<CategorySummary | null>(null);

  const handleToggleActive = (category: CategorySummary) => {
    setConfirmCategory(category);
  };

  const handleConfirmToggle = () => {
    if (!confirmCategory) return;
    toggleStatus.mutate(confirmCategory.id, {
      onSettled: () => setConfirmCategory(null),
    });
  };

  const handleViewDetail = (id: number) => {
    setDetailCategoryId(id);
    setDetailOpen(true);
  };

  const handleEdit = (category: CategorySummary) => {
    setFormCategory(category);
    setFormMode("edit");
    setFormOpen(true);
  };

  const handleCreate = () => {
    setFormCategory(undefined);
    setFormMode("create");
    setFormOpen(true);
  };

  const pageSize = filters.size ?? DEFAULT_PAGE_SIZE;
  const totalPages = data?.totalPages ?? 0;
  const currentPage = data?.number ?? 0;

  const paginationInfo = data
    ? `Mostrando ${currentPage * pageSize + 1}–${Math.min((currentPage + 1) * pageSize, data.totalElements)} de ${data.totalElements} categorías`
    : undefined;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button className="p-4" onClick={handleCreate}>
          <FaPlus size={14} aria-hidden="true" />
          Crear Categoría
        </Button>
      </div>

      <CategoryFiltersBar
        filters={filters}
        updateFilters={updateFilters}
        onClear={resetFilters}
      />

      <CategoriesTableAdmin
        categories={data?.content ?? []}
        isLoading={isLoading}
        isToggling={toggleStatus.isPending}
        onViewDetail={handleViewDetail}
        onToggleActive={handleToggleActive}
        onEdit={(id) => {
          const category = data?.content.find((c) => c.id === id);
          if (category) handleEdit(category);
        }}
      />

      <AppPagination
        currentPage={currentPage}
        totalPages={totalPages}
        isFirst={currentPage === 0}
        isLast={currentPage >= totalPages - 1}
        onPageChange={setPage}
        info={paginationInfo}
      />

      <CategoryDetailDialog
        categoryId={detailCategoryId}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      <CategoryFormDialog
        mode={formMode}
        category={formCategory}
        open={formOpen}
        onOpenChange={setFormOpen}
      />

      <ConfirmDialog
        open={confirmCategory !== null}
        title={confirmCategory?.isActive ? "Desactivar categoría" : "Activar categoría"}
        message={
          confirmCategory?.isActive
            ? `¿Deseas desactivar "${confirmCategory?.name}"? La categoría no será visible para los clientes.`
            : `¿Deseas activar "${confirmCategory?.name}"? La categoría será visible para los clientes.`
        }
        confirmLabel={confirmCategory?.isActive ? "Desactivar" : "Activar"}
        confirmClassName={
          confirmCategory?.isActive
            ? "bg-destructive text-white hover:bg-destructive/90"
            : "bg-success text-white hover:bg-success/90"
        }
        onConfirm={handleConfirmToggle}
        onCancel={() => setConfirmCategory(null)}
        isLoading={toggleStatus.isPending}
      />
    </div>
  );
}