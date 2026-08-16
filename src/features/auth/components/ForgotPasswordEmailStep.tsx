/**
 * Primer paso del flujo de recuperación de contraseña.
 * El usuario escribe su correo para solicitar el código de verificación.
 */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "sonner";

import { forgotPasswordSchema, ForgotPasswordSchema } from "@/features/auth/schemas";
import { useForgotPassword } from "@/features/auth/hooks";

import { FormField } from "@/components/shared/FormField";
import { IconInput } from "@/components/shared/IconInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { Button } from "@/components/ui/button";

interface ForgotPasswordEmailStepProps {
    defaultEmail?: string;
    onBack: () => void;
    onSent: (email: string) => void;
}

export function ForgotPasswordEmailStep({
    defaultEmail,
    onBack,
    onSent,
}: ForgotPasswordEmailStepProps) {
    const forgotPassword = useForgotPassword();

    const emailForm = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onSubmit",
        defaultValues: { email: defaultEmail },
    });

    const onSubmit = (data: ForgotPasswordSchema) => {
        forgotPassword.mutate(data, {
            onSuccess: (response) => {
                toast.success(response.message);
                onSent(data.email);
            },
        });
    };

    return (
        <form onSubmit={emailForm.handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <FormField
                label="Correo electrónico"
                name="email"
                error={emailForm.formState.errors.email}
            >
                <IconInput
                    icon={FaEnvelope}
                    iconSize={18}
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    aria-invalid={!!emailForm.formState.errors.email}
                    {...emailForm.register("email")}
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
                    loading={forgotPassword.isPending}
                    loadingText="Enviando..."
                >
                    Restablecer contraseña
                </LoadingButton>
            </div>
        </form>
    );
}