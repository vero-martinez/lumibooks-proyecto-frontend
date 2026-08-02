/**
 * Instancia centralizada de Axios para comunicación con Spring Boot.
 *
 * Incluye interceptores para:
 * - Agregar automáticamente el Access Token en las peticiones.
 * - Renovar la sesión automáticamente cuando el token expira.
 * - Estandarizar los mensajes de error del backend.
 */

import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { env } from "@/lib/env";
import { refreshAccessToken } from "@/lib/refresh-session";

// Cliente Axios configurado con la URL base del backend.
const api = axios.create({
    baseURL: env.apiUrl,
});

/**
 * Guarda las peticiones que ya intentaron renovarse.
 *
 * Evita que una misma petición entre en un ciclo infinito
 * de refresh cuando el nuevo token también falla.
 */
const retriedRequests = new WeakSet<object>();

/**
 * Rutas de autenticación que no deben ejecutar refresh automático.
 *
 * Evita intentar renovar la sesión en login, registro, logout
 * o refresh del propio token.
 */
const AUTH_ROUTES = [
    "/api/public/auth/login",
    "/api/public/auth/register",
    "/api/public/auth/logout",
    "/api/public/auth/refresh",
];

/**
 * Verifica si una petición pertenece a una ruta de autenticación.
 */
function isAuthRoute(url?: string): boolean {
    return !!url && AUTH_ROUTES.some((route) => url.startsWith(route));
}

/**
 * Interceptor de requests.
 *
 * Agrega el Access Token al header Authorization
 * cuando existe una sesión activa.
 */
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

/**
 * Interceptor de responses.
 *
 * Si una petición falla por token expirado:
 * 1. Intenta renovar el Access Token.
 * 2. Repite la petición original con el nuevo token.
 * 3. Si falla la renovación, cierra la sesión.
 *
 * También normaliza los mensajes de error del backend.
 */
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;
        const status = error.response?.status;

        // Solo intenta refresh una vez para evitar ciclos infinitos.
        if (
            status === 401 &&
            original &&
            !retriedRequests.has(original) &&
            !isAuthRoute(original.url)
        ) {
            retriedRequests.add(original);

            try {
                // Obtiene un nuevo Access Token usando el refresh token.
                const token = await refreshAccessToken();

                // Reintenta la petición original con el nuevo token.
                original.headers.Authorization = `Bearer ${token}`;

                return api(original);
            } catch {
                // Si no se puede renovar la sesión, elimina el estado local.
                useAuthStore.getState().logout();

                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }

                return Promise.reject(error);
            }
        }

        // Convierte diferentes formatos de error del backend
        // en un único mensaje para manejarlo en la aplicación.
        const message =
            error.response?.data?.message ??
            error.response?.data?.error ??
            error.message ??
            "Error inesperado";

        error.message = message;

        return Promise.reject(error);
    }
);

export default api;