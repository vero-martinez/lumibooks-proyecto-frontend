"use client";

/**
 * Container principal de la página "Mis Reviews".
 * Tabs para alternar entre reseñas propias y libros pendientes de reseñar,
 * más los diálogos de crear, editar y eliminar reseña.
 */
import { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { cn } from "@/lib/utils";
import { MyReviewsList, type ReviewTab } from "./MyReviewsList";
import { ReviewFormDialog } from "./ReviewFormDialog";
import { useDeleteReview } from "@/features/reviews/hooks";
import type {
    ReviewClientResponse,
    ReviewPendingResponse,
} from "@/features/reviews/types";

const REVIEW_TABS: ReadonlyArray<{ value: ReviewTab; label: string }> = [
    { value: "mine", label: "Mis reseñas" },
    { value: "pending", label: "Pendientes" },
];

export function ClientReviewsContainer() {
    // -------------------------------------------------------------------
    // Estado
    // -------------------------------------------------------------------
    const [tab, setTab] = useState<ReviewTab>("mine");

    // Targets que controlan la apertura de cada diálogo (null = cerrado)
    const [createTarget, setCreateTarget] = useState<ReviewPendingResponse | null>(null);
    const [editTarget, setEditTarget] = useState<ReviewClientResponse | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<ReviewClientResponse | null>(null);

    const deleteReview = useDeleteReview();

    // -------------------------------------------------------------------
    // Handlers
    // -------------------------------------------------------------------
    const closeFormDialog = () => {
        setCreateTarget(null);
        setEditTarget(null);
    };

    const handleConfirmDelete = () => {
        if (!deleteTarget) return;
        deleteReview.mutate(deleteTarget.id, {
            onSuccess: () => setDeleteTarget(null),
        });
    };

    // -------------------------------------------------------------------
    // Render
    // -------------------------------------------------------------------
    return (
        <div className="space-y-6">
            {/* Tabs: reseñas propias / pendientes */}
            <div
                className="flex gap-2 overflow-x-auto -mx-1 px-1 pb-1"
                role="tablist"
                aria-label="Secciones de reseñas"
            >
                {REVIEW_TABS.map((opt) => (
                    <Button
                        key={opt.value}
                        id={`reviews-tab-${opt.value}`}
                        variant={tab === opt.value ? "default" : "outline"}
                        size="sm"
                        role="tab"
                        aria-selected={tab === opt.value}
                        aria-controls="reviews-panel"
                        onClick={() => setTab(opt.value)}
                        className={cn(
                            "shrink-0 rounded-full text-xs h-9 px-4 transition-all",
                            tab === opt.value
                                ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/30 hover:bg-primary/90"
                                : "text-muted-foreground hover:text-foreground",
                        )}
                    >
                        {opt.label}
                    </Button>
                ))}
            </div>

            {/* Contenido de la pestaña activa */}
            <div
                role="tabpanel"
                id="reviews-panel"
                aria-labelledby={`reviews-tab-${tab}`}
            >
                <MyReviewsList
                    tab={tab}
                    onEdit={setEditTarget}
                    onDelete={setDeleteTarget}
                    onWrite={setCreateTarget}
                />
            </div>

            {/* Diálogo crear / editar */}
            <ReviewFormDialog
                open={!!createTarget || !!editTarget}
                book={createTarget}
                review={editTarget}
                onClose={closeFormDialog}
            />

            {/* Confirmación de eliminación */}
            <ConfirmDialog
                open={!!deleteTarget}
                title="Eliminar reseña"
                message={
                    <>
                        ¿Seguro que quieres eliminar tu reseña del libro{" "}
                        <strong>{deleteTarget?.bookTitle}</strong>? Esta acción no se
                        puede deshacer.
                    </>
                }
                isLoading={deleteReview.isPending}
                icon={
                    <span className="flex items-center justify-center size-16 rounded-full bg-destructive/10">
                        <FaRegCommentDots size={24} className="text-destructive" aria-hidden="true" />
                    </span>
                }
                confirmClassName="bg-destructive text-white hover:bg-destructive/90"
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteTarget(null)}
            />
        </div>
    );
}