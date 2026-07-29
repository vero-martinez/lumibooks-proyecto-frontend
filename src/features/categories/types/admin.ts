/**
 * Tipos del panel de administración de categorías.
 */

// Datos enviados al backend para crear o editar una categoría
export interface CategoryRequest {
    name: string;
}

// Resumen de categorías para la tabla de administración
export interface CategorySummary {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Filtros para el endpoint de administración de categorías
export interface CategoryAdminFilters {
    name?: string;
    isActive?: boolean;
    page?: number;
    size?: number;
    sort?: string;
}