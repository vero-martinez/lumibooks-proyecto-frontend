/**
 * Selector de ordenamiento del catálogo de libros.
 */

"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { BookSort } from "@/features/books/types";
import { BOOK_SORT_OPTIONS } from "@/features/books/constants/filters.constants";

interface BookSortSelectProps {
    value?: BookSort;
    onChange: (value?: BookSort) => void;
}

export function BookSortSelect({ value, onChange }: BookSortSelectProps) {
    return (
        <Select
            value={value ?? "none"}
            onValueChange={(val) =>
                onChange(val === "none" ? undefined : (val as BookSort))
            }
        >
            <SelectTrigger className="w-40 bg-accent font-semibold">
                <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="none">Ordenar por</SelectItem>

                {BOOK_SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}