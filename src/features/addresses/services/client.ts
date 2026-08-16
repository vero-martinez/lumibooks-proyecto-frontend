/**
 * Servicios del módulo de direcciones del cliente.
 * Se encargan de realizar peticiones HTTP al backend y retornar datos tipados.
 */
import api from "@/lib/axios";
import {
    AddressCreateRequest,
    AddressResponse,
    AddressUpdateRequest,
} from "@/features/addresses/types";

/**
 * Obtiene todas las direcciones del usuario autenticado.
 */
export async function getAddressesService(): Promise<AddressResponse[]> {
    const { data } = await api.get("/api/client/addresses");
    return data;
}

/**
 * Crea una nueva dirección para el usuario autenticado.
 */
export async function createAddressService(
    request: AddressCreateRequest,
): Promise<AddressResponse> {
    const { data } = await api.post("/api/client/addresses", request);
    return data;
}

/**
 * Actualiza una dirección existente del usuario autenticado.
 */
export async function updateAddressService(
    addressId: number,
    request: AddressUpdateRequest,
): Promise<AddressResponse> {
    const { data } = await api.patch(`/api/client/addresses/${addressId}`, request);
    return data;
}

/**
 * Elimina una dirección del usuario autenticado.
 */
export async function deleteAddressService(addressId: number): Promise<void> {
    await api.delete(`/api/client/addresses/${addressId}`);
}

/**
 * Establece una dirección como predeterminada.
 */
export async function setDefaultAddressService(addressId: number): Promise<void> {
    await api.patch(`/api/client/addresses/${addressId}/default`);
}