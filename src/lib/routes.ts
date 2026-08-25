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
    checkout: "/client/checkout",
    orderConfirmation: "/client/checkout/confirmacion",
    profile: "/client/profile",
    orders: "/client/orders",
    addresses: "/client/addresses",
    wishlist: "/client/wishlist",
    reviews: "/client/reviews",
    password: "/client/password",
  },
  gestor: {
    dashboard: "/gestor/dashboard",
    orders: "/gestor/orders",
  },
  admin: {
    dashboard: "/admin/dashboard",
    books: "/admin/books",
    orders: "/admin/orders",
    users: "/admin/users",
    reviews: "/admin/reviews",
    banners: "/admin/banners",
    history: "/admin/history",
    subscriptions: "/admin/subscriptions",
    catalog: {
      authors: "/admin/catalog/authors",
      categories: "/admin/catalog/categories",
      publishers: "/admin/catalog/publishers",
    },
  },
} as const;

/**
 * Ruta de detalle de una wishlist por su id.
 */
export function clientWishlistDetail(wishlistId: string | number): string {
  return `${ROUTES.client.wishlist}/${wishlistId}`;
}