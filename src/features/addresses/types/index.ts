/**
 * Tipos del módulo de direcciones del cliente.
 */

// Ubigeo (endpoints públicos) — para el selector en cascada departamento/provincia/distrito
export interface DepartmentPublicResponse {
    id: number;
    name: string;
}

export interface ProvincePublicResponse {
    id: number;
    name: string;
}

export interface DistrictPublicResponse {
    id: number;
    name: string;
}

// Dirección del usuario autenticado
export interface AddressResponse {
    id: number;
    department: DepartmentPublicResponse;
    province: ProvincePublicResponse;
    district: DistrictPublicResponse;
    addressLine: string;
    reference: string;
    isDefault: boolean;
}

// Datos enviados al backend para crear una dirección
export interface AddressCreateRequest {
    districtId: number;
    addressLine: string;
    reference: string;
}

// Datos enviados al backend para actualizar una dirección
export interface AddressUpdateRequest {
    districtId?: number;
    addressLine?: string;
    reference?: string;
}