/**
 * Filtro de rango de precio con slider dual.
 * Muestra los valores mínimo y máximo seleccionados y un botón "Aplicar".
 */
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  DEFAULT_PRICE_RANGE,
  PRICE_STEP,
} from "@/features/books/constants/catalog.constants";
import { formatPrice } from "@/lib/utils";

interface PriceRangeFilterProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  onApply: () => void;
}

export function PriceRangeFilter({
  value,
  onChange,
  onApply,
}: PriceRangeFilterProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold text-secondary-foreground">
          Precio
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Selecciona un rango de precio
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <span className="flex-1 max-w-[90px] text-xs font-medium text-foreground bg-secondary rounded-md px-2 py-1.5 text-center whitespace-nowrap">
          {formatPrice(value[0], 0)}
        </span>
        <span className="text-xs text-muted-foreground shrink-0">—</span>
        <span className="flex-1 max-w-[90px] text-xs font-medium text-foreground bg-secondary rounded-md px-2 py-1.5 text-center whitespace-nowrap">
          {formatPrice(value[1], 0)}
        </span>
      </div>

      <Slider
        aria-label="Rango de precio"
        min={DEFAULT_PRICE_RANGE[0]}
        max={DEFAULT_PRICE_RANGE[1]}
        step={PRICE_STEP}
        value={value}
        onValueChange={(val) => onChange(val as [number, number])}
      />

      <Button size="sm" onClick={onApply} className="w-full">
        Aplicar filtro
      </Button>
    </div>
  );
}