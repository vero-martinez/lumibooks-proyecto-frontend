/**
 * Adaptador del carrito de compras.
 * 
 * Decide si las operaciones del carrito se ejecutan en el backend
 * (usuario autenticado con token JWT) o en localStorage (usuario anónimo).
 * Los hooks consumen este adaptador en lugar de llamar directamente a client.ts.
 */
import {
    addItemToCartService,
    removeItemFromCartService,
    updateCartItemQuantityService,
    clearCartService,
    mergeCartService,
} from "./client";
import { useCartStore } from "@/stores/cart.store";
import { useAuthStore } from "@/stores/auth.store";
import type { CartAddItemRequest, CartLocalItem, CartMergeRequest } from "@/features/cart/types";

/**
 * Agrega un libro al carrito.
 * - Autenticado: envía la petición al backend.
 * - Anónimo: guarda en localStorage con metadata (portada, título, precio).
 */
export async function addItem(item: CartAddItemRequest & Pick<CartLocalItem, "coverImageUrl" | "title" | "unitPrice">) {
    const token = useAuthStore.getState().token;
    if (token) {
        await addItemToCartService({ bookId: item.bookId, quantity: item.quantity });
    } else {
        useCartStore.getState().addItem({
            bookId: item.bookId,
            coverImageUrl: item.coverImageUrl,
            title: item.title,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
        });
    }
}

/**
 * Elimina un libro del carrito por su ID.
 * - Autenticado: backend.
 * - Anónimo: localStorage.
 */
export async function removeItem(bookId: number) {
    const token = useAuthStore.getState().token;
    if (token) {
        await removeItemFromCartService(bookId);
    } else {
        useCartStore.getState().removeItem(bookId);
    }
}

/**
 * Actualiza la cantidad de un libro en el carrito.
 * - Autenticado: backend.
 * - Anónimo: localStorage.
 */
export async function updateQuantity(bookId: number, quantity: number) {
    const token = useAuthStore.getState().token;
    if (token) {
        await updateCartItemQuantityService(bookId, { quantity });
    } else {
        useCartStore.getState().updateQuantity(bookId, quantity);
    }
}

/**
 * Vacía el carrito eliminando todos los items.
 * - Autenticado: backend.
 * - Anónimo: localStorage.
 */
export async function clearCart() {
    const token = useAuthStore.getState().token;
    if (token) {
        await clearCartService();
    } else {
        useCartStore.getState().clearCart();
    }
}

/**
 * Fusiona el carrito anónimo (localStorage) con el carrito del backend.
 * Se llama al iniciar sesión si hay items locales pendientes.
 * Después del merge limpia el localStorage.
 */
export async function mergeCart(request: CartMergeRequest) {
    const token = useAuthStore.getState().token;
    if (!token) return;
    await mergeCartService(request);
    useCartStore.getState().clearCart();
}