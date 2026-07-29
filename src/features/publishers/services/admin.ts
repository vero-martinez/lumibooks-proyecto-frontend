/**
 * Servicios de administración del módulo de editoriales.
 * Endpoints para crear, editar y gestionar editoriales.
 */
import api from "@/lib/axios";
import { PageResponse } from "@/types/api.types";
import type {
    PublisherRequest,
    PublisherSummary,
    PublisherAdminFilters,
} from "@/features/publishers/types";

/**
 * Obtiene la lista paginada de editoriales para la tabla de administración.
 * Soporta filtros por nombre y estado.
 */
export async function getPublishersAdminService(filters: PublisherAdminFilters = {}): Promise<PageResponse<PublisherSummary>> {
    const { data } = await api.get("/api/admin/publishers", { params: filters });
    return data;
}

/**
 * Obtiene el detalle de una editorial por su ID.
 */
export async function getPublisherAdminService(id: number): Promise<PublisherSummary> {
    const { data } = await api.get(`/api/admin/publishers/${id}`);
    return data;
}

/**
 * Crea una nueva editorial.
 */
export async function createPublisherService(data: PublisherRequest): Promise<PublisherSummary> {
    const { data: response } = await api.post("/api/admin/publishers", data);
    return response;
}

/**
 * Actualiza una editorial existente.
 */
export async function updatePublisherService(
    id: number,
    data: PublisherRequest
): Promise<PublisherSummary> {
    const { data: response } = await api.patch(`/api/admin/publishers/${id}`, data);
    return response;
}

/**
 * Cambia el estado activo/inactivo de una editorial.
 */
export async function togglePublisherStatusService(id: number): Promise<void> {
    await api.patch(`/api/admin/publishers/${id}/toggle-status`);
}