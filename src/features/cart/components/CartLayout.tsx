/**
 * Layout del carrito con tabla de items, resumen y confirmación para vaciar.
 */
"use client";

import { useState } from "react";
import { CartItemRow } from "@/features/cart/components/CartItemRow";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import type { CartLayoutItem } from "@/features/cart/types";

interface CartLayoutProps {
  totalItems: number;
  items: CartLayoutItem[];
  onRemove: (bookId: number) => void;
  onQuantityChange: (bookId: number, quantity: number) => void;
  onClearCart: () => void;
  subtotal: number;
  total: number;
}

export function CartLayout({
  totalItems,
  items,
  onRemove,
  onQuantityChange,
  onClearCart,
  subtotal,
  total,
}: CartLayoutProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Carrito de Compras</h1>
          <span className="text-md bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-semibold">
            {totalItems} {totalItems === 1 ? "libro" : "libros"}
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowConfirm(true)}
          className="text-xs hover:text-destructive hover:border-destructive/50"
        >
          Vaciar carrito
        </Button>
      </div>

      <ConfirmDialog
        open={showConfirm}
        title="Vaciar carrito"
        message="¿Estás seguro de que quieres eliminar todos los productos del carrito?"
        confirmLabel="Sí, vaciar"
        confirmClassName="bg-foreground text-white"
        onConfirm={() => {
          onClearCart();
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-12 items-start">
        <div className="rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse" aria-label="Carrito de compras">
              <thead className="sr-only lg:not-sr-only lg:table-header-group">
                <tr className="bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  <th scope="col" className="py-4 px-6 text-left">Producto</th>
                  <th scope="col" className="py-4 px-6 text-center w-[150px]">Cantidad</th>
                  <th scope="col" className="py-4 px-6 text-center w-[130px]">Precio</th>
                  <th scope="col" className="py-4 px-6 text-center w-[130px]">Subtotal</th>
                  <th scope="col" className="py-4 px-6 text-center w-[60px]">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <CartItemRow
                    key={item.bookId}
                    coverImageUrl={item.coverImageUrl}
                    title={item.title}
                    unitPrice={item.unitPrice}
                    quantity={item.quantity}
                    subtotal={item.subtotal}
                    onQuantityChange={(q) => onQuantityChange(item.bookId, q)}
                    onRemove={() => onRemove(item.bookId)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <CartSummary subtotal={subtotal} total={total} />
        </div>
      </div>
    </>
  );
}