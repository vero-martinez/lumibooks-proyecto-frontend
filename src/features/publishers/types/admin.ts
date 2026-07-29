/**
 * Tipos del panel de administración de editoriales.
 */

/** Datos enviados al backend para crear o actualizar una editorial. */
export interface PublisherRequest {
    name: string;
}

/** Resumen de editoriales para la tabla de administración. */
export interface PublisherSummary {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

/** Filtros para el endpoint de administración de editoriales. */
export interface PublisherAdminFilters {
    name?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
    sort?: string;
}