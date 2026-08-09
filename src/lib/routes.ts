/**
 * Rutas centralizadas de la aplicación.
 * Evita repetir rutas hardcodeadas entre componentes y features.
 */
export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  books: "/books",
  authors: "/authors",
  client: {
    cart: "/client/cart",
    profile: "/client/profile",
    orders: "/client/orders",
    addresses: "/client/addresses",
    wishlist: "/client/wishlist",
    password: "/client/password",
  },
} as const;

/**
 * Ruta de detalle de una wishlist por su id.
 */
export function clientWishlistDetail(wishlistId: string | number): string {
  return `${ROUTES.client.wishlist}/${wishlistId}`;
}