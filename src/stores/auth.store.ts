/**
 * Store global de autenticación usando Zustand.
 * Guarda el token JWT y los datos del usuario autenticado.
 * Persiste la sesión en localStorage para que no se pierda al recargar la página.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role } from "@/types/api.types";

interface User {
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
}

interface AuthState {
    token: string | null;
    user: User | null;

    // Guarda el token y los datos del usuario al hacer login o registro
    setAuth: (token: string, user: User) => void;

    // Limpia la sesión al hacer logout
    logout: () => void;

    // Verifica si el usuario está autenticado
    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,

            setAuth: (token, user) => set({ token, user }),

            logout: () => set({ token: null, user: null }),

            isAuthenticated: () => !!get().token,
        }),
        {
            // Nombre de la clave en localStorage
            name: "auth-storage",
        }
    )
);