/**
 * Diálogo de confirmación reutilizable basado en shadcn Dialog.
 * Soporta cualquier color de botón vía confirmClassName
 * e icono personalizable vía la prop icon.
 */

import { ReactNode } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: ReactNode;
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
  <span className="flex items-center justify-center size-16 rounded-full bg-primary/10">
    <FaExclamationTriangle size={24} className="text-primary" aria-hidden="true" />
  </span>
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
  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onCancel(); }}>
      <DialogContent showCloseButton={false} className="sm:max-w-sm p-4">
        <DialogHeader className="items-center gap-3 px-6 pt-6 pb-2 text-center">
          {icon !== null && icon}
          <DialogTitle className="text-lg">{title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {message}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 pt-2 flex gap-3">
          <Button
            onClick={onCancel}
            variant="outline"
            size="lg"
            className="flex-1 py-5"
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            size="lg"
            className={cn("flex-1 py-5", confirmClassName)}
          >
            {isLoading ? (
              <>
                <Spinner className="mr-2" />
                {confirmLabel}
              </>
            ) : (
              confirmLabel
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}