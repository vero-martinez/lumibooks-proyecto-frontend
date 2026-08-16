"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEnvelope } from "react-icons/fa";
import Link from "next/link";

import { loginSchema, LoginSchema } from "@/features/auth/schemas";
import { useLogin } from "@/features/auth/hooks";

import { FormField } from "@/components/shared/FormField";
import { IconInput } from "@/components/shared/IconInput";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { LoadingButton } from "@/components/shared/LoadingButton";

interface LoginFormProps {
    onForgotPassword?: () => void;
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
    const { mutate: login, isPending } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
    });

    const onSubmit = (data: LoginSchema) => {
        login(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <FormField label="Correo electrónico" name="email" error={errors.email}>
                <IconInput
                    icon={FaEnvelope}
                    iconSize={18}
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                />
            </FormField>

            <FormField label="Contraseña" name="password" error={errors.password}>
                <PasswordInput
                    id="password"
                    aria-invalid={!!errors.password}
                    {...register("password")}
                />
            </FormField>

            {onForgotPassword && (
                <div className="-mt-3 text-right">
                    <button
                        type="button"
                        onClick={onForgotPassword}
                        className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>
            )}

            <LoadingButton
                type="submit"
                size="lg"
                className="w-full h-12"
                loading={isPending}
                loadingText="Iniciando Sesión..."
            >
                Iniciar Sesión
            </LoadingButton>

            <p className="text-sm text-center text-muted-foreground">
                ¿No tienes una cuenta?{" "}
                <Link
                    href="/register"
                    className="text-foreground font-medium hover:underline"
                >
                    Regístrate
                </Link>
            </p>
        </form>
    );
}