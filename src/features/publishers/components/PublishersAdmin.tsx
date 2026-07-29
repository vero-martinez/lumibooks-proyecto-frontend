/**
 * Container de administración de editoriales.
 * Compone filtros, tabla, paginación y diálogos de detalle/confirmación/formulario.
 */
"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAdminPublishers } from "@/features/publishers/hooks";
import { PublisherFiltersBar } from "@/features/publishers/components/PublisherFiltersBar";
import { PublishersTableAdmin } from "@/features/publishers/components/PublishersTableAdmin";
import { PublisherDetailDialog } from "@/features/publishers/components/PublisherDetailDialog";
import { PublisherFormDialog } from "@/features/publishers/components/PublisherFormDialog";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { AppPagination } from "@/components/shared/AppPagination";
import { Button } from "@/components/ui/button";
import { DEFAULT_PAGE_SIZE } from "@/features/publishers/constants/admin.constants";
import type { PublisherSummary } from "@/features/publishers/types";

export function PublishersAdmin() {
    const {
        data,
        isLoading,
        filters,
        updateFilters,
        setPage,
        toggleStatus,
        resetFilters,
    } = useAdminPublishers();

    const [detailPublisherId, setDetailPublisherId] = useState<number | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);

    const [formOpen, setFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "edit">("create");
    const [formPublisher, setFormPublisher] = useState<PublisherSummary | undefined>(undefined);

    const [confirmPublisher, setConfirmPublisher] = useState<PublisherSummary | null>(null);

    const handleToggleActive = (publisher: PublisherSummary) => {
        setConfirmPublisher(publisher);
    };

    const handleConfirmToggle = () => {
        if (!confirmPublisher) return;
        toggleStatus.mutate(confirmPublisher.id, {
            onSettled: () => setConfirmPublisher(null),
        });
    };

    const handleViewDetail = (id: number) => {
        setDetailPublisherId(id);
        setDetailOpen(true);
    };

    const handleEdit = (publisher: PublisherSummary) => {
        setFormPublisher(publisher);
        setFormMode("edit");
        setFormOpen(true);
    };

    const handleCreate = () => {
        setFormPublisher(undefined);
        setFormMode("create");
        setFormOpen(true);
    };

    const pageSize = filters.size ?? DEFAULT_PAGE_SIZE;
    const totalPages = data?.totalPages ?? 0;
    const currentPage = data?.number ?? 0;

    const paginationInfo = data
        ? `Mostrando ${currentPage * pageSize + 1}–${Math.min((currentPage + 1) * pageSize, data.totalElements)} de ${data.totalElements} editoriales`
        : undefined;

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button className="p-4" onClick={handleCreate}>
                    <FaPlus size={14} aria-hidden="true" />
                    Crear Editorial
                </Button>
            </div>

            <PublisherFiltersBar
                filters={filters}
                updateFilters={updateFilters}
                onClear={resetFilters}
            />

            <PublishersTableAdmin
                publishers={data?.content ?? []}
                isLoading={isLoading}
                isToggling={toggleStatus.isPending}
                onViewDetail={handleViewDetail}
                onToggleActive={handleToggleActive}
                onEdit={(id) => {
                    const publisher = data?.content.find((p) => p.id === id);
                    if (publisher) handleEdit(publisher);
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

            <PublisherDetailDialog
                publisherId={detailPublisherId}
                open={detailOpen}
                onOpenChange={setDetailOpen}
            />

            <PublisherFormDialog
                mode={formMode}
                publisher={formPublisher}
                open={formOpen}
                onOpenChange={setFormOpen}
            />

            <ConfirmDialog
                open={confirmPublisher !== null}
                title={confirmPublisher?.isActive ? "Desactivar editorial" : "Activar editorial"}
                message={
                    confirmPublisher?.isActive
                        ? `¿Deseas desactivar "${confirmPublisher?.name}"? La editorial no será visible para los clientes.`
                        : `¿Deseas activar "${confirmPublisher?.name}"? La editorial será visible para los clientes.`
                }
                confirmLabel={confirmPublisher?.isActive ? "Desactivar" : "Activar"}
                confirmClassName={
                    confirmPublisher?.isActive
                        ? "bg-destructive text-white hover:bg-destructive/90"
                        : "bg-success text-white hover:bg-success/90"
                }
                onConfirm={handleConfirmToggle}
                onCancel={() => setConfirmPublisher(null)}
                isLoading={toggleStatus.isPending}
            />
        </div>
    );
}