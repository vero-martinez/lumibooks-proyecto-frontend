/**
 * Container de administración de reseñas.
 * Compone filtros, tabla, paginación y el dialog de detalle.
 */
"use client";

import { useState } from "react";
import { useAdminReviews, useUpdateReviewStatus } from "@/features/reviews/hooks";
import { ReviewFiltersBar } from "./ReviewFiltersBar";
import { ReviewsTableAdmin } from "./ReviewsTableAdmin";
import { ReviewDetailDialog } from "./ReviewDetailDialog";
import { AppPagination } from "@/components/shared/AppPagination";
import { ErrorState } from "@/components/shared/ErrorState";
import { DEFAULT_PAGE_SIZE } from "@/features/reviews/constants/admin.constants";

export function ReviewsAdmin() {
    const {
        data,
        isLoading,
        isError,
        refetch,
        filters,
        updateFilters,
        setPage,
        resetFilters,
    } = useAdminReviews();

    const updateStatus = useUpdateReviewStatus();

    const [detailId, setDetailId] = useState<number | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);

    const handleViewDetail = (reviewId: number) => {
        setDetailId(reviewId);
        setDetailOpen(true);
    };

    const pageSize = filters.size ?? DEFAULT_PAGE_SIZE;
    const totalPages = data?.totalPages ?? 0;
    const currentPage = data?.number ?? 0;

    const paginationInfo = data
        ? `Mostrando ${currentPage * pageSize + 1}–${Math.min((currentPage + 1) * pageSize, data.totalElements)} de ${data.totalElements} reseñas`
        : undefined;

    if (isError) {
        return (
            <ErrorState
                message="Error al cargar las reseñas"
                description="No pudimos obtener las reseñas. Inténtalo de nuevo."
                onRetry={() => refetch()}
            />
        );
    }

    return (
        <div className="space-y-4">
            <ReviewFiltersBar
                filters={filters}
                updateFilters={updateFilters}
                onClear={resetFilters}
            />

            <ReviewsTableAdmin
                reviews={data?.content ?? []}
                isLoading={isLoading}
                isUpdatingStatus={updateStatus.isPending}
                onViewDetail={handleViewDetail}
                onChangeStatus={(reviewId, status) => updateStatus.mutate({ reviewId, status })}
            />

            <AppPagination
                currentPage={currentPage}
                totalPages={totalPages}
                isFirst={currentPage === 0}
                isLast={currentPage >= totalPages - 1}
                onPageChange={setPage}
                info={paginationInfo}
            />

            <ReviewDetailDialog
                reviewId={detailId}
                open={detailOpen}
                onOpenChange={setDetailOpen}
            />
        </div>
    );
}