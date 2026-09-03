/**
 * Hook para obtener la lista de gestores activos.
 * Usado en el selector de asignación de gestor.
 */
import { useQuery } from "@tanstack/react-query";
import { getGestoresService } from "@/features/orders/services";

export function useGestores() {
  return useQuery({
    queryKey: ["gestores"],
    queryFn: getGestoresService,
    staleTime: 5 * 60 * 1000,
  });
}