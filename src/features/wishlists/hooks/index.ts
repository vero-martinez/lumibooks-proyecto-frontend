/**
 * Punto único de acceso a los hooks del módulo de wishlists.
 */

// TanStack Query
// Consultas
export * from "./useWishlists";
export * from "./useWishlistDetail";
export * from "./useBookWishlistStatus";

// Mutaciones
export * from "./useCreateWishlist";
export * from "./useRenameWishlist";
export * from "./useDeleteWishlist";
export * from "./useAddBookToWishlist";
export * from "./useRemoveBookFromWishlist";