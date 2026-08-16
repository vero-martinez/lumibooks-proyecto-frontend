"use client";

/**
 * Formulario de cambio de contraseña.
 *
 * Pide la contraseña actual, la nueva contraseña y su confirmación.
 * Valida con el schema de la feature y persiste los cambios mediante
 * useChangePassword (que al terminar cierra la sesión y redirige al login).
 *
 */
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaKey, FaLock, FaPen } from "react-icons/fa";

import {
    changePasswordSchema,
    type ChangePasswordSchema,
} from "@/features/password/schemas";
import { useChangePassword } from "@/features/password/hooks";
import { CHANGE_PASSWORD_FORM } from "@/features/password/constants";

import { FormField } from "@/components/shared/FormField";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ChangePasswordForm() {
    const titleId = useId();
    const [isEditing, setIsEditing] = useState(false);
    const { mutate: changePassword, isPending } = useChangePassword();

    const {
        register,
        handleSubmit,
        reset,
        setFocus,
        formState: { errors },
    } = useForm<ChangePasswordSchema>({
        resolver: zodResolver(changePasswordSchema),
        mode: "onBlur",
    });

    // Al entrar en modo edición, enfoca el primer campo.
    // El efecto corre después del re-render, cuando el campo ya está habilitado.
    useEffect(() => {
        if (isEditing) {
            setFocus("currentPassword");
        }
    }, [isEditing, setFocus]);

    const onSubmit = (data: ChangePasswordSchema) => {
        changePassword({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        });
    };

    // Sale del modo edición sin guardar y limpia lo escrito.
    const handleCancel = () => {
        setIsEditing(false);
        reset();
    };

    const disabled = !isEditing;

    return (
        <section aria-labelledby={titleId}>
            <Card className="gap-0 bg-transparent py-0 rounded-2xl border border-border/20 shadow-sm overflow-hidden ring-0">
                <CardHeader className="px-8 py-8">
                    <CardTitle
                        id={titleId}
                        className="flex items-center gap-3 text-2xl font-semibold"
                    >
                        <FaKey className="text-primary" aria-hidden="true" />
                        {CHANGE_PASSWORD_FORM.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                        {CHANGE_PASSWORD_FORM.description}
                    </CardDescription>
                </CardHeader>

                <div className="h-px bg-border/20" />

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <CardContent className="px-8 py-8 space-y-5">
                        <FormField
                            label={CHANGE_PASSWORD_FORM.currentPasswordLabel}
                            name="currentPassword"
                            error={errors.currentPassword}
                            required
                        >
                            <PasswordInput
                                id="currentPassword"
                                autoComplete="current-password"
                                className="h-12 text-base"
                                aria-invalid={!!errors.currentPassword}
                                disabled={disabled}
                                {...register("currentPassword")}
                            />
                        </FormField>

                        <FormField
                            label={CHANGE_PASSWORD_FORM.newPasswordLabel}
                            name="newPassword"
                            error={errors.newPassword}
                            required
                            hint={CHANGE_PASSWORD_FORM.newPasswordHint}
                        >
                            <PasswordInput
                                id="newPassword"
                                autoComplete="new-password"
                                className="h-12 text-base"
                                aria-invalid={!!errors.newPassword}
                                disabled={disabled}
                                {...register("newPassword")}
                            />
                        </FormField>

                        <FormField
                            label={CHANGE_PASSWORD_FORM.confirmPasswordLabel}
                            name="confirmPassword"
                            error={errors.confirmPassword}
                            required
                        >
                            <PasswordInput
                                id="confirmPassword"
                                autoComplete="new-password"
                                className="h-12 text-base"
                                aria-invalid={!!errors.confirmPassword}
                                disabled={disabled}
                                {...register("confirmPassword")}
                            />
                        </FormField>

                        <div
                            role="note"
                            className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-muted-foreground"
                        >
                            <FaLock
                                size={18}
                                className="mt-0.5 shrink-0 text-amber-500"
                                aria-hidden="true"
                            />
                            <p>{CHANGE_PASSWORD_FORM.warning}</p>
                        </div>
                    </CardContent>

                    <CardFooter className="p-0 px-8 py-6 bg-muted/10 border-border/20">
                        {!isEditing ? (
                            <Button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="h-12 px-6 text-base ml-auto"
                            >
                                <FaPen size={14} aria-hidden="true" />
                                {CHANGE_PASSWORD_FORM.edit}
                            </Button>
                        ) : (
                            <>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                    className="h-12 px-6 text-base"
                                >
                                    {CHANGE_PASSWORD_FORM.cancel}
                                </Button>
                                <LoadingButton
                                    type="submit"
                                    className="h-12 px-6 text-base ml-auto"
                                    loading={isPending}
                                    loadingText={CHANGE_PASSWORD_FORM.submitLoading}
                                >
                                    {CHANGE_PASSWORD_FORM.submit}
                                </LoadingButton>
                            </>
                        )}
                    </CardFooter>
                </form>
            </Card>
        </section>
    );
}