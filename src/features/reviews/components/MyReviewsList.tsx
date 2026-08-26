"use client";

/**
 * Lista de la pestaña activa en "Mis Reviews".
 * Componente que muestra las reseñas propias o los libros
 * pendientes de reseñar según el tab recibido.
 */
import type { ReactNode } from "react";
import { FaBookOpen, FaRegCommentDots } from "react-icons/fa";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";
import { AppPagination } from "@/components/shared/AppPagination";
import { Separator } from "@/components/ui/separator";
import { MyReviewCard } from "./MyReviewCard";
import { PendingReviewCard } from "./PendingReviewCard";
import { useMyReviews, usePendingReviews } from "@/features/reviews/hooks";
import type { PageResponse } from "@/types/api.types";
import type {
    ReviewClientResponse,
    ReviewPendingResponse,
} from "@/features/reviews/types";

/** Pestañas que puede mostrar la lista */
export type ReviewTab = "mine" | "pending";

interface MyReviewsListProps {
    /** Pestaña activa: reseñas propias o libros pendientes */
    tab: ReviewTab;
    onEdit: (review: ReviewClientResponse) => void;
    onDelete: (review: ReviewClientResponse) => void;
    onWrite: (book: ReviewPendingResponse) => void;
}

// ---------------------------------------------------------------------------
// ListView: estados UI compartidos (loading/error/empty) + listado + paginación
// ---------------------------------------------------------------------------

/** Estado que ListView necesita del hook activo (useMyReviews / usePendingReviews) */
interface ListViewState<T> {
    data?: PageResponse<T>;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void;
    setPage: (page: number) => void;
}

/** Textos e ítems propios de cada tab */
interface ListViewContent<T> {
    loadingLabel: string;
    errorTitle: string;
    errorDescription: string;
    emptyTitle: string;
    emptyDescription: string;
    emptyIcon: ReactNode;
    countLabel: (count: number) => string;
    getItemKey: (item: T) => number;
    renderItem: (item: T) => ReactNode;
}

type ListViewProps<T> = ListViewState<T> & ListViewContent<T>;

function ListView<T>({
    data,
    isLoading,
    isError,
    refetch,
    setPage,
    loadingLabel,
    errorTitle,
    errorDescription,
    emptyTitle,
    emptyDescription,
    emptyIcon,
    countLabel,
    getItemKey,
    renderItem,
}: ListViewProps<T>) {
    if (isLoading) {
        return <LoadingState label={loadingLabel} />;
    }

    if (isError) {
        return (
            <ErrorState
                message={errorTitle}
                description={errorDescription}
                onRetry={() => refetch()}
            />
        );
    }

    if (!data || data.content.length === 0) {
        return (
            <EmptyState title={emptyTitle} description={emptyDescription} icon={emptyIcon} />
        );
    }

    return (
        <div className="flex flex-col">
            {/* Encabezado con contador */}
            <div className="flex items-center justify-between pb-4">
                <p className="text-sm text-muted-foreground">
                    {data.totalElements} {countLabel(data.totalElements)}
                </p>
            </div>

            {/* Listado */}
            <div className="flex flex-col gap-8">
                {data.content.map((item) => (
                    <div key={getItemKey(item)}>{renderItem(item)}</div>
                ))}
            </div>

            {/* Paginación */}
            {data.totalPages > 1 && (
                <>
                    <Separator className="mt-6" />
                    <div className="flex justify-center pt-4">
                        <AppPagination
                            currentPage={data.number}
                            totalPages={data.totalPages}
                            isFirst={data.first}
                            isLast={data.last}
                            onPageChange={setPage}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Contenido por tab (textos, ícono, cómo renderizar cada ítem)
// ---------------------------------------------------------------------------

function getPendingContent(
    onWrite: (book: ReviewPendingResponse) => void,
): ListViewContent<ReviewPendingResponse> {
    return {
        loadingLabel: "Buscando libros pendientes...",
        errorTitle: "Error al cargar los libros pendientes",
        errorDescription:
            "No pudimos obtener tus libros pendientes de reseñar. Inténtalo de nuevo.",
        emptyTitle: "No tienes libros pendientes de reseñar",
        emptyDescription:
            "Cuando recibas un pedido, tus libros aparecerán aquí para que puedas opinar sobre ellos.",
        emptyIcon: (
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <FaBookOpen size={20} className="text-muted-foreground" aria-hidden="true" />
            </div>
        ),
        countLabel: (count) => (count === 1 ? "libro pendiente" : "libros pendientes"),
        getItemKey: (book) => book.bookId,
        renderItem: (book) => <PendingReviewCard book={book} onWrite={onWrite} />,
    };
}

function getMineContent(
    onEdit: (review: ReviewClientResponse) => void,
    onDelete: (review: ReviewClientResponse) => void,
): ListViewContent<ReviewClientResponse> {
    return {
        loadingLabel: "Cargando tus reseñas...",
        errorTitle: "Error al cargar tus reseñas",
        errorDescription: "No pudimos obtener tus reseñas. Inténtalo de nuevo.",
        emptyTitle: "Todavía no escribiste ninguna reseña",
        emptyDescription:
            "Cuando recibas un pedido, podrás opinar sobre los libros que compraste desde la pestaña Pendientes.",
        emptyIcon: (
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <FaRegCommentDots
                    size={20}
                    className="text-muted-foreground"
                    aria-hidden="true"
                />
            </div>
        ),
        countLabel: (count) => (count === 1 ? "reseña" : "reseñas"),
        getItemKey: (review) => review.id,
        renderItem: (review) => (
            <MyReviewCard review={review} onEdit={onEdit} onDelete={onDelete} />
        ),
    };
}

// ---------------------------------------------------------------------------
// Componente principal: solo decide qué hook y qué contenido usar según el tab
// ---------------------------------------------------------------------------

export function MyReviewsList({ tab, onEdit, onDelete, onWrite }: MyReviewsListProps) {
    const reviews = useMyReviews(tab === "mine");
    const pending = usePendingReviews(tab === "pending");

    if (tab === "pending") {
        return <ListView {...pending} {...getPendingContent(onWrite)} />;
    }

    return <ListView {...reviews} {...getMineContent(onEdit, onDelete)} />;
}