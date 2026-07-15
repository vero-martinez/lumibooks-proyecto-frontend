/**
 * Dialog para seleccionar una lista de deseos.
 * Muestra la lista de wishlists disponibles como botones clickeables.
 * Soporta `disabledIds` para deshabilitar listas que ya contienen el libro.
 * El padre provee los datos, estado de carga y callbacks de selección/cancelación.
 */

import { FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { WishlistResponse } from "@/features/wishlists/types";

interface WishlistSelectDialogProps {
  open: boolean;
  title: string;
  description: React.ReactNode;
  wishlists: WishlistResponse[];
  disabledIds: number[];
  isLoading?: boolean;
  onSelect: (targetWishlistId: number) => void;
  onCancel: () => void;
}

export function WishlistSelectDialog({
  open,
  title,
  description,
  wishlists,
  disabledIds,
  isLoading = false,
  onSelect,
  onCancel,
}: WishlistSelectDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onCancel();
      }}
    >
      <DialogContent showCloseButton className="sm:max-w-sm p-4">
        <DialogHeader className="items-center gap-3 px-6 pt-6 pb-2 text-center">
          <span className="flex items-center justify-center size-16 rounded-full bg-primary/10">
            <FaHeart size={24} className="text-primary" aria-hidden="true" />
          </span>
          <DialogTitle className="text-lg">{title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 space-y-6 max-h-60 overflow-y-auto">
          {wishlists.map((wl) => {
            const isDisabled = disabledIds.includes(wl.id);
            return (
              <Button
                key={wl.id}
                variant="outline"
                size="lg"
                disabled={isLoading || isDisabled}
                onClick={() => onSelect(wl.id)}
                className="w-full justify-between px-4 py-5 bg-accent/40 hover:bg-accent/70 hover:text-foreground"
              >
                <span className="truncate">{wl.name}</span>
                <Badge variant="ghost" className="ml-2 shrink-0">
                  {isDisabled
                    ? "ya está"
                    : `${wl.itemCount} ${wl.itemCount === 1 ? "libro" : "libros"}`}
                </Badge>
              </Button>
            );
          })}
        </div>

        <div className="px-6 pb-6 pt-2">
          <Button
            onClick={onCancel}
            variant="outline"
            size="lg"
            disabled={isLoading}
            className="w-full py-5"
          >
            {isLoading ? (
              <>
                <Spinner className="mr-2 text-foreground" />
                Agregando...
              </>
            ) : (
              "Cancelar"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}