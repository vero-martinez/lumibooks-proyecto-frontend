"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, User, Mail, CreditCard, Phone, Loader2 } from "lucide-react";
import Link from "next/link";

import { registerSchema, RegisterSchema } from "@/features/auth/schemas";
import { useRegister } from "@/features/auth/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { error } from "console";

export function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

            {/* NOMBRE Y APELLIDO */}
            <div className="grid grid-cols-2 gap-4">
                <Field data-invalid={!!errors.firstName}>
                    <FieldLabel htmlFor="firstName">Nombre</FieldLabel>
                    <div className="relative">
                        <User size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground" />
                        <Input
                            id="firstName"
                            placeholder="Violet"
                            className="pr-9 text-secondary-foreground"
                            aria-invalid={!!errors.firstName}
                            {...registerField("firstName")}
                        />
                    </div>
                    {errors.firstName && <FieldError errors={[errors.firstName]} />}
                </Field>

                <Field data-invalid={!!errors.lastName}>
                    <FieldLabel htmlFor="lastName">Apellido</FieldLabel>
                    <div className="relative">
                        <User size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground" />
                        <Input
                            id="lastName"
                            placeholder="Abdalla"
                            className="pr-9 text-secondary-foreground"
                            aria-invalid={!!errors.lastName}
                            {...registerField("lastName")}
                        />
                    </div>
                    {errors.lastName && <FieldError errors={[errors.lastName]} />}
                </Field>
            </div>

            {/* EMAIL */}
            <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                <div className="relative">
                    <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        className="pr-9 text-secondary-foreground"
                        aria-invalid={!!errors.email}
                        {...registerField("email")}
                    />
                </div>
                {errors.email && <FieldError errors={[errors.email]} />}
            </Field>

            {/* DNI */}
            <Field data-invalid={!!errors.dni}>
                <FieldLabel htmlFor="dni">DNI</FieldLabel>
                <div className="relative">
                    <CreditCard size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground" />
                    <Input
                        id="dni"
                        placeholder="12345678"
                        maxLength={8}
                        className="pr-9 text-secondary-foreground"
                        aria-invalid={!!errors.dni}
                        {...registerField("dni")}
                    />
                </div>
                {errors.dni && <FieldError errors={[errors.dni]} />}
            </Field>

            {/* CELULAR */}
            <Field data-invalid={!!errors.cellphone}>
                <FieldLabel htmlFor="cellphone">
                    Celular <span className="text-muted-foreground text-xs">(opcional)</span>
                </FieldLabel>
                <div className="relative">
                    <Phone size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground" />
                    <Input
                        id="cellphone"
                        placeholder="987654321"
                        maxLength={9}
                        className="pr-9 text-secondary-foreground"
                        aria-invalid={!!errors.cellphone}
                        {...registerField("cellphone")}
                    />
                </div>
                {errors.cellphone && <FieldError errors={[errors.cellphone]} />}
            </Field>

            {/* CONTRASEÑA */}
            <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pr-10 text-secondary-foreground"
                        aria-invalid={!!errors.password}
                        {...registerField("password")}
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

            {/* CONFIRMAR CONTRASEÑA */}
            <Field data-invalid={!!errors.confirmPassword}>
                <FieldLabel htmlFor="confirmPassword">Confirmar contraseña</FieldLabel>
                <div className="relative">
                    <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pr-10 text-secondary-foreground"
                        aria-invalid={!!errors.confirmPassword}
                        {...registerField("confirmPassword")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground"
                    >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {errors.confirmPassword && <FieldError errors={[errors.confirmPassword]} />}
            </Field>

            {/* TÉRMINOS */}
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

            {/* NEWSLETTER */}
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

            {/* BOTÓN */}
            <Button
                type="submit"
                size="lg"
                className="w-full h-12"
                disabled={isPending}
            >
                {isPending ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        Registrando...
                    </>
                ) : (
                    "Crear cuenta"
                )}
            </Button>

            {/* LOGIN LINK */}
            <p className="text-sm text-center text-muted-foreground">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-foreground font-medium hover:underline">
                    Inicia sesión
                </Link>
            </p>

        </form>
    );
}