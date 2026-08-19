/**
 * Servicios del módulo de órdenes del cliente.
 * Se encargan de realizar peticiones HTTP al backend y retornar datos tipados.
 */
import api from "@/lib/axios";
import type {
    CheckoutPreviewResponse,
    ClientOrderFilters,
    OrderClientResponse,
    OrderClientDetailResponse,
    OrderCreateRequest,
} from "@/features/orders/types";
import type { PageResponse } from "@/types/api.types";

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

/**
 * Obtiene la lista paginada de pedidos del usuario autenticado.
 * Soporta filtro por status y ordenamiento.
 */
export async function getClientOrdersService(
    filters: ClientOrderFilters,
): Promise<PageResponse<OrderClientResponse>> {
    const { data } = await api.get("/api/client/orders", {
        params: { ...filters, sort: "createdAt,desc" },
    });
    return data;
}

/**
 * Obtiene el detalle completo de un pedido del usuario autenticado.
 */
export async function getClientOrderDetailService(
    orderId: number,
): Promise<OrderClientDetailResponse> {
    const { data } = await api.get(`/api/client/orders/${orderId}`);
    return data;
}