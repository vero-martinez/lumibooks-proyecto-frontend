/**
 * Opciones y constantes para el panel de administración de reseñas.
 */
import type { ReviewStatus } from "@/features/reviews/types";

/** Etiquetas legibles de cada estado de reseña */
export const REVIEW_STATUS_LABELS: Record<ReviewStatus, string> = {
    PENDIENTE: "Pendiente",
    MODERADA: "Moderada",
    OCULTA: "Oculta",
};

/** Orden de presentación de los estados en la UI. */
export const REVIEW_STATUS_ORDER: ReviewStatus[] = ["PENDIENTE", "MODERADA", "OCULTA"];

/** Opciones de estado para menús y selectores. */
export const REVIEW_STATUS_OPTIONS: { value: ReviewStatus; label: string }[] =
    REVIEW_STATUS_ORDER.map((value) => ({
        value,
        label: REVIEW_STATUS_LABELS[value],
    }));

/** Cantidad de elementos por página por defecto en la tabla de administración. */
export const DEFAULT_PAGE_SIZE = 10;

/** Calificaciones disponibles como filtro para la tabla de administración. */
export const ADMIN_REVIEW_RATING_OPTIONS = [5, 4, 3, 2, 1].map((rating) => ({
    value: String(rating),
    label: rating === 1 ? "1 estrella" : `${rating} estrellas`,
}));

/** Opciones de ordenamiento para la tabla de administración. */
export const ADMIN_REVIEW_SORT_OPTIONS = [
    { value: "createdAt,desc", label: "Más recientes" },
    { value: "createdAt,asc", label: "Más antiguos" },
];