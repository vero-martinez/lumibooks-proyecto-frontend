/**
 * Detecta clics fuera de un elemento y ejecuta un callback.
 * Útil para dropdowns, modales, etc.
 */
import { useEffect, useRef, RefObject } from "react";

interface UseClickOutsideOptions {
  eventType?: "click" | "mousedown";
  enabled?: boolean;
  checkVisibility?: boolean;
}

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void,
  options: UseClickOutsideOptions = {}
) {
  const { eventType = "mousedown", enabled = true, checkVisibility = false } = options;

  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!enabled) return;

    function handleClick(e: MouseEvent) {
      if (checkVisibility && ref.current?.offsetParent === null) return;
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callbackRef.current();
      }
    }

    document.addEventListener(eventType, handleClick);
    return () => document.removeEventListener(eventType, handleClick);
  }, [ref, eventType, enabled, checkVisibility]);
}