/**
 * Tipos del módulo de gestión de pedidos (panel gestor).
 */
import type { OrderStatus, OrderItemResponse } from "./client";

// Filtros para el endpoint de gestión de pedidos
export interface ManagerOrderFilters {
  search?: string;
  status?: OrderStatus;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  size?: number;
  sort?: string;
}

// Resumen de orden para la tabla de gestión
export interface ManagerOrderSummaryResponse {
  id: number;
  orderNumber: string;
  clientName: string;
  dni: string;
  status: OrderStatus;
  managerName: string | null;
  createdAt: string;
}

// Detalle completo de orden para el panel gestor
export interface ManagerOrderDetailResponse {
  id: number;
  orderNumber: string;
  clientName: string;
  managerName: string | null;
  status: OrderStatus;
  recipientName: string;
  dni: string;
  phone: string;
  addressLine: string;
  districtName: string;
  provinceName: string;
  departmentName: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  items: OrderItemResponse[];
  createdAt: string;
  updatedAt: string;
}

// Request para actualizar el estado de una orden
export interface OrderStatusUpdateRequest {
  status: OrderStatus;
}