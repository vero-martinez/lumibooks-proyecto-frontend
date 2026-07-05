/**
 * useBookFilters
 *
 * Centraliza el estado y las acciones de los filtros del catálogo de libros:
 * precio, categoría, idioma, formato y editorial.
 *
 * No conoce de dónde vienen los filtros ni a dónde se persisten (URL, estado
 * local, etc.) — solo recibe el valor actual y notifica cambios vía onChange.
 *
 * Importante: el slider de precio usa estado local. No notifica al padre hasta
 * que el usuario presiona "Aplicar filtro", evitando re-renders innecesarios
 * mientras se arrastra el slider.
 */

import { useState, useEffect, useCallback } from "react";
import { BookFilters as BookFiltersType } from "@/features/books/types";
import { DEFAULT_PRICE_RANGE } from "@/features/books/constants/catalog.constants";

/** Parámetros del hook: filtros actuales + callback para notificar cambios. */
interface UseBookFiltersParams {
    filters: BookFiltersType;
    onChange: (filters: BookFiltersType) => void;
}

/** Deriva el rango del slider desde los filtros, usando default si no hay precio definido. */
function getPriceRangeFromFilters(filters: BookFiltersType): [number, number] {
    return [
        filters.minPrice ?? DEFAULT_PRICE_RANGE[0],
        filters.maxPrice ?? DEFAULT_PRICE_RANGE[1],
    ];
}

export function useBookFilters({ filters, onChange }: UseBookFiltersParams) {

    const [priceRange, setPriceRange] = useState<[number, number]>(() =>
        getPriceRangeFromFilters(filters),
    );

    useEffect(() => {
        setPriceRange(getPriceRangeFromFilters(filters));
    }, [filters.minPrice, filters.maxPrice]);

    const hasActiveFilters =
        !!filters.categoryId ||
        !!filters.language ||
        !!filters.format ||
        !!filters.publisherId ||
        (filters.minPrice !== undefined && filters.minPrice !== DEFAULT_PRICE_RANGE[0]) ||
        (filters.maxPrice !== undefined && filters.maxPrice !== DEFAULT_PRICE_RANGE[1]);

    /** Actualiza un filtro específico y resetea la paginación. */
    const handleChange = useCallback((key: keyof BookFiltersType, value: unknown) => {
        onChange({ ...filters, [key]: value, page: 0 });
    }, [filters, onChange]);

    /** Aplica el rango de precio del slider al padre y resetea la paginación. */
    const handleApplyPrice = useCallback(() => {
        onChange({ ...filters, minPrice: priceRange[0], maxPrice: priceRange[1], page: 0 });
    }, [filters, priceRange, onChange]);

    /** Limpia todos los filtros y resetea el slider al valor por defecto. */
    const handleClear = useCallback(() => {
        setPriceRange(DEFAULT_PRICE_RANGE);
        onChange({});
    }, [onChange]);

    return {
        priceRange,
        setPriceRange,
        hasActiveFilters,
        handleChange,
        handleApplyPrice,
        handleClear,
    };
}