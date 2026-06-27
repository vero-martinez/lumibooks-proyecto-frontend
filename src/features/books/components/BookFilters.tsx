"use client";

import { useState } from "react";

// Tipos
import {
  BookFilters as BookFiltersType,
  BookLanguage,
  BookFormat,
} from "@/features/books/types";

// Hooks
import { useCategories, usePublishers } from "@/features/books/hooks";
import { useBookFilters } from "@/features/books/hooks/useBookFilters";

// Constantes
import {
  BOOK_LANGUAGES,
  BOOK_FORMATS,
  DEFAULT_PRICE_RANGE,
  PRICE_STEP,
} from "@/features/books/constants/filters.constants";

// UI (shadcn)
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Iconos
import { IoIosCloseCircleOutline } from "react-icons/io";
import { SlidersHorizontal } from "lucide-react";

// ============================================================
// TIPOS
// ============================================================

interface BookFiltersProps {
  filters: BookFiltersType;
  onChange: (filters: BookFiltersType) => void;
}

interface FilterOption {
  value: string;
  label: string;
}

interface FilterRadioGroupProps {
  title: string;
  options: FilterOption[];
  value?: string;
  onChange: (value: string | undefined) => void;
}

interface PriceRangeFilterProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  onApply: () => void;
}

// ============================================================
// UTILS
// ============================================================

/**
 * Convierte una lista de entidades con {id, name} (categorías, editoriales)
 * al formato de opciones que espera FilterRadioGroup: {value, label}.
 */
function toFilterOptions(
  items: { id: number; name: string }[] | undefined,
): FilterOption[] {
  if (!items) return [];

  return items.map((item) => ({
    value: item.id.toString(),
    label: item.name.toUpperCase(),
  }));
}

// ============================================================
// SUBCOMPONENTES
// ============================================================

/**
 * Grupo de radio reutilizable. Permite seleccionar una opción o
 * deseleccionarla.
 */
function FilterRadioGroup({ title, options, value, onChange }: FilterRadioGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold text-secondary-foreground">{title}</h3>

      <RadioGroup value={value ?? ""} onValueChange={onChange} className="flex flex-col gap-2">
        {options.map((opt) => {
          const isSelected = value === opt.value;

          return (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem value={opt.value} id={`${title}-${opt.value}`} />

              <Label htmlFor={`${title}-${opt.value}`} className="text-sm cursor-pointer flex-1">
                {opt.label}
              </Label>

              {isSelected && (
                <button
                  type="button"
                  onClick={() => onChange(undefined)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={`Quitar filtro de ${title.toLowerCase()}`}
                >
                  <IoIosCloseCircleOutline size={20} />
                </button>
              )}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}

/**
 * Slider de rango de precio.
 */
function PriceRangeFilter({ value, onChange, onApply }: PriceRangeFilterProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-secondary-foreground">Precio</h3>
      <p className="text-sm text-muted-foreground">Selecciona un rango de precio</p>

      <Slider
        min={DEFAULT_PRICE_RANGE[0]}
        max={DEFAULT_PRICE_RANGE[1]}
        step={PRICE_STEP}
        value={value}
        onValueChange={(val) => onChange(val as [number, number])}
      />

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>S/ {value[0]}</span>
        <span>S/ {value[1]}</span>
      </div>

      <Button size="sm" onClick={onApply}>
        Aplicar filtro
      </Button>
    </div>
  );
}

// ============================================================
// CONTENIDO PRINCIPAL (compartido entre desktop y mobile)
// ============================================================

/**
 * Contenido interno de los filtros.
 * Se reutiliza tanto en desktop (sidebar) como en mobile (Sheet).
 * Toda la lógica de estado vive en el hook useBookFilters.
 */
function BookFiltersContent({ filters, onChange }: BookFiltersProps) {
  const { data: categories } = useCategories();
  const { data: publishers } = usePublishers();

  const {
    priceRange,
    setPriceRange,
    hasActiveFilters,
    handleChange,
    handleApplyPrice,
    handleClear,
  } = useBookFilters({ filters, onChange });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Badge className="bg-foreground px-5 py-4 text-md font-semibold">Filtros</Badge>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-xs text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            Limpiar todo
          </Button>
        )}
      </div>

      <PriceRangeFilter value={priceRange} onChange={setPriceRange} onApply={handleApplyPrice} />

      {/* Filtros estáticos: opciones fijas definidas en el frontend */}
      <FilterRadioGroup
        title="Idioma"
        options={BOOK_LANGUAGES}
        value={filters.language}
        onChange={(val) => handleChange("language", val as BookLanguage | undefined)}
      />

      <FilterRadioGroup
        title="Formato"
        options={BOOK_FORMATS}
        value={filters.format}
        onChange={(val) => handleChange("format", val as BookFormat | undefined)}
      />

      {/* Filtros dinámicos: opciones administrables, traídas del backend */}
      <FilterRadioGroup
        title="Categoría"
        options={toFilterOptions(categories)}
        value={filters.categoryId?.toString()}
        onChange={(val) => handleChange("categoryId", val ? Number(val) : undefined)}
      />

      <FilterRadioGroup
        title="Editorial"
        options={toFilterOptions(publishers)}
        value={filters.publisherId?.toString()}
        onChange={(val) => handleChange("publisherId", val ? Number(val) : undefined)}
      />
    </div>
  );
}

// ============================================================
// TRIGGER MÓVIL (botón "Filtrar" + Sheet)
// ============================================================

export function BookFiltersTrigger({ filters, onChange }: BookFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal size={16} />
          Filtrar
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-72 sm:max-w-72 p-0 gap-0 flex flex-col [&>button]:z-10"
        style={{ height: "100dvh", maxHeight: "100dvh" }}
      >
        <SheetHeader className="px-4 pt-4 pb-2 shrink-0">
          <SheetTitle className="sr-only">Filtros</SheetTitle>
        </SheetHeader>

        <div
          className="overflow-y-auto custom-scrollbar px-4 py-4"
          style={{
            flex: "1 1 auto",
            minHeight: 0,
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
          }}
        >
          <BookFiltersContent filters={filters} onChange={onChange} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ============================================================
// ASIDE FIJO (solo escritorio)
// ============================================================

export function BookFilters({ filters, onChange }: BookFiltersProps) {
  return (
    <aside className="hidden lg:flex w-46 xl:w-64 shrink-0 flex-col gap-6 bg-popover shadow-sm rounded-lg p-6 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto custom-scrollbar">
      <BookFiltersContent filters={filters} onChange={onChange} />
    </aside>
  );
}