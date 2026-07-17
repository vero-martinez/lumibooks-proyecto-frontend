/**
 * Servicios del módulo de listas de deseos.
 * Se encargan de realizar peticiones HTTP al backend y retornar datos tipados.
 */
import api from "@/lib/axios";
import { 
    WishlistResponse, 
    WishlistDetailResponse, 
    WishlistBookStatusResponse, 
    WishlistNameRequest, 
    WishlistMoveBookRequest
} from "@/features/wishlists/types";

/**
 * Obtiene todas las listas de deseos del usuario.
 */
export async function getWishlistsService(): Promise<WishlistResponse[]> {
    const { data } = await api.get("/api/client/wishlists");
    return data;
}

/**
 * Retorna el detalle de una lista con sus libros.
 */
export async function getWishlistDetailService(wishlistId: number): Promise<WishlistDetailResponse> {
    const { data } = await api.get(`/api/client/wishlists/${wishlistId}`);
    return data;
}

/**
 * Crea una nueva lista de deseos.
 */
export async function createWishlistService(request: WishlistNameRequest): Promise<WishlistResponse> {
    const { data } = await api.post("/api/client/wishlists", request);
    return data;
}

/**
 * Renombra una lista de deseos existente.
 */
export async function renameWishlistService(wishlistId: number, request: WishlistNameRequest): Promise<WishlistResponse> {
    const { data } = await api.patch(`/api/client/wishlists/${wishlistId}`, request);
    return data;
}

/**
 * Elimina una lista de deseos existente.
 */
export async function deleteWishlistService(wishlistId: number): Promise<void> {
    await api.delete(`/api/client/wishlists/${wishlistId}`);
}

/**
 * Agrega un libro a una lista de deseos existente.
 */
export async function addBookService(wishlistId: number, bookId: number): Promise<void> {
    await api.post(`/api/client/wishlists/${wishlistId}/books/${bookId}`);
}

/**
 * Elimina un libro de una lista de deseos existente.
 */
export async function removeBookService(wishlistId: number, bookId: number): Promise<void> {
    await api.delete(`/api/client/wishlists/${wishlistId}/books/${bookId}`);
}

/**
 * Mueve un libro de una lista de deseos a otra.
 */
export async function moveBookService(wishlistId: number, bookId: number, request: WishlistMoveBookRequest): Promise<void> {
    await api.patch(`/api/client/wishlists/${wishlistId}/books/${bookId}/move`, request);
}

/**
 * Verifica si un libro específico está en alguna lista de deseos del usuario.
 */
export async function getBookStatusService(bookId: number): Promise<WishlistBookStatusResponse> {
    const { data } = await api.get(`/api/client/wishlists/books/${bookId}/status`);
    return data;
}