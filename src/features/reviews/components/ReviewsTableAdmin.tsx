/**
 * Tabla de reseñas para administración.
 * Solo renderiza filas — sin hooks, sin estado global, sin diálogos.
 * El estado de cada reseña se cambia desde un dropdown sobre el badge.
 */
"use client";

import { FaChevronDown, FaEye } from "react-icons/fa";
import { cn, formatDateTime } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";
import { StarRating } from "@/components/shared/StarRating";
import { TableActions } from "@/components/shared/TableActions";
import { ReviewStatusBadge } from "./ReviewStatusBadge";
import { REVIEW_STATUS_OPTIONS } from "@/features/reviews/constants/admin.constants";
import type { ReviewStatus, ReviewSummary } from "@/features/reviews/types";

const COL_COUNT = 6;

interface ReviewsTableAdminProps {
    reviews: ReviewSummary[];
    isLoading: boolean;
    isUpdatingStatus: boolean;
    onViewDetail: (reviewId: number) => void;
    onChangeStatus: (reviewId: number, status: ReviewStatus) => void;
}

export function ReviewsTableAdmin({
    reviews,
    isLoading,
    isUpdatingStatus,
    onViewDetail,
    onChangeStatus,
}: ReviewsTableAdminProps) {
    return (
        <div className="rounded-xl border border-border overflow-x-auto w-full">
            <Table className="text-sm">
                <TableHeader className="[&_th]:px-18">
                    <TableRow className="bg-foreground hover:bg-foreground [&_th]:text-white">
                        <TableHead>Usuario</TableHead>
                        <TableHead>Libro</TableHead>
                        <TableHead>Calificación</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="[&_td]:px-18 [&_td]:py-4">
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={COL_COUNT} className="h-32">
                                <LoadingState label="Cargando reseñas..." />
                            </TableCell>
                        </TableRow>
                    ) : reviews.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={COL_COUNT} className="h-32">
                                <EmptyState title="No se encontraron reseñas." />
                            </TableCell>
                        </TableRow>
                    ) : (
                        reviews.map((review, i) => (
                            <TableRow
                                key={review.id}
                                className={cn("hover:bg-accent", i % 2 === 0 && "bg-card")}
                            >
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{review.userName}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {review.userDni}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{review.bookTitle}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5">
                                        <StarRating rating={review.rating} size={14} />
                                        <span className="text-xs text-muted-foreground">
                                            {review.rating}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button
                                                type="button"
                                                disabled={isUpdatingStatus}
                                                className="inline-flex items-center gap-1.5 rounded-full transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60"
                                                aria-label={`Cambiar estado de la reseña de ${review.bookTitle}`}
                                            >
                                                <ReviewStatusBadge status={review.status} />
                                                <FaChevronDown
                                                    size={10}
                                                    className="text-muted-foreground"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {REVIEW_STATUS_OPTIONS.map((opt) => (
                                                <DropdownMenuCheckboxItem
                                                    key={opt.value}
                                                    checked={review.status === opt.value}
                                                    disabled={
                                                        opt.value === review.status ||
                                                        isUpdatingStatus
                                                    }
                                                    onSelect={() =>
                                                        onChangeStatus(review.id, opt.value)
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    {opt.label}
                                                </DropdownMenuCheckboxItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                                <TableCell>{formatDateTime(review.createdAt)}</TableCell>
                                <TableCell>
                                    <TableActions
                                        actions={[
                                            {
                                                label: `Ver detalle de la reseña de ${review.bookTitle}`,
                                                icon: <FaEye aria-hidden="true" />,
                                                onClick: () => onViewDetail(review.id),
                                            },
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