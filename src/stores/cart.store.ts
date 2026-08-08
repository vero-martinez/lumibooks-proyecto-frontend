/**
 * Store del carrito anónimo con persistencia en localStorage.
 *
 * Funciones principales:
 * - Mantener items del carrito mientras el usuario no ha iniciado sesión.
 * - Fusionarse con el carrito del backend al iniciar sesión (merge).
 * - Proveer métodos para agregar, eliminar, actualizar cantidad y vaciar.
 * - Calcular total de items y subtotal desde el estado local.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLocalItem } from "@/features/cart/types";

interface CartState {
    items: CartLocalItem[];
    addItem: (item: CartLocalItem) => void;
    removeItem: (bookId: number) => void;
    updateQuantity: (bookId: number, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                const existing = get().items.find((i) => i.bookId === item.bookId);
                if (existing) {
                    set({
                        items: get().items.map((i) =>
                            i.bookId === item.bookId
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i,
                        ),
                    });
                } else {
                    set({ items: [...get().items, item] });
                }
            },

            removeItem: (bookId) =>
                set({ items: get().items.filter((i) => i.bookId !== bookId) }),

            updateQuantity: (bookId, quantity) => {
                if (quantity < 1) return;
                set({
                    items: get().items.map((i) =>
                        i.bookId === bookId ? { ...i, quantity } : i,
                    ),
                });
            },

            clearCart: () => set({ items: [] }),

            getTotalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

            getSubtotal: () =>
                get().items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0),
        }),
        {
            name: "cart-storage", // clave en localStorage

            /**
             * Evita rehidratar el store desde localStorage al crearlo.
             * La rehidratación se ejecuta manualmente en StoreHydrator
             * después de que el componente se monta en el cliente,
             * para que el SSR y el primer render del cliente coincidan.
             */
            skipHydration: true,
        },
    ),
);