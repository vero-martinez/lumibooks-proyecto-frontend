/**
 * Tipos del módulo de carrito.
 */

// Respuesta del backend: item dentro del carrito completo
export interface CartItemResponse {
    cartItemId: number;
    bookId: number;
    coverImageUrl: string;
    title: string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
}

// Item del carrito para la UI de la página (sin cartItemId)
export type CartLayoutItem = Omit<CartItemResponse, "cartItemId">;

// Respuesta del backend: carrito completo (página de carrito)
export interface CartResponse {
    cartId: number;
    items: CartItemResponse[];
    totalItems: number;
    subtotal: number;
    total: number;
}

// Respuesta del backend: item del mini carrito (navbar)
export interface CartMiniItemResponse {
    cartItemId: number;
    bookId: number;
    coverImageUrl: string;
    title: string;
    quantity: number;
    unitPrice: number;
}

// Respuesta del backend: mini carrito (navbar)
export interface CartMiniResponse {
    totalItems: number;
    total: number;
    items: CartMiniItemResponse[];
}

// Respuesta del backend: estado de un libro en el carrito
export interface CartBookStatusResponse {
    bookId: number;
    inCart: boolean;
}

// Para agregar un libro al carrito
export interface CartAddItemRequest {
    bookId: number;
    quantity: number;
}

// Para actualizar cantidad de un libro en el carrito
export interface CartUpdateQuantityRequest {
    quantity: number;
}

// Para fusionar carrito anónimo con carrito del usuario (cuando inicia sesión)
export interface CartMergeRequest {
    items: CartAddItemRequest[];
}

// Para el carrito anónimo en localStorage 
export interface CartLocalItem {
    bookId: number;
    coverImageUrl: string;
    title: string;
    unitPrice: number;
    quantity: number;
}