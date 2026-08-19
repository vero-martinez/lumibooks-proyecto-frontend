/**
 * Tipos del módulo de órdenes del cliente.
 */

// Estados posibles de una orden (enum del backend)
export type OrderStatus =
    | "PENDIENTE"
    | "EN_PREPARACION"
    | "ENVIADO"
    | "ENTREGADO";

// Filtros para la lista de pedidos del cliente
export interface ClientOrderFilters {
    page: number;
    size: number;
    status?: OrderStatus | "";
}

// Resumen de una orden
export interface OrderClientResponse {
    id: number;
    orderNumber: string;
    total: number;
    status: OrderStatus;
    createdAt: string;
}

// Detalle completo de una orden
export interface OrderClientDetailResponse {
    id: number;
    orderNumber: string;
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

// Datos de pago con tarjeta (enviados al backend al crear la orden)
export interface PaymentRequest {
    cardHolderFirstName: string;
    cardHolderLastName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

// Datos enviados al backend para crear una orden
export interface OrderCreateRequest {
    addressId: number;
    recipientName: string;
    dni: string;
    phone: string;
    payment: PaymentRequest;
}

// Item dentro de la respuesta de una orden
export interface OrderItemResponse {
    bookId: number;
    coverImageUrl: string;
    title: string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
}

// Dirección formateada para la vista previa del checkout
export interface CheckoutAddressResponse {
    id: number;
    addressLine: string;
    reference: string;
    districtName: string;
    provinceName: string;
    departmentName: string;
    shippingCost: number | null;
    isShippingAvailable: boolean;
}

// Vista previa del checkout: items, dirección y resumen de costos
export interface CheckoutPreviewResponse {
    items: OrderItemResponse[];
    address: CheckoutAddressResponse;
    subtotal: number;
    total: number;
}