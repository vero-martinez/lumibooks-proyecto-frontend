/**
 * Servicios del carrito de compras.
 * Se encargan de realizar peticiones HTTP al backend y retornar datos tipados.
 * Solo se usan cuando el usuario está autenticado (token JWT presente).
 */
import api from "@/lib/axios";
import type {
    CartResponse,
    CartMiniResponse,
    CartBookStatusResponse,
    CartAddItemRequest,
    CartUpdateQuantityRequest,
    CartMergeRequest,
} from "@/features/cart/types";

/**
 * Obtiene el carrito completo del usuario autenticado.
 * Se usa en la página principal del carrito.
 */
export async function getCartService(): Promise<CartResponse> {
    const { data } = await api.get("/api/client/cart");
    return data;
}

/**
 * Obtiene un resumen del carrito (cantidad de items y total).
 * Se usa en el dropdown del navbar.
 */
export async function getMiniCartService(): Promise<CartMiniResponse> {
    const { data } = await api.get("/api/client/cart/mini");
    return data;
}

/**
 * Verifica si un libro específico está en el carrito del usuario.
 */
export async function getBookStatusService(bookId: number): Promise<CartBookStatusResponse> {
    const { data } = await api.get(`/api/client/cart/books/${bookId}/status`);
    return data;
}

/**
 * Agrega un libro al carrito del usuario autenticado.
 * Si el libro ya existe, incrementa la cantidad.
 */
export async function addItemToCartService(request: CartAddItemRequest): Promise<void> {
    await api.post("/api/client/cart/items", request);
}

/**
 * Elimina un libro del carrito del usuario autenticado.
 */
export async function removeItemFromCartService(bookId: number): Promise<void> {
    await api.delete(`/api/client/cart/items/${bookId}`);
}

/**
 * Actualiza la cantidad de un libro en el carrito del usuario autenticado.
 */
export async function updateCartItemQuantityService(
    bookId: number,
    request: CartUpdateQuantityRequest
): Promise<void> {
    await api.patch(`/api/client/cart/items/${bookId}`, request);
}

/**
 * Vacía el carrito eliminando todos los items del usuario autenticado.
 */
export async function clearCartService(): Promise<void> {
    await api.delete("/api/client/cart");
}

/**
 * Fusiona el carrito anónimo (localStorage) con el carrito del usuario autenticado.
 * Se llama automáticamente al iniciar sesión si hay items locales.
 */
export async function mergeCartService(request: CartMergeRequest): Promise<void> {
    await api.post("/api/client/cart/merge", request);
}