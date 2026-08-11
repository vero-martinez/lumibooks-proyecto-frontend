/**
 * Hook de TanStack Query para obtener los departamentos activos (endpoint público).
 */
import { useQuery } from "@tanstack/react-query";
import { getDepartmentsService } from "@/features/addresses/services";

export function useDepartments() {
    return useQuery({
        queryKey: ["departments"],
        queryFn: () => getDepartmentsService(),
    });
}