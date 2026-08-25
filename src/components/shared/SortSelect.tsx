/**
 * Selector de ordenamiento reutilizable.
 * Wrapper sobre shadcn Select que maneja el valor "none" ↔ undefined.
 */
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SortOption {
    value: string;
    label: string;
}

interface SortSelectProps {
    /** Valor actual (undefined = "none" = sin orden) */
    value?: string;
    /** Recibe el valor seleccionado o undefined si se eligió "none" */
    onChange: (value?: string) => void;
    options: SortOption[];
    placeholder?: string;
    /** aria-label del trigger */
    ariaLabel?: string;
    className?: string;
    /** Si es false, oculta la opción "none" (placeholder) del dropdown */
    allowNone?: boolean;
}

export function SortSelect({
    value,
    onChange,
    options,
    placeholder = "Ordenar por",
    ariaLabel = "Ordenar por",
    className,
    allowNone = true,
}: SortSelectProps) {
    return (
        <Select
            value={value ?? "none"}
            onValueChange={(val) => onChange(val === "none" ? undefined : val)}
        >
            <SelectTrigger
                className={cn(
                    "min-w-[180px] bg-accent font-medium hover:bg-accent/80 transition-colors cursor-pointer",
                    className,
                )}
                aria-label={ariaLabel}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent className="min-w-[var(--radix-select-trigger-width)] shadow-xl">
                {allowNone && (
                    <SelectItem value="none" className="text-muted-foreground">
                        {placeholder}
                    </SelectItem>
                )}

                {options.map((opt) => (
                    <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="cursor-pointer"
                    >
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}