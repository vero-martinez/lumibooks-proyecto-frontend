/**
 * Fusiona el carrito anónimo (localStorage) con el carrito del backend.
 * Se ejecuta al iniciar sesión si hay items locales pendientes.
 */
import { toast } from "sonner";
import { queryClient } from "@/lib/query-client";
import { mergeCartService } from "@/features/cart/services/client";
import { useCartStore } from "@/stores/cart.store";

export async function mergeCartOnLogin() {
    const localItems = useCartStore.getState().items;
    if (localItems.length === 0) return;

    try {
        await mergeCartService({
            items: localItems.map((i) => ({
                bookId: i.bookId,
                quantity: i.quantity,
            })),
        });
        useCartStore.getState().clearCart();
        queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch {
        toast.error("Error al fusionar el carrito");
    }
}