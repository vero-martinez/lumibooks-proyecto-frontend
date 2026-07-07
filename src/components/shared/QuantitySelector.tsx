/**
 * Selector de cantidad con botones de incremento y decremento.
 * Útil para detalle de producto, carrito de compras, etc.
 */
import { memo } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

export const QuantitySelector = memo(function QuantitySelector({
  value,
  onChange,
  min = 1,
  max,
  disabled = false,
  className,
}: QuantitySelectorProps) {
  function decrement() {
    onChange(Math.max(min, value - 1));
  }

  function increment() {
    if (max !== undefined) {
      onChange(Math.min(max, value + 1));
    } else {
      onChange(value + 1);
    }
  }

  return (
    <div
      role="group"
      aria-label="Selector de cantidad"
      aria-disabled={disabled || undefined}
      className={cn(
        "inline-flex items-center border border-primary rounded-lg overflow-hidden",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || value <= min}
        aria-label="Reducir cantidad"
        className="px-2 md:px-3 py-1.5 md:py-2 text-primary hover:bg-primary/10 disabled:opacity-40 transition-colors"
      >
        <FaMinus size={10} aria-hidden="true" />
      </button>
      <span
        aria-label={`Cantidad actual: ${value}`}
        className="w-8 md:w-10 text-center font-semibold text-base md:text-lg text-foreground border-x border-primary py-1.5 md:py-2 bg-primary/5"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={increment}
        disabled={disabled || (max !== undefined && value >= max)}
        aria-label="Aumentar cantidad"
        className="px-2 md:px-3 py-1.5 md:py-2 text-primary hover:bg-primary/10 transition-colors"
      >
        <FaPlus size={10} aria-hidden="true" />
      </button>
    </div>
  );
});