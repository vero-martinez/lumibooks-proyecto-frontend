/**
 * Store global de autenticación usando Zustand.
 *
 * Mantiene el Access Token en memoria y los datos del usuario autenticado.
 *
 * El Access Token NO se guarda en localStorage.
 * Solo se persisten datos del usuario para conservar información básica
 * al recargar la aplicación.
 *
 * Al iniciar nuevamente la aplicación, el token se obtiene mediante
 * el refresh token almacenado en una cookie httpOnly, evitando exponer
 * el JWT a XSS.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role } from "@/types/api.types";

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
}

interface AuthState {
    token: string | null;
    user: User | null;

    // Guarda el Access Token y los datos del usuario después del login/register.
    setAuth: (token: string, user: User) => void;

    // Actualiza únicamente el Access Token después de renovarlo.
    setAccessToken: (token: string) => void;

    // Actualiza parcialmente los datos del usuario autenticado.
    updateUser: (partial: Partial<User>) => void;

    // Elimina la sesión actual del usuario.
    logout: () => void;

    // Comprueba si existe un Access Token válido en memoria.
    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,

            setAuth: (token, user) => set({ token, user }),

            setAccessToken: (token) => set({ token }),

            updateUser: (partial) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...partial } : state.user,
                })),

            logout: () => set({ token: null, user: null }),

            isAuthenticated: () => !!get().token,
        }),
        {
            // Nombre de la clave utilizada en localStorage.
            name: "auth-storage",

            /**
             * Solo persiste los datos del usuario.
             * El Access Token permanece únicamente en memoria.
             */
            partialize: (state) => ({
                user: state.user,
            }),

            /**
             * Evita recuperar un token antiguo guardado
             * por la versión anterior que persistía el JWT.
             *
             * La sesión se restaura mediante el refresh token.
             */
            merge: (persisted, current) => ({
                ...current,
                ...(persisted as Partial<AuthState>),
                token: null,
            }),
        },
    ),
);