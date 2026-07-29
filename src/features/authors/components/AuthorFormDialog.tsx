/**
 * Dialogo modal para crear o editar un autor.
 * En modo "create" usa useCreateAuthor; en "edit" usa useUpdateAuthor
 * y precarga los datos del autor existente.
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcAddImage } from "react-icons/fc";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/shared/FormField";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { XIcon } from "lucide-react";
import {
  authorCreateSchema,
  authorUpdateSchema,
} from "@/features/authors/schemas";
import type { AuthorCreateSchema } from "@/features/authors/schemas";
import type { AuthorUpdateSchema } from "@/features/authors/schemas";
import { useCreateAuthor, useUpdateAuthor } from "@/features/authors/hooks";

interface AuthorFormDialogProps {
  mode: "create" | "edit";
  authorId?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthorFormDialog({
  mode,
  authorId,
  open,
  onOpenChange,
}: AuthorFormDialogProps) {
  const isEdit = mode === "edit";

  const { mutate: createAuthor, isPending: isCreatePending } =
    useCreateAuthor();
  const {
    author,
    isLoading: isLoadingAuthor,
    updateAuthor,
    isPending: isUpdatePending,
  } = useUpdateAuthor(authorId ?? 0);

  const schema = isEdit ? authorUpdateSchema : authorCreateSchema;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<AuthorCreateSchema | AuthorUpdateSchema>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      biography: "",
      profileImage: undefined,
    },
  });

  const profileImage = watch("profileImage");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (profileImage && profileImage instanceof File) {
      const url = URL.createObjectURL(profileImage);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setImagePreview(null);
  }, [profileImage]);

  // Precargar datos en modo edit
  useEffect(() => {
    if (!isEdit || !author || !open) return;
    reset({
      firstName: author.firstName,
      lastName: author.lastName,
      biography: author.biography ?? "",
      profileImage: undefined,
    });
  }, [isEdit, author, open, reset]);

  // Resetear form al abrir en modo create
  useEffect(() => {
    if (open && !isEdit) {
      reset({
        firstName: "",
        lastName: "",
        biography: "",
        profileImage: undefined,
      });
      setImagePreview(null);
    }
  }, [open, isEdit, reset]);

  // Resetear form al cerrar
  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const onSubmit = (data: AuthorCreateSchema | AuthorUpdateSchema) => {
    if (isEdit) {
      const { profileImage: img, ...rest } = data as AuthorUpdateSchema;
      updateAuthor(
        { data: rest, profileImage: img },
        { onSuccess: () => handleClose() },
      );
    } else {
      const { profileImage: img, ...rest } = data as AuthorCreateSchema;
      createAuthor(
        { data: rest, profileImage: img },
        { onSuccess: () => handleClose() },
      );
    }
  };

  const isPending = isCreatePending || isUpdatePending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg max-h-[85vh] overflow-y-auto p-0"
        showCloseButton={false}
      >
        <div className="bg-primary text-primary-foreground px-4 sm:px-10 py-4 rounded-t-lg flex items-center justify-between">
          <DialogTitle className="text-lg">
            {isEdit ? "Editar Autor" : "Crear Autor"}
          </DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <XIcon className="size-4" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </DialogClose>
        </div>
        <div className="px-4 sm:px-10 py-6">
          {isEdit && isLoadingAuthor ? (
            <div className="flex justify-center py-8">
              <span className="text-sm text-muted-foreground">
                Cargando datos del autor...
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-5"
            >
              <FormField
                label="Nombre"
                name="firstName"
                error={errors.firstName}
                required
              >
                <Input
                  id="firstName"
                  placeholder="Nombre del autor"
                  aria-invalid={!!errors.firstName}
                  {...register("firstName")}
                />
              </FormField>

              <FormField
                label="Apellido"
                name="lastName"
                error={errors.lastName}
                required
              >
                <Input
                  id="lastName"
                  placeholder="Apellido del autor"
                  aria-invalid={!!errors.lastName}
                  {...register("lastName")}
                />
              </FormField>

              <FormField
                label="Biografía"
                name="biography"
                error={errors.biography}
              >
                <Textarea
                  id="biography"
                  rows={5}
                  placeholder="Breve biografía del autor (opcional)..."
                  aria-invalid={!!errors.biography}
                  {...register("biography")}
                />
              </FormField>

              <FormField
                label="Foto de perfil"
                name="profileImage"
                error={errors.profileImage}
              >
                <div className="space-y-2">
                  <label
                    htmlFor="profileImage"
                    className="flex items-center justify-center gap-2 w-full h-10 rounded-lg border border-input bg-transparent text-sm text-muted-foreground cursor-pointer hover:bg-accent/50 transition-colors"
                  >
                    <FcAddImage size={20} />
                    <span>Seleccionar imagen</span>
                  </label>
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    className="sr-only"
                    aria-label="Seleccionar imagen de perfil"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setValue("profileImage", file, {
                          shouldValidate: true,
                        });
                      }
                    }}
                  />
                  {profileImage &&
                    profileImage instanceof File &&
                    profileImage.name && (
                      <p className="text-[11px] text-muted-foreground truncate">
                        {profileImage.name}
                      </p>
                    )}
                  {imagePreview && (
                    <div className="flex justify-center">
                      <img
                        src={imagePreview}
                        alt="Vista previa"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    </div>
                  )}

                  {!imagePreview && isEdit && author?.profileImageUrl && (
                    <div className="flex justify-center">
                      <img
                        src={author.profileImageUrl}
                        alt="Foto actual"
                        className="w-24 h-24 rounded-full object-cover ring-2 ring-muted"
                      />
                    </div>
                  )}
                  <p className="text-[10px] text-muted-foreground">
                    JPG, PNG o WebP — máx. 5 MB — Opcional
                  </p>
                </div>
              </FormField>

              <div className="pt-2">
                <LoadingButton
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base font-semibold"
                  loading={isPending}
                  loadingText={
                    isEdit ? "Actualizando autor..." : "Creando autor..."
                  }
                >
                  {isEdit ? "Actualizar Autor" : "Crear Autor"}
                </LoadingButton>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}