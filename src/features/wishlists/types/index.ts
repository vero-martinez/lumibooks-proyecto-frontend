/**
 * Tipos del módulo de wishlists.
 */

import { BookWishlistResponse } from "@/features/books/types";

// Respuesta de una lista de deseos
export interface WishlistResponse {
    id: number;
    name: string;
    itemCount: number;
}

// Respuesta detallada de una lista de deseos
export interface WishlistDetailResponse {
    id: number;
    name: string;
    books: BookWishlistResponse[];
}

// Respuesta de un libro en una lista de deseos
export interface WishlistBookStatusResponse {
    bookId: number;
    inWishlist: boolean;
    wishlists: WishlistResponse[];
}

// Datos enviados al backend para crear una lista de deseos
export interface WishlistNameRequest {
    name: string;
}

// Datos enviados al backend para mover un libro de una lista de deseos a otra
export interface WishlistMoveBookRequest {
    targetWishlistId: number;
}