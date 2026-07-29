/**
 * Dialogo modal para crear o editar una categoría.
 * En modo "create" usa useCreateCategory; en "edit" usa useUpdateCategory
 * y precarga el nombre de la categoría existente.
 */
"use client";

import { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/shared/FormField";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { XIcon } from "lucide-react";
import { categorySchema } from "@/features/categories/schemas";
import type { CategorySchema } from "@/features/categories/schemas";
import type { CategorySummary } from "@/features/categories/types";
import { useCreateCategory, useUpdateCategory } from "@/features/categories/hooks";
import { FcFolder } from "react-icons/fc";

interface CategoryFormDialogProps {
    mode: "create" | "edit";
    category?: CategorySummary;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CategoryFormDialog({
    mode,
    category,
    open,
    onOpenChange,
}: CategoryFormDialogProps) {
    const isEdit = mode === "edit";

    const { mutate: createCategory, isPending: isCreatePending } =
        useCreateCategory();
    const { mutate: updateCategory, isPending: isUpdatePending } =
        useUpdateCategory(category?.id ?? 0);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CategorySchema>({
        resolver: zodResolver(categorySchema),
        mode: "onSubmit",
        defaultValues: { name: "" },
    });

    // Precargar datos en modo edit
    useEffect(() => {
        if (!isEdit || !category || !open) return;
        reset({ name: category.name });
    }, [isEdit, category, open, reset]);

    // Resetear form al abrir en modo create
    useEffect(() => {
        if (open && !isEdit) {
            reset({ name: "" });
        }
    }, [open, isEdit, reset]);

    const handleClose = useCallback(() => {
        onOpenChange(false);
    }, [onOpenChange]);

    const onSubmit = (data: CategorySchema) => {
        if (isEdit) {
            updateCategory(data, { onSuccess: () => handleClose() });
        } else {
            createCategory(data, { onSuccess: () => handleClose() });
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
                        {isEdit ? "Editar Categoría" : "Crear Categoría"}
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
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        className="space-y-5"
                    >
                        <div className="flex flex-col items-center gap-2 mb-2">
                            <FcFolder size={64} aria-hidden="true" />
                        </div>
                        <FormField
                            label="Nombre"
                            name="name"
                            error={errors.name}
                            required
                        >
                            <Input
                                id="name"
                                placeholder="Nombre de la categoría"
                                aria-invalid={!!errors.name}
                                {...register("name")}
                            />
                        </FormField>

                        <div className="pt-2">
                            <LoadingButton
                                type="submit"
                                size="lg"
                                className="w-full h-12 text-base font-semibold"
                                loading={isPending}
                                loadingText={
                                    isEdit ? "Actualizando categoría..." : "Creando categoría..."
                                }
                            >
                                {isEdit ? "Actualizar Categoría" : "Crear Categoría"}
                            </LoadingButton>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}