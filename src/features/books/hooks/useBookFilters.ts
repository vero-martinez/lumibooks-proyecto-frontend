/**
 * useBookFilters
 * Centraliza el estado y las acciones de los filtros del catálogo de libros:
 * precio, categoría, idioma, formato y editorial.
 *
 * No conoce de dónde vienen los filtros ni a dónde se persisten (URL, estado
 * local, etc.) — solo recibe el valor actual y notifica cambios vía onChange.
 */

import { useState, useEffect } from "react";
import { BookFilters as BookFiltersType } from "@/features/books/types";
import { DEFAULT_PRICE_RANGE } from "@/features/books/constants/filters.constants";

/**
 * Parámetros del hook.
 * - filters: estado actual de los filtros, controlado por el componente padre.
 * - onChange: notifica al padre cuando el usuario modifica algún filtro.
 */
interface UseBookFiltersParams {
    filters: BookFiltersType;
    onChange: (filters: BookFiltersType) => void;
}

/**
 * Deriva el rango de precio del slider a partir de los filtros actuales,
 * aplicando los valores por defecto cuando no hay precio definido.
 */
function getPriceRangeFromFilters(filters: BookFiltersType): [number, number] {
    return [
        filters.minPrice ?? DEFAULT_PRICE_RANGE[0],
        filters.maxPrice ?? DEFAULT_PRICE_RANGE[1],
    ];
}

export function useBookFilters({ filters, onChange }: UseBookFiltersParams) {

    // Estado local del slider de precio.
    // Se mantiene aislado del resto de los filtros porque solo debe
    // notificarse al padre cuando el usuario presiona "Aplicar filtro",
    // no en cada movimiento del slider.
    const [priceRange, setPriceRange] = useState<[number, number]>(() =>
        getPriceRangeFromFilters(filters),
    );

    // Reconcilia el slider si los filtros de precio cambian desde afuera
    // (ej. al limpiar todo, o si los filtros llegan sincronizados desde la URL).
    useEffect(() => {
        setPriceRange(getPriceRangeFromFilters(filters));
    }, [filters.minPrice, filters.maxPrice]);

    // True si hay algún filtro de este sidebar activo (no considera "search",
    // ya que búsqueda y filtros son conceptos separados en la UI).
    const hasActiveFilters =
        !!filters.categoryId ||
        !!filters.language ||
        !!filters.format ||
        !!filters.publisherId ||
        (filters.minPrice !== undefined && filters.minPrice !== DEFAULT_PRICE_RANGE[0]) ||
        (filters.maxPrice !== undefined && filters.maxPrice !== DEFAULT_PRICE_RANGE[1]);

    // Actualiza un único filtro (categoría, idioma, formato o editorial)
    // y reinicia la paginación, ya que el set de resultados cambia.
    const handleChange = (key: keyof BookFiltersType, value: unknown) => {
        onChange({ ...filters, [key]: value, page: 0 });
    };

    // Confirma el rango de precio seleccionado en el slider.
    // Es la única acción de precio que llega a notificarse al padre.
    const handleApplyPrice = () => {
        onChange({ ...filters, minPrice: priceRange[0], maxPrice: priceRange[1], page: 0 });
    };

    // Restablece el slider a su rango por defecto y limpia todos los filtros
    // del sidebar (no afecta la búsqueda activa, si hubiera una).
    const handleClear = () => {
        setPriceRange(DEFAULT_PRICE_RANGE);
        onChange({});
    };

    return {
        priceRange,
        setPriceRange,
        hasActiveFilters,
        handleChange,
        handleApplyPrice,
        handleClear,
    };
}