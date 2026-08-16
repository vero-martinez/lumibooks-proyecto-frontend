/**
 * Dropdown del carrito en la navbar.
 * Muestra items, total y acciones rápidas (vaciar / ver carrito).
 * Soporta carrito remoto (autenticado) y local (anónimo).
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaTimes, FaTrash } from "react-icons/fa";
import {
  useCartMiniItems,
  useRemoveFromCart,
  useClearCart,
} from "@/features/cart/hooks";
import { BookCover } from "@/components/shared/BookCover";
import { IconButton } from "@/components/shared/IconButton";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";

const MAX_BADGE = 9;

export function CartMiniDropdown() {
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { items, totalItems, total } = useCartMiniItems();
  const removeFromCart = useRemoveFromCart();
  const clearCartMutation = useClearCart();

  const handleOpenChange = (next: boolean) => {
    if (showConfirm) return;
    setOpen(next);
  };

  return (
    <div className="relative">
      <DropdownMenu open={open} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <IconButton icon={FaShoppingCart} label="Carrito" />
        </DropdownMenuTrigger>

        {totalItems > 0 && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-bold leading-none text-background ring-2 ring-background"
          >
            {totalItems > MAX_BADGE ? `${MAX_BADGE}+` : totalItems}
          </span>
        )}

        <DropdownMenuContent
          align="end"
          sideOffset={12}
          className="w-80 rounded-xl border border-border/20 p-0 shadow-xl sm:w-96"
        >
          <div className="flex items-center justify-between border-b border-border/10 px-4 py-3.5">
            <span className="text-sm font-bold text-secondary-foreground">
              Carrito ({totalItems})
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="-m-1 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent/50 hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <FaTimes size={14} />
            </button>
          </div>

          <div className="custom-scrollbar max-h-80 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
                  <FaShoppingCart
                    size={22}
                    className="text-muted-foreground/50"
                    aria-hidden="true"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-secondary-foreground">
                    Tu carrito está vacío
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Explora el catálogo y agrega tus libros favoritos.
                  </p>
                </div>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="mt-1"
                  onClick={() => setOpen(false)}
                >
                  <Link href={ROUTES.books}>Explorar libros</Link>
                </Button>
              </div>
            ) : (
              <ul className="divide-y divide-border/10">
                {items.map((item) => {
                  const subtotal = item.unitPrice * item.quantity;
                  return (
                    <li
                      key={item.bookId}
                      className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-accent/20"
                    >
                      <BookCover
                        src={item.coverImageUrl}
                        alt={item.title}
                        className="h-[60px] w-10 shrink-0 rounded-sm"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-secondary-foreground">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity}{" "}
                          {item.quantity === 1 ? "unidad" : "unidades"} ·{" "}
                          {formatPrice(item.unitPrice)}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-semibold text-secondary-foreground">
                        {formatPrice(subtotal)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeFromCart.mutate(item.bookId)}
                        disabled={removeFromCart.isPending}
                        aria-label={`Eliminar ${item.title}`}
                        className="-m-1.5 shrink-0 rounded-full p-1.5 text-destructive/70 transition-colors hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50"
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
            <div className="space-y-3 border-t border-border/10 px-4 py-3.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-foreground">Total</span>
                <span className="text-base font-bold text-secondary-foreground">
                  {formatPrice(total)}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowConfirm(true)}
                  disabled={clearCartMutation.isPending}
                  className="flex-1 py-4 text-xs"
                >
                  Vaciar carrito
                </Button>
                <Button asChild size="sm" className="flex-1 py-4 text-xs">
                  <Link
                    href={ROUTES.client.cart}
                    onClick={() => setOpen(false)}
                  >
                    Ver carrito
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={showConfirm}
        title="Vaciar carrito"
        message="¿Estás seguro de eliminar todos los productos del carrito?"
        confirmLabel="Sí, vaciar"
        confirmClassName="bg-foreground text-background"
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