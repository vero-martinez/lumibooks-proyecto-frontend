/**
 * Servicios de administración del módulo de pedidos.
 */
import api from "@/lib/axios";
import { PageResponse } from "@/types/api.types";
import type {
  AdminOrderFilters,
  AdminOrderSummaryResponse,
  AdminOrderDetailResponse,
  OrderManagerUpdateRequest,
  GestorSummaryResponse,
} from "@/features/orders/types";

/**
 * Obtiene la lista paginada de pedidos para el panel de administración.
 */
export async function getAdminOrdersService(
  filters: AdminOrderFilters = {},
): Promise<PageResponse<AdminOrderSummaryResponse>> {
  const { data } = await api.get("/api/admin/orders", { params: filters });
  return data;
}

/**
 * Obtiene el detalle completo de un pedido para el panel de administración.
 */
export async function getAdminOrderDetailService(
  orderId: number,
): Promise<AdminOrderDetailResponse> {
  const { data } = await api.get(`/api/admin/orders/${orderId}`);
  return data;
}

/**
 * Asigna o reasigna un gestor a una orden.
 */
export async function updateOrderManagerService(
  orderId: number,
  request: OrderManagerUpdateRequest,
): Promise<void> {
  await api.patch(`/api/admin/orders/${orderId}/manager`, request);
}

/**
 * Obtiene la lista de gestores activos para el selector de asignación.
 */
export async function getGestoresService(): Promise<GestorSummaryResponse[]> {
  const { data } = await api.get("/api/admin/users/gestores");
  return data;
}