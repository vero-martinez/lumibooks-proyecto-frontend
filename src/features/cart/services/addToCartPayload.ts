/**
 * Construye el payload para agregar al carrito.
 * Unifica el mapeo libro → CartLocalItem en un solo lugar.
 */
import type { CartLocalItem } from "@/features/cart/types";

interface BookSource {
    id: number;
    coverImageUrl: string;
    title: string;
    price: number;
}

export function buildAddToCartPayload(
    book: BookSource,
    quantity = 1
): CartLocalItem {
    return {
        bookId: book.id,
        coverImageUrl: book.coverImageUrl,
        title: book.title,
        unitPrice: book.price,
        quantity,
    };
}