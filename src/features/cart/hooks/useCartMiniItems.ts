/**
 * Hook que selecciona los items del mini carrito según el estado de autenticación:
 * - Autenticado → datos del backend vía useMiniCart
 * - Anónimo → datos del store local (Zustand)
 */
import { useMiniCart } from "@/features/cart/hooks";
import { useCartStore } from "@/stores/cart.store";
import { useAuthStore } from "@/stores/auth.store";
import type { CartMiniItemResponse } from "@/features/cart/types";

export function useCartMiniItems() {
  const isAuthenticated = useAuthStore((s) => !!s.token);

  const { data: remoteData } = useMiniCart();
  const localItems = useCartStore((s) => s.items);
  const localTotalItems = useCartStore((s) => s.getTotalItems());
  const localSubtotal = useCartStore((s) => s.getSubtotal());

  const items: CartMiniItemResponse[] = isAuthenticated
    ? (remoteData?.items ?? [])
    : localItems.map((i) => ({
        // Los items locales no tienen cartItemId del backend; se pone 0 como placeholder
        cartItemId: 0,
        bookId: i.bookId,
        coverImageUrl: i.coverImageUrl,
        title: i.title,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      }));

  const totalItems = isAuthenticated
    ? (remoteData?.totalItems ?? 0)
    : localTotalItems;

  const total = isAuthenticated
    ? (remoteData?.total ?? 0)
    : localSubtotal;

  return { items, totalItems, total };
}