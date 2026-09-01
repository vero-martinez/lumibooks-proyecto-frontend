/**
 * Badge de estado de reseña para el panel de administración.
 */
import { StatusBadge } from "@/components/shared/StatusBadge";
import { REVIEW_STATUS_LABELS } from "@/features/reviews/constants/admin.constants";
import type { ReviewStatus } from "@/features/reviews/types";

const STATUS_STYLES: Record<ReviewStatus, string> = {
    PENDIENTE: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    MODERADA: "bg-success-bg text-success border-success/20",
    OCULTA: "bg-destructive/10 text-destructive border-destructive/20",
};

const STATUS_DOT: Record<ReviewStatus, string> = {
    PENDIENTE: "bg-amber-500",
    MODERADA: "bg-success",
    OCULTA: "bg-destructive",
};

interface ReviewStatusBadgeProps {
    status: ReviewStatus;
    className?: string;
}

export function ReviewStatusBadge({ status, className }: ReviewStatusBadgeProps) {
    return (
        <StatusBadge
            label={REVIEW_STATUS_LABELS[status]}
            colorClass={STATUS_STYLES[status]}
            dotClass={STATUS_DOT[status]}
            className={className}
        />
    );
}