/**
 * Dialogo modal para crear o editar una editorial.
 * En modo "create" usa useCreatePublisher; en "edit" usa useUpdatePublisher
 * y precarga el nombre de la editorial existente.
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
import { publisherSchema } from "@/features/publishers/schemas";
import type { PublisherSchema } from "@/features/publishers/schemas";
import type { PublisherSummary } from "@/features/publishers/types";
import { useCreatePublisher, useUpdatePublisher } from "@/features/publishers/hooks";
import { FcLibrary } from "react-icons/fc";

interface PublisherFormDialogProps {
    mode: "create" | "edit";
    publisher?: PublisherSummary;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PublisherFormDialog({
    mode,
    publisher,
    open,
    onOpenChange,
}: PublisherFormDialogProps) {
    const isEdit = mode === "edit";

    const { mutate: createPublisher, isPending: isCreatePending } = useCreatePublisher();
    const { mutate: updatePublisher, isPending: isUpdatePending } = useUpdatePublisher(publisher?.id ?? 0);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PublisherSchema>({
        resolver: zodResolver(publisherSchema),
        mode: "onSubmit",
        defaultValues: { name: "" },
    });

    // Precargar datos en modo edit
    useEffect(() => {
        if (!isEdit || !publisher || !open) return;
        reset({ name: publisher.name });
    }, [isEdit, publisher, open, reset]);

    // Resetear form al abrir en modo create
    useEffect(() => {
        if (open && !isEdit) {
            reset({ name: "" });
        }
    }, [open, isEdit, reset]);

    const handleClose = useCallback(() => {
        onOpenChange(false);
    }, [onOpenChange]);

    const onSubmit = (data: PublisherSchema) => {
        if (isEdit) {
            updatePublisher(data, { onSuccess: () => handleClose() });
        } else {
            createPublisher(data, { onSuccess: () => handleClose() });
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
                        {isEdit ? "Editar Editorial" : "Crear Editorial"}
                    </DialogTitle>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon-sm" className="text-primary-foreground hover:bg-primary-foreground/20">
                            <XIcon className="size-4" />
                            <span className="sr-only">Cerrar</span>
                        </Button>
                    </DialogClose>
                </div>
                <div className="px-4 sm:px-10 py-6">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                        <div className="flex flex-col items-center gap-2 mb-2">
                            <FcLibrary size={64} aria-hidden="true" />
                        </div>
                        <FormField label="Nombre" name="name" error={errors.name} required>
                            <Input
                                id="name"
                                placeholder="Nombre de la editorial"
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
                                loadingText={isEdit ? "Actualizando editorial..." : "Creando editorial..."}
                            >
                                {isEdit ? "Actualizar Editorial" : "Crear Editorial"}
                            </LoadingButton>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}