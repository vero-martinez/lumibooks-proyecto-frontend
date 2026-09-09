/**
 * Barra de filtros para la tabla de administración de pedidos.
 * Buscador + filtro de estado + rango de fechas (shadcn Calendar).
 */
"use client";

import { useState } from "react";
import { FaCalendarAlt, FaChevronDown, FaTimes } from "react-icons/fa";
import type { DateRange } from "react-day-picker";
import { SearchBar } from "@/components/shared/SearchBar";
import { SortSelect } from "@/components/shared/SortSelect";
import { ClearSearchButton } from "@/components/shared/ClearSearchButton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  ORDER_FILTER_OPTIONS,
  ADMIN_ORDER_SORT_OPTIONS,
  ADMIN_ORDERS,
} from "@/features/orders/constants";
import type { AdminOrderFilters, OrderStatus } from "@/features/orders/types";

interface AdminOrderFiltersBarProps {
  filters: AdminOrderFilters;
  updateFilters: (filters: AdminOrderFilters) => void;
  onClear: () => void;
}

/** yyyy-MM-dd <-> Date, sin librerías externas */
function parseDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toDateParam(date?: Date): string | undefined {
  if (!date) return undefined;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatShort(date?: Date): string {
  if (!date) return "";
  return date.toLocaleDateString("es-PE", { day: "2-digit", month: "short" });
}

/** Presets rápidos de rango */
function daysAgo(n: number): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - n);
  return d;
}

const PRESETS: { label: string; range: () => DateRange }[] = [
  { label: "Hoy", range: () => ({ from: daysAgo(0), to: daysAgo(0) }) },
  {
    label: "Últimos 7 días",
    range: () => ({ from: daysAgo(6), to: daysAgo(0) }),
  },
  {
    label: "Últimos 30 días",
    range: () => ({ from: daysAgo(29), to: daysAgo(0) }),
  },
  {
    label: "Este mes",
    range: () => {
      const now = new Date();
      return {
        from: new Date(now.getFullYear(), now.getMonth(), 1),
        to: daysAgo(0),
      };
    },
  },
];

export function AdminOrderFiltersBar({
  filters,
  updateFilters,
  onClear,
}: AdminOrderFiltersBarProps) {
  const [searchInput, setSearchInput] = useState(filters.search ?? "");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const dateRange: DateRange | undefined = {
    from: parseDate(filters.dateFrom),
    to: parseDate(filters.dateTo),
  };

  const hasActiveFilters =
    filters.search || filters.status || filters.dateFrom || filters.dateTo;

  const handleSearch = () => {
    updateFilters({ search: searchInput || undefined });
  };

  const handleClear = () => {
    setSearchInput("");
    onClear();
  };

  const handleRangeSelect = (range: DateRange | undefined) => {
    updateFilters({
      dateFrom: toDateParam(range?.from),
      dateTo: toDateParam(range?.to),
    });
  };

  const handlePreset = (range: DateRange) => {
    updateFilters({
      dateFrom: toDateParam(range.from),
      dateTo: toDateParam(range.to),
    });
  };

  const handleClearDates = () => {
    updateFilters({ dateFrom: undefined, dateTo: undefined });
  };

  const dateLabel =
    dateRange.from && dateRange.to
      ? `${formatShort(dateRange.from)} — ${formatShort(dateRange.to)}`
      : dateRange.from
        ? `Desde ${formatShort(dateRange.from)}`
        : (ADMIN_ORDERS.dateRangeLabel ?? "Rango de fechas");

  const hasDateRange = !!dateRange.from;

  const SELECT_CLASS =
    "min-w-0 sm:min-w-[160px] w-full sm:w-auto bg-card hover:bg-muted border border-input";

  return (
    <div className="flex flex-col gap-3">
      <div className="w-full lg:w-1/2">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onSubmit={handleSearch}
          placeholder={ADMIN_ORDERS.searchPlaceholder}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SortSelect
          value={filters.status}
          onChange={(val) =>
            updateFilters({ status: val as OrderStatus | undefined })
          }
          options={ORDER_FILTER_OPTIONS.filter((o) => o.value !== "").map(
            (o) => ({ value: o.value, label: o.label }),
          )}
          placeholder="Todos los estados"
          ariaLabel="Filtrar por estado"
          className={SELECT_CLASS}
        />

        <SortSelect
          value={filters.sort}
          onChange={(sort) => updateFilters({ sort })}
          placeholder="Ordenar por"
          ariaLabel="Ordenar por"
          className={SELECT_CLASS}
          options={[...ADMIN_ORDER_SORT_OPTIONS]}
          allowNone={false}
        />

        {/* Rango de fechas con shadcn Calendar */}
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-9 min-w-0 sm:min-w-[220px] w-full sm:w-auto justify-start gap-2.5 rounded-xl border-border/20 shadow-sm bg-card hover:bg-muted font-normal text-sm",
                hasDateRange && "border-primary/40 bg-primary/5",
              )}
            >
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full",
                  hasDateRange
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <FaCalendarAlt className="size-3" aria-hidden="true" />
              </span>
              <span
                className={cn(
                  "flex-1 text-left truncate",
                  hasDateRange
                    ? "text-foreground font-medium"
                    : "text-muted-foreground",
                )}
              >
                {dateLabel}
              </span>
              <FaChevronDown
                className="size-2.5 text-muted-foreground/60 shrink-0"
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto rounded-2xl border border-border/20 shadow-md p-0 overflow-hidden"
            align="start"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Presets rápidos */}
              <div className="flex sm:flex-col gap-1 p-3 border-b sm:border-b-0 sm:border-r border-border/20 sm:w-40 overflow-x-auto">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handlePreset(preset.range())}
                    className="shrink-0 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg px-3 py-2 transition-colors whitespace-nowrap"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <div>
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handleRangeSelect}
                  numberOfMonths={2}
                  defaultMonth={dateRange.from}
                  className="p-3"
                  classNames={{
                    caption_label: "text-sm font-semibold text-foreground",
                    weekday: "text-muted-foreground text-[11px] font-medium",
                    today:
                      "rounded-(--cell-radius) bg-primary/10 text-primary font-semibold",
                    range_middle: "bg-primary/10",
                  }}
                />

                {hasDateRange && (
                  <div className="flex items-center justify-between px-4 pb-3 pt-1 border-t border-border/20">
                    <span className="text-xs text-muted-foreground">
                      {dateLabel}
                    </span>
                    <button
                      type="button"
                      onClick={handleClearDates}
                      className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <FaTimes className="size-2.5" aria-hidden="true" />
                      Limpiar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {hasActiveFilters && (
          <ClearSearchButton onClick={handleClear} label="Limpiar filtros" />
        )}
      </div>
    </div>
  );
}