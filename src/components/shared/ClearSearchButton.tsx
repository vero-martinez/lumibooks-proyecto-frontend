/**
 * Botón para limpiar/remover el filtro de búsqueda activo.
 * Muestra un ícono de X seguido de una etiqueta textual.
 * Se oculta cuando no hay búsqueda activa (el padre controla su visibilidad).
 */
"use client";

import { IoClose } from "react-icons/io5";

interface ClearSearchButtonProps {
  onClick: () => void;
  /** Texto del botón. Default: "Quitar búsqueda" */
  label?: string;
}

export function ClearSearchButton({
  onClick,
  label = "Quitar búsqueda",
}: ClearSearchButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1 text-sm text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
      aria-label={label}
    >
      <IoClose size={14} aria-hidden="true" />
      {label}
    </button>
  );
}