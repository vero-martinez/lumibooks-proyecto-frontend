/**
 * Tipos del panel de clientes.
 */

export interface BookWishlistResponse {
    id: number;
    coverImageUrl: string;
    title: string;
    authors: string[];
    price: number;
}