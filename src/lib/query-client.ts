/**
 * Instancia global de QueryClient para TanStack Query.
 * Se exporta para poder usarla fuera del contexto React (servicios, etc.)
 */
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 10 * 1000 * 60,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});