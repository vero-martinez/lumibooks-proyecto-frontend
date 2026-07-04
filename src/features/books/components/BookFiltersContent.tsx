/**
 * Contenido del panel de filtros (compartido entre mobile Sheet y desktop aside).
 * Renderiza: rango de precio, idioma, formato, categoría y editorial.
 * Calcula el contador de filtros activos y muestra "Limpiar todo" si aplica.
 */
import {
  BookFilters as BookFiltersType,
  BookLanguage,
  BookFormat,
} from "@/features/books/types";
import {
  useCategories,
  usePublishers,
  useBookFilters,
} from "@/features/books/hooks";
import {
  BOOK_LANGUAGES,
  BOOK_FORMATS,
  DEFAULT_PRICE_RANGE,
} from "@/features/books/constants/catalog.constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterRadioGroup } from "@/features/books/components/FilterRadioGroup";
import { toFilterOptions } from "@/features/books/utils/filters";
import { PriceRangeFilter } from "@/features/books/components/PriceRangeFilter";

interface BookFiltersContentProps {
  filters: BookFiltersType;
  onChange: (filters: BookFiltersType) => void;
}

export function BookFiltersContent({
  filters,
  onChange,
}: BookFiltersContentProps) {
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

  const activeCount = [
    filters.language,
    filters.format,
    filters.categoryId,
    filters.publisherId,
    (filters.minPrice !== undefined && filters.minPrice !== DEFAULT_PRICE_RANGE[0]) ||
    (filters.maxPrice !== undefined && filters.maxPrice !== DEFAULT_PRICE_RANGE[1]),
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-foreground">Filtros</h2>
          {activeCount > 0 && (
            <Badge
              variant="secondary"
              className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
            >
              {activeCount}
            </Badge>
          )}
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-8 px-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            Limpiar todo
          </Button>
        )}
      </div>

      <div className="bg-accent/50 rounded-xl p-4">
        <PriceRangeFilter
          value={priceRange}
          onChange={setPriceRange}
          onApply={handleApplyPrice}
        />
      </div>

      <div>
        <FilterRadioGroup
          title="Idioma"
          titleId="filter-language"
          options={BOOK_LANGUAGES}
          value={filters.language}
          onChange={(val) =>
            handleChange("language", val as BookLanguage | undefined)
          }
        />
      </div>

      <div>
        <FilterRadioGroup
          title="Formato"
          titleId="filter-format"
          options={BOOK_FORMATS}
          value={filters.format}
          onChange={(val) =>
            handleChange("format", val as BookFormat | undefined)
          }
        />
      </div>

      <div>
        <FilterRadioGroup
          title="Categoría"
          titleId="filter-category"
          options={toFilterOptions(categories)}
          value={filters.categoryId?.toString()}
          onChange={(val) =>
            handleChange("categoryId", val ? Number(val) : undefined)
          }
        />
      </div>

      <div>
        <FilterRadioGroup
          title="Editorial"
          titleId="filter-publisher"
          options={toFilterOptions(publishers)}
          value={filters.publisherId?.toString()}
          onChange={(val) =>
            handleChange("publisherId", val ? Number(val) : undefined)
          }
        />
      </div>
    </div>
  );
}