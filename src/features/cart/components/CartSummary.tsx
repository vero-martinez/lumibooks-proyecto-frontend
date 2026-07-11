/**
 * Resumen de compra con subtotal, total y botones de acción.
 */
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";

interface CartSummaryProps {
  subtotal: number;
  total: number;
}

export function CartSummary({ subtotal, total }: CartSummaryProps) {
  return (
    <Card className="shadow-sm rounded-lg ring-0 border border-border/60 [--card-spacing:--spacing(6)] bg-card/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-foreground font-bold">
          <span className="w-1 h-5 bg-primary rounded-full" />
          Resumen de compra
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-secondary-foreground/70">Subtotal</span>
          <span className="font-semibold text-secondary-foreground">{formatPrice(subtotal)}</span>
        </div>

        <Separator className="bg-border/40" />

        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-base text-secondary-foreground">Total</span>
          <span className="font-bold text-xl text-foreground">{formatPrice(total)}</span>
        </div>

        <Button type="button" className="w-full gap-2 py-6 text-lg mb-4" size="lg">
          <FaShoppingCart className="size-6" aria-hidden="true" />
          Finalizar Compra
        </Button>

        <Link
          href="/books"
          className="flex items-center justify-center gap-1.5 text-sm text-foreground underline underline-offset-2 transition-opacity hover:opacity-80"
        >
          <FaArrowLeft className="size-3" aria-hidden="true" />
          Seguir comprando
        </Link>
      </CardContent>
    </Card>
  );
}