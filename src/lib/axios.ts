/**
 * Instancia base de Axios para comunicación con el backend Spring Boot.
 * Incluye interceptores para:
 * - Agregar automáticamente el token JWT en cada request.
 * - Manejar errores de autenticación (401).
 * - Normalizar los mensajes de error del backend.
 */
import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { env } from "@/lib/env";

// Instancia centralizada de Axios para comunicación con el backend Spring Boot.
const api = axios.create({
    baseURL: env.apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Interceptor de requests:
 * Agrega automáticamente el token JWT en cada petición si existe sesión activa.
 */
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * Interceptor de responses:
 * - Maneja errores de autenticación (401) cerrando sesión automáticamente.
 * - Normaliza los mensajes de error para toda la aplicación.
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {

        // Si el token expiró o es inválido, se cierra sesión
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
            window.location.href = "/login";
        }
        
        // Normalización del mensaje de error del backend
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