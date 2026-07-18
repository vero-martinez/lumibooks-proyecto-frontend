/**
 * Hook de TanStack Query para obtener los banners activos del carrusel de la landing.
 */
import { useQuery } from "@tanstack/react-query";
import { getBannersService } from "@/features/banners/services";

export function useBanners() {
  return useQuery({
    queryKey: ["banners"],
    queryFn: getBannersService,
  });
}