/**
 * Punto único de acceso a los hooks del módulo de carrito.
 */

// TanStack Query — carrito autenticado
export * from "./useCart";
export * from "./useMiniCart";

// Mutaciones — autenticado y anónimo
export * from "./useAddToCart";
export * from "./useRemoveFromCart";
export * from "./useUpdateQuantity";
export * from "./useClearCart";
export * from "./useMergeCart";

// Selección de datos desde store (multi-origen)
export * from "./useCartMiniItems";