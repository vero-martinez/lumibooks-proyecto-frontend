/**
 * Servicios de ubicación (departamentos, provincias y distritos).
 * Endpoints públicos del backend, usados por el formulario de direcciones.
 */
import api from "@/lib/axios";
import {
    DepartmentPublicResponse,
    ProvincePublicResponse,
    DistrictPublicResponse,
} from "@/features/addresses/types";

/**
 * Obtiene los departamentos activos (opcional: filtrar por nombre).
 */
export async function getDepartmentsService(
    search?: string,
): Promise<DepartmentPublicResponse[]> {
    const { data } = await api.get("/api/public/departments", { params: { search } });
    return data;
}

/**
 * Obtiene las provincias activas de un departamento.
 */
export async function getProvincesService(
    departmentId: number,
    search?: string,
): Promise<ProvincePublicResponse[]> {
    const { data } = await api.get("/api/public/provinces", { params: { departmentId, search } });
    return data;
}

/**
 * Obtiene los distritos activos de una provincia.
 */
export async function getDistrictsService(
    provinceId: number,
    search?: string,
): Promise<DistrictPublicResponse[]> {
    const { data } = await api.get("/api/public/districts", { params: { provinceId, search } });
    return data;
}