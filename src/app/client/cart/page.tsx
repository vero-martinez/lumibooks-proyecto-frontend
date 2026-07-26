/**
 * Página del carrito de compras.
 * Muestra los items del carrito, resumen y acciones (vaciar).
 * Soporta carrito autenticado (backend) y anónimo (localStorage).
 */
"use client";

import { useRouter } from "next/navigation";
import { BsCartX } from "react-icons/bs";
import { CartLayout } from "@/features/cart/components/CartLayout";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { useAuthStore } from "@/stores/auth.store";
import { useCartStore } from "@/stores/cart.store";
import { useCart, useRemoveFromCart, useUpdateQuantity, useClearCart } from "@/features/cart/hooks";

export default function CartPage() {
  const isAuthenticated = useAuthStore((s) => !!s.token);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      {isAuthenticated ? <AuthenticatedCart /> : <AnonymousCart />}
    </div>
  );
}

function AuthenticatedCart() {
  const { data, isLoading, isError, refetch } = useCart();
  const removeFromCart = useRemoveFromCart();
  const updateQuantity = useUpdateQuantity();
  const clearCart = useClearCart();

  if (isLoading) return <LoadingState label="Cargando carrito..." />;
  if (isError) return <ErrorState message="Error al cargar el carrito" onRetry={() => refetch()} />;
  if (!data || data.items.length === 0) return <CartEmpty />;

  return (
    <CartLayout
      totalItems={data.totalItems}
      items={data.items}
      onRemove={(bookId) => removeFromCart.mutate(bookId)}
      onQuantityChange={(bookId, quantity) => updateQuantity.mutate({ bookId, quantity })}
      onClearCart={() => clearCart.mutate()}
      subtotal={data.subtotal}
      total={data.total}
    />
  );
}

function AnonymousCart() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);

  const totalItems = useCartStore((s) => s.getTotalItems());
  const subtotal = useCartStore((s) => s.getSubtotal());

  if (items.length === 0) return <CartEmpty />;

  return (
    <CartLayout
      totalItems={totalItems}
      items={items.map((i) => ({ ...i, subtotal: i.unitPrice * i.quantity }))}
      onRemove={(bookId) => removeItem(bookId)}
      onQuantityChange={(bookId, quantity) => updateQuantity(bookId, quantity)}
      onClearCart={() => clearCart()}
      subtotal={subtotal}
      total={subtotal}
    />
  );
}

function CartEmpty() {
  const router = useRouter();

  return (
    <EmptyState
      as="h1"
      title="Tu carrito está vacío"
      description="Agrega libros desde el catálogo"
      icon={<BsCartX size={30} />}
      action={{ label: "Ver catálogo", onClick: () => router.push("/books") }}
    />
  );
}
