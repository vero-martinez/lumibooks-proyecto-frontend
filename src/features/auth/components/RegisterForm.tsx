"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser, FaEnvelope, FaCreditCard, FaPhone } from "react-icons/fa";
import Link from "next/link";

import { registerSchema, RegisterSchema } from "@/features/auth/schemas";
import { useRegister } from "@/features/auth/hooks";

import { Field, FieldError } from "@/components/ui/field";
import { FormField } from "@/components/shared/FormField";
import { IconInput } from "@/components/shared/IconInput";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { LoadingButton } from "@/components/shared/LoadingButton";

export function RegisterForm() {
    const { mutate: register, isPending } = useRegister();

    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur",
    });

    const onSubmit = (data: RegisterSchema) => {
        register(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="grid grid-cols-2 gap-4">
                <FormField label="Nombre" name="firstName" error={errors.firstName}>
                    <IconInput
                        icon={FaUser}
                        id="firstName"
                        placeholder="Violet"
                        aria-invalid={!!errors.firstName}
                        {...registerField("firstName")}
                    />
                </FormField>

                <FormField label="Apellido" name="lastName" error={errors.lastName}>
                    <IconInput
                        icon={FaUser}
                        id="lastName"
                        placeholder="Abdalla"
                        aria-invalid={!!errors.lastName}
                        {...registerField("lastName")}
                    />
                </FormField>
            </div>

            <FormField label="Correo electrónico" name="email" error={errors.email}>
                <IconInput
                    icon={FaEnvelope}
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    aria-invalid={!!errors.email}
                    {...registerField("email")}
                />
            </FormField>

            <FormField label="DNI" name="dni" error={errors.dni}>
                <IconInput
                    icon={FaCreditCard}
                    id="dni"
                    placeholder="12345678"
                    maxLength={8}
                    aria-invalid={!!errors.dni}
                    {...registerField("dni")}
                />
            </FormField>

            <FormField
                label={
                    <>
                        Celular <span className="text-muted-foreground text-xs">(opcional)</span>
                    </>
                }
                name="cellphone"
                error={errors.cellphone}
            >
                <IconInput
                    icon={FaPhone}
                    id="cellphone"
                    placeholder="987654321"
                    maxLength={9}
                    aria-invalid={!!errors.cellphone}
                    {...registerField("cellphone")}
                />
            </FormField>

            <FormField label="Contraseña" name="password" error={errors.password}>
                <PasswordInput
                    id="password"
                    aria-invalid={!!errors.password}
                    {...registerField("password")}
                />
            </FormField>

            <FormField label="Confirmar contraseña" name="confirmPassword" error={errors.confirmPassword}>
                <PasswordInput
                    id="confirmPassword"
                    aria-invalid={!!errors.confirmPassword}
                    {...registerField("confirmPassword")}
                />
            </FormField>

            <Field data-invalid={!!errors.acceptsTerms}>
                <div className="flex items-start gap-2">
                    <input
                        id="acceptsTerms"
                        type="checkbox"
                        className="mt-1 accent-primary"
                        {...registerField("acceptsTerms")}
                    />
                    <label htmlFor="acceptsTerms" className="text-sm text-secondary-foreground">
                        Acepto los{" "}
                        <Link href="/terms" className="text-foreground font-medium hover:underline">
                            términos y condiciones
                        </Link>
                    </label>
                </div>
                {errors.acceptsTerms && <FieldError errors={[errors.acceptsTerms]} />}
            </Field>

            <Field>
                <div className="flex items-start gap-2">
                    <input
                        id="subscribedToNewsletter"
                        type="checkbox"
                        className="mt-1 accent-primary"
                        {...registerField("subscribedToNewsletter")}
                    />
                    <label htmlFor="subscribedToNewsletter" className="text-sm text-secondary-foreground">
                        Quiero suscribirme al Newsletter
                    </label>
                </div>
            </Field>

            <LoadingButton
                type="submit"
                size="lg"
                className="w-full h-12"
                loading={isPending}
                loadingText="Registrando..."
            >
                Crear cuenta
            </LoadingButton>

            <p className="text-sm text-center text-muted-foreground">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-foreground font-medium hover:underline">
                    Inicia sesión
                </Link>
            </p>
        </form>
    );
}