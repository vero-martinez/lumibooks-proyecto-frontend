/**
 * Servicio de cambio de contraseña.
 *
 * Se encargan de realizar peticiones HTTP al backend y retornar datos tipados.
 */

import api from "@/lib/axios";
import type { ChangePasswordRequest } from "@/features/password/types";

/**
 * Cambia la contraseña del usuario autenticado.
 *
 * El backend valida la contraseña actual e invalida todas las sesiones
 * existentes del usuario.
 */
export async function changePasswordService(
    request: ChangePasswordRequest,
): Promise<void> {
    await api.patch("/api/me/password", request);
}