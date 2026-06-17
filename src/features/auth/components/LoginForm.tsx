"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Loader2 } from "lucide-react";
import Link from "next/link";

import { loginSchema, LoginSchema } from "@/features/auth/schemas";
import { useLogin } from "@/features/auth/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
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
            {/* EMAIL */}
            <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>

                <div className="relative">
                    <Input
                        id="email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        {...register("email")}
                        aria-invalid={!!errors.email}
                        className="text-secondary-foreground"
                    />

                    <Mail
                        size={18}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-foreground"
                    />
                </div>

                {errors.email && <FieldError errors={[errors.email]} />}
            </Field>

            {/* PASSWORD */}
            <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>

                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pr-10 text-secondary-foreground"
                        aria-invalid={!!errors.password}
                        {...register("password")}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {errors.password && <FieldError errors={[errors.password]} />}
            </Field>

            {/* BUTTON */}
            <Button
                type="submit"
                size="lg"
                className="w-full h-12"
                disabled={isPending}
            >
                {isPending ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        Iniciando Sesión...
                    </>
                ) : (
                    "Iniciar Sesión"
                )}
            </Button>

            {/* REGISTER LINK */}
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