/**
 * Selector genérico de búsqueda con selección múltiple.
 * Muestra un input con popover de opciones filtrables y badges
 * con los elementos seleccionados.
 *
 * Soporta búsqueda server-side (via onSearch) y filtrado
 * client-side simultáneamente.
 */
"use client";

import { useState, useMemo, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";

interface MultiSelectSearchProps<T extends { id: number }> {
  items: T[];
  selectedIds: number[];
  onToggle: (item: T) => void;
  onSearch: (query: string) => void;
  getItemLabel: (item: T) => string;
  placeholder?: string;
  emptyMessage?: string;
}

export function MultiSelectSearch<T extends { id: number }>({
  items,
  selectedIds,
  onToggle,
  onSearch,
  getItemLabel,
  placeholder = "Seleccionar...",
  emptyMessage = "No se encontraron resultados",
}: MultiSelectSearchProps<T>) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedItems = useMemo(
    () => items.filter((i) => selectedIds.includes(i.id)),
    [items, selectedIds],
  );

  const filteredItems = useMemo(() => {
    const q = search.toLowerCase();
    return items
      .filter((i) => !selectedIds.includes(i.id))
      .filter((i) => getItemLabel(i).toLowerCase().includes(q));
  }, [items, selectedIds, search, getItemLabel]);

  const resetSearch = () => {
    setSearch("");
    inputRef.current?.focus();
  };

  const handleToggle = (item: T) => {
    onToggle(item);
    resetSearch();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
    if (!open) setOpen(true);
  };

  const handleClear = () => {
    onSearch("");
    resetSearch();
  };

  return (
    <div className="space-y-2">
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedItems.map((item) => (
            <Badge key={item.id} variant="secondary" className="gap-1 pr-1">
              {getItemLabel(item)}
              <button
                type="button"
                onClick={() => onToggle(item)}
                aria-label={`Quitar ${getItemLabel(item)}`}
                className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20"
              >
                <FaTimes className="size-2.5" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={search}
              onChange={handleInputChange}
              aria-label={placeholder}
              className="pr-9"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={search ? "Limpiar búsqueda" : "Abrir opciones"}
              onClick={(e) => {
                e.stopPropagation();
                search ? handleClear() : setOpen((prev) => !prev);
              }}
              className="absolute right-1.5 top-1/2 -translate-y-1/2"
            >
              {search ? (
                <FaTimes className="size-4 text-muted-foreground" />
              ) : (
                <IoChevronDown className="size-4" />
              )}
            </Button>
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="p-0 w-[var(--radix-popover-trigger-width)]"
          align="start"
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
        >
          <Command shouldFilter={false}>
            <CommandList>
              <CommandEmpty className="text-muted-foreground">
                {emptyMessage}
              </CommandEmpty>
              <CommandGroup>
                {filteredItems.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => handleToggle(item)}
                    className="cursor-pointer"
                  >
                    {getItemLabel(item)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}