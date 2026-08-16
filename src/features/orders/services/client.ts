/**
 * Servicios del módulo de órdenes del cliente.
 * Se encargan de realizar peticiones HTTP al backend y retornar datos tipados.
 */
import api from "@/lib/axios";
import type {
    CheckoutPreviewResponse,
    OrderClientResponse,
    OrderCreateRequest,
} from "@/features/orders/types";

/**
 * Obtiene la vista previa del checkout para una dirección específica.
 * Incluye los items del carrito, la dirección y el resumen de costos.
 */
export async function getCheckoutPreviewService(
    addressId: number,
): Promise<CheckoutPreviewResponse> {
    const { data } = await api.get("/api/client/orders/preview", {
        params: { addressId },
    });
    return data;
}

/**
 * Crea una orden a partir del carrito del usuario autenticado.
 * El backend valida stock, direcciones y asigna un gestor automáticamente.
 */
export async function createOrderService(
    request: OrderCreateRequest,
): Promise<OrderClientResponse> {
    const { data } = await api.post("/api/client/orders", request);
    return data;
}