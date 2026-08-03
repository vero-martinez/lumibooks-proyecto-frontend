"use client";

/**
 * Proveedores globales de la aplicación.
 *
 * Configura React Query para la gestión de datos,
 * restaura la sesión al iniciar la aplicación
 * y habilita las notificaciones mediante Sonner.
 */

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import type { ReactNode } from "react";
import { queryClient } from "@/lib/query-client";
import { SessionGuard } from "./SessionGuard";

export function Providers({ children }: { children: ReactNode }) {
    return (
        // Provee una única instancia de React Query para toda la aplicación.
        <QueryClientProvider client={queryClient}>
            {/* Restaura la sesión antes de renderizar la aplicación. */}
            <SessionGuard>{children}</SessionGuard>

            {/* Contenedor global para mostrar notificaciones (toast). */}
            <Toaster position="top-right" richColors />
        </QueryClientProvider>
    );
}