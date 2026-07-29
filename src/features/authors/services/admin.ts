/**
 * Servicios de administración del módulo de autores.
 * Endpoints para crear, editar y gestionar autores.
 */
import api from "@/lib/axios";
import { PageResponse } from "@/types/api.types";
import type {
    AuthorCreateRequest,
    AuthorUpdateRequest,
    AuthorSummary,
    AuthorAdminDetail,
    AuthorAdminFilters,
} from "@/features/authors/types";

/**
 * Obtiene la lista de autores para la tabla de administración.
 * Soporta filtros dinámicos y paginación.
 */
export async function getAuthorsAdminService(filters: AuthorAdminFilters = {}): Promise<PageResponse<AuthorSummary>> {
    const { data } = await api.get("/api/admin/authors", { params: filters });
    return data;
}

/**
 * Obtiene el detalle completo de un autor para el panel de administración.
 */
export async function getAuthorDetailAdminService(id: number): Promise<AuthorAdminDetail> {
    const { data } = await api.get(`/api/admin/authors/${id}`);
    return data;
}

/**
 * Crea un nuevo autor enviando los datos como multipart/form-data.
 * El campo "data" contiene el JSON con los campos del autor.
 * El campo "profileImage" contiene la imagen de perfil.
 */
export async function createAuthorService(
    data: AuthorCreateRequest,
    profileImage?: File
): Promise<AuthorAdminDetail> {
    const formData = new FormData();
    formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    if (profileImage) formData.append("profileImage", profileImage);

    const { data: response } = await api.post("/api/admin/authors", formData);
    return response;
}

/**
 * Actualiza un autor existente enviando los datos como multipart/form-data.
 * El campo "data" contiene el JSON con los campos a actualizar.
 * El campo "profileImage" es opcional y contiene la nueva imagen de perfil.
 */
export async function updateAuthorService(
    id: number,
    data: AuthorUpdateRequest,
    profileImage?: File
): Promise<AuthorAdminDetail> {
    const formData = new FormData();
    formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    if (profileImage) {
        formData.append("profileImage", profileImage);
    }

    const { data: response } = await api.patch(`/api/admin/authors/${id}`, formData);
    return response;
}

/**
 * Cambia el estado activo/inactivo de un autor.
 */
export async function toggleAuthorStatusService(id: number): Promise<void> {
    await api.patch(`/api/admin/authors/${id}/toggle-status`);
}