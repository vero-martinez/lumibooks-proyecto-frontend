"use client";

/**
 * Modal de formulario para crear o renombrar una lista de deseos.
 * Recibe el estado de apertura y los callbacks del padre.
 * Utiliza react-hook-form + Zod para validación local del nombre.
 */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaHeart, FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormField } from "@/components/shared/FormField";
import { wishlistNameSchema, WishlistNameSchema } from "@/features/wishlists/schemas";

interface WishlistNameDialogProps {
  open: boolean;
  title: string;
  initialName?: string;
  isLoading?: boolean;
  onSubmit: (name: string) => void;
  onClose: () => void;
}

export function WishlistNameDialog({
  open,
  title,
  initialName = "",
  isLoading = false,
  onSubmit,
  onClose,
}: WishlistNameDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WishlistNameSchema>({
    resolver: zodResolver(wishlistNameSchema),
    defaultValues: { name: initialName },
  });

  useEffect(() => {
    if (open) {
      reset({ name: initialName });
    }
  }, [open, initialName, reset]);

  const handleFormSubmit = (data: WishlistNameSchema) => {
    onSubmit(data.name.trim());
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent showCloseButton className="sm:max-w-sm p-4">
        <DialogHeader className="items-center gap-3 px-6 pt-6 pb-2 text-center">
          <span className="flex items-center justify-center size-16 rounded-full bg-primary/10">
            <FaHeart size={24} className="text-primary" aria-hidden="true" />
          </span>
          <DialogTitle className="text-lg">{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="px-6 pb-6 pt-2 space-y-5" noValidate>
          <FormField
            label="Nombre"
            name="name"
            error={errors.name}
            required
          >
            <Input
              id="name"
              placeholder="Ej: Lecturas favoritas"
              {...register("name")}
            />
          </FormField>

          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              size="lg"
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" aria-hidden="true" />
                  Guardando
                </>
              ) : (
                "Guardar"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}