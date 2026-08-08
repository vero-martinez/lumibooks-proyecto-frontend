/**
 * Gestión compartida del silent refresh (single-flight) en el cliente.
 * 
 * Evita ejecutar múltiples renovaciones de sesión al mismo tiempo.
 * Si varias peticiones requieren un nuevo Access Token, todas esperan
 * la misma llamada a /api/auth/refresh.
 */

import { useAuthStore } from "@/stores/auth.store";
import { refreshService } from "@/features/auth/services";

/**
 * Guarda la promesa del refresh actual.
 *
 * Permite reutilizar una misma renovación cuando varias peticiones
 * intentan refrescar el token al mismo tiempo.
 */
let refreshPromise: Promise<string> | null = null;

/**
 * Identificador usado para detectar si la sesión fue cerrada
 * mientras existía una renovación pendiente.
 */
let generation = 0;

/**
 * Renueva el Access Token mediante el Refresh Token.
 *
 * Si ya existe una renovación en proceso, devuelve esa misma promesa
 * para evitar múltiples llamadas simultáneas al endpoint de refresh.
 */
export function refreshAccessToken(): Promise<string> {
    if (!refreshPromise) {
        const currentGeneration = generation;

        refreshPromise = refreshService()
            .then((token) => {
                // Verifica que la sesión no haya sido cerrada
                // durante el proceso de renovación.
                if (currentGeneration !== generation) {
                    throw new Error("Sesión cerrada durante el refresh");
                }

                // Guarda el nuevo Access Token únicamente en memoria.
                useAuthStore.getState().setAccessToken(token);

                return token;
            })
            .finally(() => {
                // Permite realizar una nueva renovación cuando sea necesario.
                refreshPromise = null;
            });
    }

    return refreshPromise;
}

/**
 * Cancela una renovación pendiente.
 *
 * Se utiliza al cerrar sesión para evitar que un refresh en curso
 * vuelva a guardar un token después del logout.
 */
export function cancelPendingRefresh(): void {
    generation += 1;
    refreshPromise = null;
}