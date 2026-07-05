"use client";

/**
 * Panel de filtros de libros.
 * - BookFiltersTrigger: botón "Filtrar" + Sheet lateral para mobile (< lg).
 * - BookFilters: aside sticky con scroll propio para desktop (≥ lg).
 * Ambos renderizan BookFiltersContent como hijo.
 */
import { useState } from "react";

import { BookFilters as BookFiltersType } from "@/features/books/types";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { FaSlidersH } from "react-icons/fa";
import { BookFiltersContent } from "@/features/books/components/BookFiltersContent";

interface BookFiltersProps {
  filters: BookFiltersType;
  onChange: (filters: BookFiltersType) => void;
}

export function BookFiltersTrigger({ filters, onChange }: BookFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FaSlidersH size={16} />
          Filtrar
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-72 sm:max-w-72 p-0 gap-0 flex flex-col h-dvh max-h-dvh [&>button]:z-10"
      >
        <SheetHeader className="px-4 pt-4 pb-2 shrink-0">
          <SheetTitle className="sr-only">Filtros</SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto custom-scrollbar px-4 py-4 flex-1 min-h-0 overscroll-contain [--webkit-overflow-scrolling:touch]">
          <BookFiltersContent filters={filters} onChange={onChange} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function BookFilters({ filters, onChange }: BookFiltersProps) {
  return (
    <aside className="hidden lg:flex w-48 xl:w-64 shrink-0 flex-col gap-6 bg-popover shadow-sm rounded-lg p-6 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto custom-scrollbar">
      <BookFiltersContent filters={filters} onChange={onChange} />
    </aside>
  );
}