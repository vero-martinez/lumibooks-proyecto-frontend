/**
 * Resumen de la orden en el checkout.
 */
import { BookCover } from "@/components/shared/BookCover";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { CHECKOUT_SUMMARY } from "@/features/orders/constants";
import type { OrderItemResponse } from "@/features/orders/types";

interface CheckoutSummaryProps {
  items: OrderItemResponse[];
  subtotal: number;
  shippingCost: number | null;
  isShippingAvailable: boolean;
  total: number;
  children?: React.ReactNode;
}

/** Fila de precio reutilizable (subtotal, envío) */
function SummaryRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-secondary-foreground">{label}</span>
      {children}
    </div>
  );
}

/** Item mini en la lista de productos */
function SummaryItem({ item }: { item: OrderItemResponse }) {
  return (
    <li className="flex items-center gap-3">
      <BookCover
        src={item.coverImageUrl}
        alt={item.title}
        className="h-[60px] w-10 shrink-0 rounded-sm"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          {item.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {CHECKOUT_SUMMARY.quantityLabel} {item.quantity}
        </p>
      </div>
      <span className="shrink-0 text-sm font-medium text-secondary-foreground">
        {formatPrice(item.subtotal)}
      </span>
    </li>
  );
}

export function CheckoutSummary({
  items,
  subtotal,
  shippingCost,
  isShippingAvailable,
  total,
  children,
}: CheckoutSummaryProps) {
  return (
    <Card className="shadow-xl rounded-lg ring-0 border border-border/50 px-6 py-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl text-foreground font-bold">
          <span className="flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded-full" />
            {CHECKOUT_SUMMARY.title}
          </span>
          <span className="text-xs font-normal text-muted-foreground">
            {items.length === 1
              ? CHECKOUT_SUMMARY.singleProduct
              : CHECKOUT_SUMMARY.multipleProducts(items.length)}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">
        {/* Lista mini de items */}
        <ul className="space-y-4" aria-label="Productos en el pedido">
          {items.map((item) => (
            <SummaryItem key={item.bookId} item={item} />
          ))}
        </ul>

        <Separator className="bg-border/40" />

        {/* Subtotal */}
        <SummaryRow label={CHECKOUT_SUMMARY.subtotal}>
          <span className="font-semibold text-secondary-foreground">
            {formatPrice(subtotal)}
          </span>
        </SummaryRow>

        {/* Envío */}
        <SummaryRow label={CHECKOUT_SUMMARY.shipping}>
          {isShippingAvailable && shippingCost !== null ? (
            <span className="font-semibold text-secondary-foreground">
              {formatPrice(shippingCost)}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground text-right max-w-[160px]">
              {CHECKOUT_SUMMARY.shippingNotAvailable}
            </span>
          )}
        </SummaryRow>

        <Separator className="bg-border/40" />

        {/* Total */}
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-base text-secondary-foreground">
            {CHECKOUT_SUMMARY.total}
          </span>
          <span className="font-bold text-xl text-foreground">
            {isShippingAvailable
              ? formatPrice(total)
              : CHECKOUT_SUMMARY.totalDash}
          </span>
        </div>

        {children}
      </CardContent>
    </Card>
  );
}