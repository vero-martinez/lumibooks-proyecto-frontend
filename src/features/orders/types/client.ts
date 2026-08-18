/**
 * Tipos del módulo de órdenes del cliente.
 */

// Resumen de una orden
export interface OrderClientResponse {
    id: number;
    orderNumber: string;
    total: number;
    status: string;
    createdAt: string;
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