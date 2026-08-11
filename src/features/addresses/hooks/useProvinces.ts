/**
 * Hook de TanStack Query para obtener las provincias de un departamento.
 * Solo se ejecuta cuando departmentId está definido.
 */
import { useQuery } from "@tanstack/react-query";
import { getProvincesService } from "@/features/addresses/services";

export function useProvinces(departmentId: number | null) {
    return useQuery({
        queryKey: ["provinces", departmentId],
        queryFn: () => getProvincesService(departmentId!),
        enabled: departmentId !== null,
    });
}