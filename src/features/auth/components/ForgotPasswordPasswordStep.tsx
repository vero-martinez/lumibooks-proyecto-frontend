/**
 * Tercer paso del flujo de recuperación de contraseña.
 * El usuario ingresa la nueva contraseña y su confirmación.
 */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { resetPasswordSchema, ResetPasswordSchema } from "@/features/auth/schemas";
import { useResetPassword } from "@/features/auth/hooks";

import { FormField } from "@/components/shared/FormField";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { Button } from "@/components/ui/button";

interface ForgotPasswordPasswordStepProps {
    email: string;
    code: string;
    onBack: () => void;
    onComplete: () => void;
}

export function ForgotPasswordPasswordStep({
    email,
    code,
    onBack,
    onComplete,
}: ForgotPasswordPasswordStepProps) {
    const resetPassword = useResetPassword();

    const passwordForm = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onSubmit",
    });

    const onSubmit = (data: ResetPasswordSchema) => {
        resetPassword.mutate(
            { email, code, newPassword: data.newPassword },
            {
                onSuccess: () => {
                    toast.success("Contraseña actualizada exitosamente");
                    onComplete();
                },
            }
        );
    };

    return (
        <form onSubmit={passwordForm.handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <FormField
                label="Nueva contraseña"
                name="newPassword"
                error={passwordForm.formState.errors.newPassword}
            >
                <PasswordInput
                    id="newPassword"
                    aria-invalid={!!passwordForm.formState.errors.newPassword}
                    {...passwordForm.register("newPassword")}
                />
            </FormField>

            <FormField
                label="Confirmar contraseña"
                name="confirmPassword"
                error={passwordForm.formState.errors.confirmPassword}
            >
                <PasswordInput
                    id="confirmPassword"
                    aria-invalid={!!passwordForm.formState.errors.confirmPassword}
                    {...passwordForm.register("confirmPassword")}
                />
            </FormField>

            <div className="flex flex-col gap-3">
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full h-12"
                    onClick={onBack}
                >
                    Volver
                </Button>
                <LoadingButton
                    type="submit"
                    size="lg"
                    className="w-full h-12"
                    loading={resetPassword.isPending}
                    loadingText="Restableciendo..."
                >
                    Restablecer contraseña
                </LoadingButton>
            </div>
        </form>
    );
}