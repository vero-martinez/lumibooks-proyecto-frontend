/**
 * Dialog para mover un libro a otra lista de deseos.
 * Muestra la lista de wishlists disponibles como botones clickeables.
 * El padre provee los datos, estado de carga y callbacks de selección/cancelación.
 */

import { FaHeart, FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { WishlistResponse } from "@/features/wishlists/types";

interface WishlistMoveDialogProps {
  open: boolean;
  bookTitle: string;
  wishlists: WishlistResponse[];
  isLoading?: boolean;
  onSelect: (targetWishlistId: number) => void;
  onCancel: () => void;
}

export function WishlistMoveDialog({
  open,
  bookTitle,
  wishlists,
  isLoading = false,
  onSelect,
  onCancel,
}: WishlistMoveDialogProps) {
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
          <DialogTitle className="text-lg">Mover a otra lista</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Elige a qué lista quieres mover{" "}
            <span className="font-semibold text-foreground">"{bookTitle}"</span>
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 space-y-6 max-h-60 overflow-y-auto">
          {wishlists.map((wl) => (
            <Button
              key={wl.id}
              variant="outline"
              size="lg"
              disabled={isLoading}
              onClick={() => onSelect(wl.id)}
              className="w-full justify-between px-4 py-5 bg-accent/40 hover:bg-accent/70 hover:text-foreground"
            >
              <span className="flex items-center gap-2 truncate">
                {wl.name}
              </span>
              <Badge variant="ghost" className="ml-2 shrink-0">
                {wl.itemCount} {wl.itemCount === 1 ? "libro" : "libros"}
              </Badge>
            </Button>
          ))}
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
                <FaSpinner className="animate-spin mr-2" aria-hidden="true" />
                Moviendo...
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