/**
 * Servicios de administración del módulo de categorías.
 * Endpoints para crear, editar y gestionar categorías.
 */
import api from "@/lib/axios";
import { PageResponse } from "@/types/api.types";
import type {
    CategoryRequest,
    CategorySummary,
    CategoryAdminFilters,
} from "@/features/categories/types";

/**
 * Obtiene la lista paginada de categorías para la tabla de administración.
 * Soporta filtros por nombre y estado.
 */
export async function getCategoriesAdminService(filters: CategoryAdminFilters = {}): Promise<PageResponse<CategorySummary>> {
    const { data } = await api.get("/api/admin/categories", { params: filters });
    return data;
}

/**
 * Obtiene el detalle de una categoría por su ID.
 */
export async function getCategoryAdminService(id: number): Promise<CategorySummary> {
    const { data } = await api.get(`/api/admin/categories/${id}`);
    return data;
}

/**
 * Crea una nueva categoría.
 */
export async function createCategoryService(data: CategoryRequest): Promise<CategorySummary> {
    const { data: response } = await api.post("/api/admin/categories", data);
    return response;
}

/**
 * Actualiza una categoría existente.
 */
export async function updateCategoryService(
    id: number,
    data: CategoryRequest
): Promise<CategorySummary> {
    const { data: response } = await api.patch(`/api/admin/categories/${id}`, data);
    return response;
}

/**
 * Cambia el estado activo/inactivo de una categoría.
 */
export async function toggleCategoryStatusService(id: number): Promise<void> {
    await api.patch(`/api/admin/categories/${id}/toggle-status`);
}