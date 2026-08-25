/**
 * Servicios del módulo de gestión de pedidos (panel gestor).
 */
import api from "@/lib/axios";
import { PageResponse } from "@/types/api.types";
import type {
  ManagerOrderFilters,
  ManagerOrderSummaryResponse,
  ManagerOrderDetailResponse,
  OrderStatusUpdateRequest,
} from "@/features/orders/types";

/**
 * Obtiene la lista paginada de pedidos para el panel gestor.
 */
export async function getManagerOrdersService(
  filters: ManagerOrderFilters = {},
): Promise<PageResponse<ManagerOrderSummaryResponse>> {
  const { data } = await api.get("/api/manager/orders", { params: filters });
  return data;
}

/**
 * Obtiene el detalle completo de un pedido para el panel gestor.
 */
export async function getManagerOrderDetailService(
  orderId: number,
): Promise<ManagerOrderDetailResponse> {
  const { data } = await api.get(`/api/manager/orders/${orderId}`);
  return data;
}

/**
 * Actualiza el estado de un pedido.
 */
export async function updateOrderStatusService(
  orderId: number,
  request: OrderStatusUpdateRequest,
): Promise<void> {
  await api.patch(`/api/manager/orders/${orderId}/status`, request);
}