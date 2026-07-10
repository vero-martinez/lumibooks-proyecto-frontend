/**
 * Providers globales de la aplicación.
 * Envuelve toda la app con los contextos necesarios:
 * - TanStack Query para el manejo de datos del servidor
 * - Sonner para las notificaciones toast
 */

"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "@/lib/query-client";

export function Providers({ children }: { children: React.ReactNode }) {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster position="top-right" richColors />
        </QueryClientProvider>
    );
}