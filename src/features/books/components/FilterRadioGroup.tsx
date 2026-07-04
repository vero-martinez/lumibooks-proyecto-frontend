/**
 * Grupo de opciones tipo radio para filtros (idioma, formato, categoría, editorial).
 * Incluye botón para limpiar la selección individual y estado vacío "Sin opciones".
 */
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IoIosCloseCircleOutline } from "react-icons/io";
import type { FilterOption } from "@/features/books/utils/filters";
import { cn } from "@/lib/utils";

interface FilterRadioGroupProps {
  title: string;
  titleId: string;
  options: FilterOption[];
  value?: string;
  onChange: (value: string | undefined) => void;
}

export function FilterRadioGroup({
  title,
  titleId,
  options,
  value,
  onChange,
}: FilterRadioGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3
        id={titleId}
        className="text-sm font-semibold text-secondary-foreground"
      >
        {title}
      </h3>

      <RadioGroup
        value={value ?? ""}
        onValueChange={onChange}
        aria-labelledby={titleId}
        className="flex flex-col gap-1"
      >
        {options.length === 0 ? (
          <p className="text-xs text-muted-foreground px-3 py-2">
            Sin opciones
          </p>
        ) : (
          options.map((opt) => {
            const isSelected = value === opt.value;

            return (
              <div
                key={opt.value}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2.5 transition-all duration-150",
                  "border-l-2 border-transparent",
                  "hover:bg-accent/50",
                  isSelected && [
                    "bg-accent border-l-primary shadow-sm",
                    "hover:bg-accent hover:border-l-primary",
                  ],
                )}
              >
                <RadioGroupItem
                  value={opt.value}
                  id={`${titleId}-${opt.value}`}
                />

                <Label
                  htmlFor={`${titleId}-${opt.value}`}
                  className={cn(
                    "text-sm flex-1 leading-none cursor-pointer",
                    isSelected && "font-medium text-foreground",
                  )}
                >
                  {opt.label}
                </Label>

                {isSelected && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(undefined);
                    }}
                    className="shrink-0 text-muted-foreground hover:text-foreground hover:bg-foreground/10 rounded-full p-0.5 transition-colors"
                    aria-label={`Quitar filtro de ${title.toLowerCase()}`}
                  >
                    <IoIosCloseCircleOutline size={18} aria-hidden="true" />
                  </button>
                )}
              </div>
            );
          })
        )}
      </RadioGroup>
    </div>
  );
}