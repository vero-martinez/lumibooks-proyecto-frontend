/**
 * Servicios del módulo de perfil de usuario.
 * Realizan peticiones HTTP al backend y retornan datos tipados.
 */
import api from "@/lib/axios";
import type {
    UserMeResponse,
    UserProfileUpdateRequest,
} from "@/features/profile/types";

/**
 * Obtiene el perfil del usuario autenticado (GET /api/me).
 */
export async function getProfileService(): Promise<UserMeResponse> {
    const { data } = await api.get("/api/me");
    return data;
}

/**
 * Actualiza los datos básicos del perfil del usuario autenticado (PATCH /api/me).
 */
export async function updateProfileService(
    request: UserProfileUpdateRequest,
): Promise<UserMeResponse> {
    const { data } = await api.patch("/api/me", request);
    return data;
}