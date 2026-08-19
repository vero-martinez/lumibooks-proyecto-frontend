/**
 * Página de checkout.
 * Muestra el wizard de 3 pasos para finalizar la compra.
 * Si el carrito está vacío, redirige al carrito.
 */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckoutLayout } from "@/features/orders/components";
import { useCart } from "@/features/cart/hooks";
import { LoadingState } from "@/components/shared/LoadingState";
import { ROUTES } from "@/lib/routes";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: cart, isLoading } = useCart();

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (!isLoading && cart && cart.items.length === 0) {
      router.replace(ROUTES.client.cart);
    }
  }, [cart, isLoading, router]);

  if (isLoading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <LoadingState label="Cargando checkout..." />
      </div>
    );
  }

  // No renderizar nada si el carrito está vacío (ya redirigió)
  if (!cart || cart.items.length === 0) {
    return null;
  }

  return <CheckoutLayout />;
}