"use client";

/**
 * Página de pedidos del usuario.
 * Lista paginada de pedidos con filtro por estado y detalle en dialog.
 */
import { ClientOrdersList } from "@/features/orders/components";
import { CLIENT_ORDERS } from "@/features/orders/constants";

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-3xl pb-10 space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          {CLIENT_ORDERS.title}
        </h1>
        <p className="text-md text-muted-foreground">
          {CLIENT_ORDERS.description}
        </p>
      </div>

      <ClientOrdersList />
    </div>
  );
}