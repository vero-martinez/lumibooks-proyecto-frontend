/**
 * Instancia base de Axios para comunicación con el backend Spring Boot.
 * Incluye interceptores para agregar el token JWT automáticamente
 * en cada request y manejar errores de autenticación globalmente.
 */

import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Agrega el token JWT automáticamente en cada request
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Si el token expira o es inválido, redirige al login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;