/**
 * Tipos del panel de administración de pedidos.
 */
import type { OrderStatus, OrderItemResponse } from "./client";

// Filtros para el endpoint de administración de pedidos
export interface AdminOrderFilters {
  search?: string;
  status?: OrderStatus;
  managerId?: number;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  size?: number;
  sort?: string;
}

// Resumen de orden para la tabla de administración
export interface AdminOrderSummaryResponse {
  id: number;
  orderNumber: string;
  clientName: string;
  dni: string;
  status: OrderStatus;
  managerName: string | null;
  createdAt: string;
}

// Detalle completo de orden para el panel de administración
export interface AdminOrderDetailResponse {
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

// Request para asignar/reasignar un gestor a una orden
export interface OrderManagerUpdateRequest {
  managerId: number;
}

// Gestor activo para el selector de asignación
export interface GestorSummaryResponse {
  id: number;
  fullName: string;
}