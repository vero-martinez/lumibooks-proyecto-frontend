/**
 * Diálogo que indica al usuario que debe iniciar sesión.
 * Muestra un botón con link a /login y un botón de cancelar.
 */
import NextLink from "next/link";
import { FaLock } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface AuthRequiredDialogProps {
  open: boolean;
  onCancel: () => void;
}

export function AuthRequiredDialog({ open, onCancel }: AuthRequiredDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onCancel(); }}>
      <DialogContent showCloseButton={false} className="sm:max-w-sm p-4">
        <DialogHeader className="items-center gap-3 px-6 pt-6 pb-2 text-center">
          <span className="flex items-center justify-center size-16 rounded-full bg-primary/10">
            <FaLock size={24} className="text-primary" aria-hidden="true" />
          </span>
          <DialogTitle className="text-lg">Inicia sesión</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Debes iniciar sesión para agregar libros a tus listas.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 pt-2 flex gap-3">
          <Button
            onClick={onCancel}
            variant="outline"
            size="lg"
            className="flex-1 py-5"
          >
            Cancelar
          </Button>
          <Button asChild size="lg" className="flex-1 py-5">
            <NextLink href="/login">Iniciar sesión</NextLink>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}