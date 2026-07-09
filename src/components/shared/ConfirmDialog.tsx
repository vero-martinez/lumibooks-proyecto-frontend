/**
 * Diálogo de confirmación reutilizable con portal a document.body.
 * Soporta cualquier color de botón vía confirmClassName
 * e icono personalizable vía la prop icon.
 */

"use client";

import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import { FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmClassName?: string;
  icon?: ReactNode | null;
  /** Deshabilita el botón de confirmar y muestra un spinner */
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DEFAULT_ICON = (
  <FaExclamationTriangle className="size-10 text-primary mb-3" aria-hidden="true" />
);

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Eliminar",
  cancelLabel = "Cancelar",
  confirmClassName = "bg-primary text-primary-foreground",
  icon = DEFAULT_ICON,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Enfocar el diálogo al abrirse
  useEffect(() => {
    if (open) {
      dialogRef.current?.focus();
    }
  }, [open]);

  // Cerrar con tecla Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, onCancel]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        className="bg-background rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6 focus:outline-none"
      >
        <div className="flex flex-col items-center text-center mb-6">
          {icon !== null && icon}
          <h2 id="confirm-title" className="text-lg font-bold text-secondary-foreground">
            {title}
          </h2>
        </div>
        <p id="confirm-message" className="text-sm text-muted-foreground text-center mb-6">
          {message}
        </p>
        <div className="flex gap-3 justify-end">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 px-5 py-5"
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn("flex-1 px-5 py-5", confirmClassName)}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" aria-hidden="true" />
                {confirmLabel}
              </>
            ) : (
              confirmLabel
            )}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}