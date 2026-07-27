/**
 * Dropdown del carrito en la navbar.
 * Muestra items, total y acciones rápidas (vaciar / ver carrito).
 * Soporta carrito remoto (autenticado) y local (anónimo).
 */
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FaShoppingCart, FaTimes, FaTrash } from "react-icons/fa";
import { useCartMiniItems, useRemoveFromCart, useClearCart } from "@/features/cart/hooks";
import { BookCover } from "@/components/shared/BookCover";
import { IconButton } from "@/components/shared/IconButton";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";

const MAX_BADGE = 9;

export function CartMiniDropdown() {
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { items, totalItems, total } = useCartMiniItems();
  const removeFromCart = useRemoveFromCart();
  const clearCartMutation = useClearCart();

  useClickOutside(ref, () => {
    if (!showConfirm) setOpen(false);
  }, { enabled: open });

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <IconButton
          icon={FaShoppingCart}
          label="Carrito"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-foreground text-background text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center pointer-events-none">
            {totalItems > MAX_BADGE ? `${MAX_BADGE}+` : totalItems}
          </span>
        )}
      </div>

      {open && (
        <div className="absolute right-0 top-full mt-3 w-70 sm:w-90 bg-card border border-border/20 rounded-xl shadow-xl z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/10">
            <span className="font-semibold text-sm text-secondary-foreground">
              Carrito ({totalItems})
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="p-1 -m-1 text-muted-foreground hover:text-secondary-foreground transition-colors rounded-md hover:bg-accent/50"
            >
              <FaTimes size={14} />
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-10">
                <FaShoppingCart size={32} className="text-muted-foreground/30" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">Tu carrito está vacío</p>
              </div>
            ) : (
              <ul className="divide-y divide-border/10">
                {items.map((item) => {
                  const subtotal = item.unitPrice * item.quantity;
                  return (
                    <li key={item.bookId} className="flex items-center gap-3 px-4 py-3 hover:bg-accent/30 transition-colors">
                      <BookCover
                        src={item.coverImageUrl}
                        alt={item.title}
                        className="w-10 h-[60px] rounded-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.quantity} {item.quantity === 1 ? "unidad" : "unidades"}</p>
                        <p className="text-xs text-muted-foreground">{formatPrice(item.unitPrice)}</p>
                      </div>
                      <p className="text-sm font-semibold shrink-0">
                        {formatPrice(subtotal)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeFromCart.mutate(item.bookId)}
                        disabled={removeFromCart.isPending}
                        aria-label={`Eliminar ${item.title}`}
                        className="p-1.5 -m-1.5 rounded-full text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaTrash size={12} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-border/10 px-4 py-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-foreground">Total</span>
                <span className="text-base font-bold">{formatPrice(total)}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowConfirm(true)}
                  disabled={clearCartMutation.isPending}
                  className="flex-1 text-xs py-4"
                >
                  Vaciar carrito
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="flex-1 text-xs py-4"
                >
                  <Link
                    href="/client/cart"
                    onClick={() => setOpen(false)}
                  >
                    Ver carrito
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      <ConfirmDialog
        open={showConfirm}
        title="Vaciar carrito"
        message="¿Estás seguro de eliminar todos los productos del carrito?"
        confirmLabel="Sí, vaciar"
        confirmClassName="bg-foreground text-white"
        isLoading={clearCartMutation.isPending}
        onConfirm={() => {
          clearCartMutation.mutate();
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}