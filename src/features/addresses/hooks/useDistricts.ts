/**
 * Hook de TanStack Query para obtener los distritos de una provincia.
 * Solo se ejecuta cuando provinceId está definido.
 */
import { useQuery } from "@tanstack/react-query";
import { getDistrictsService } from "@/features/addresses/services";

export function useDistricts(provinceId: number | null) {
    return useQuery({
        queryKey: ["districts", provinceId],
        queryFn: () => getDistrictsService(provinceId!),
        enabled: provinceId !== null,
    });
}