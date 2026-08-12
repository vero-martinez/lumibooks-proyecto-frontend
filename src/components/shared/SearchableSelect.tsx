"use client";

/**
 * Combobox de selección única con búsqueda.
 * Trigger con apariencia de select + popover filtrable (Popover + Command de shadcn).
 * Pensado para listas largas como departamentos, provincias y distritos.
 */
import { useMemo, useState } from "react";
import { FaSpinner, FaXmark } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export interface SearchableSelectOption {
  id: number;
  name: string;
}

interface SearchableSelectProps {
  value?: number;
  onValueChange: (id: number | undefined) => void;
  options: SearchableSelectOption[];
  placeholder?: string;
  emptyMessage?: string;
  searchPlaceholder?: string;
  clearLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  loadingMessage?: string;
  id?: string;
  invalid?: boolean;
  className?: string;
}

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}

export function SearchableSelect({
  value,
  onValueChange,
  options,
  placeholder = "Seleccionar...",
  emptyMessage = "No se encontraron resultados",
  searchPlaceholder = "Buscar...",
  clearLabel = "Limpiar selección",
  disabled = false,
  loading = false,
  loadingMessage = "Cargando...",
  id,
  invalid = false,
  className,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedOption = useMemo(
    () => options.find((option) => option.id === value),
    [options, value],
  );

  const filteredOptions = useMemo(() => {
    const query = normalize(search);
    if (!query) return options;
    return options.filter((option) => normalize(option.name).includes(query));
  }, [options, search]);

  const handleSelect = (id: number) => {
    onValueChange(id);
    setOpen(false);
  };

  const handleClear = () => {
    onValueChange(undefined);
    setSearch("");
  };

  const interactive = !disabled && !loading;
  const showClear = interactive && value !== undefined;

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) setSearch("");
      }}
    >
      <div className="relative">
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            role="combobox"
            variant="outline"
            size="lg"
            disabled={!interactive}
            aria-invalid={invalid || undefined}
            className={cn("w-full justify-between font-normal", className)}
          >
            <span className="truncate">
              {loading ? loadingMessage : selectedOption?.name ?? placeholder}
            </span>
            {loading ? (
              <FaSpinner
                className="size-4 shrink-0 animate-spin text-muted-foreground"
                aria-hidden="true"
              />
            ) : showClear ? null : (
              <IoChevronDown
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform",
                  open && "rotate-180",
                )}
                aria-hidden="true"
              />
            )}
          </Button>
        </PopoverTrigger>

        {showClear && (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={clearLabel}
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2"
          >
            <FaXmark className="size-3.5" aria-hidden="true" />
          </Button>
        )}
      </div>

      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty className="text-muted-foreground">{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.name}
                  onSelect={() => handleSelect(option.id)}
                  data-checked={option.id === value || undefined}
                  className="cursor-pointer"
                >
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}