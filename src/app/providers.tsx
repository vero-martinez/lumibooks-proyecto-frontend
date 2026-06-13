/**
 * Providers globales de la aplicación.
 * Envuelve toda la app con los contextos necesarios:
 * - TanStack Query para el manejo de datos del servidor
 * - Sonner para las notificaciones toast
 */

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    // useState para que cada usuario tenga su propia instancia de QueryClient
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster position="top-right" richColors />
        </QueryClientProvider>
    );
}