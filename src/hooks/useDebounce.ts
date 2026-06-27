/**
 * Hook genérico de debounce.
 * Retrasa la actualización de un valor hasta que el usuario
 * deja de escribir durante el tiempo especificado (delay).
 * Evita hacer una petición HTTP por cada letra escrita.
 */

import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Si el valor cambia antes de que termine el delay, cancela el timer anterior
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}