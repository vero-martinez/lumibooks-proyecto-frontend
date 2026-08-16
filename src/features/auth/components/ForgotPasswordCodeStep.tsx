/**
 * Segundo paso del flujo de recuperación de contraseña.
 * El usuario ingresa el código de verificación recibido por correo.
 */
"use client";

import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetCodeSchema, ResetCodeSchema } from "@/features/auth/schemas";

import { FormField } from "@/components/shared/FormField";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OtpInputProps {
    value: string;
    onChange: (value: string) => void;
    hasError?: boolean;
    length?: number;
}

function OtpInput({ value, onChange, hasError, length = 6 }: OtpInputProps) {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const digits = Array.from({ length }, (_, i) => value[i] ?? "");

    const setDigit = (index: number, digit: string) => {
        const next = digits.slice();
        next[index] = digit;
        onChange(next.join(""));
    };

    const handleChange = (index: number, raw: string) => {
        const digit = raw.replace(/\D/g, "").slice(-1);
        setDigit(index, digit);
        if (digit && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
            setDigit(index - 1, "");
        }
        if (e.key === "ArrowLeft" && index > 0) {
            e.preventDefault();
            inputsRef.current[index - 1]?.focus();
        }
        if (e.key === "ArrowRight" && index < length - 1) {
            e.preventDefault();
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        if (!pasted) return;
        onChange(pasted);
        const focusIndex = Math.min(pasted.length, length - 1);
        inputsRef.current[focusIndex]?.focus();
    };

    return (
        <div
            role="group"
            aria-label="Código de verificación"
            className="flex justify-center gap-2"
            onPaste={handlePaste}
        >
            {digits.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => {
                        inputsRef.current[index] = el;
                    }}
                    id={index === 0 ? "code" : undefined}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    aria-invalid={hasError}
                    aria-label={`Dígito ${index + 1} de ${length}`}
                    className={cn(
                        "h-14 w-12 rounded-xl border bg-background text-center text-xl font-semibold text-foreground",
                        "outline-none transition-colors",
                        "focus:border-primary focus:ring-2 focus:ring-primary/20",
                        hasError
                            ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                            : "border-border/40"
                    )}
                />
            ))}
        </div>
    );
}

interface ForgotPasswordCodeStepProps {
    email: string;
    onBack: () => void;
    onSuccess: (code: string) => void;
}

export function ForgotPasswordCodeStep({ email, onBack, onSuccess }: ForgotPasswordCodeStepProps) {
    const codeForm = useForm<ResetCodeSchema>({
        resolver: zodResolver(resetCodeSchema),
        mode: "onSubmit",
        defaultValues: { code: "" },
    });

    const onSubmit = (data: ResetCodeSchema) => {
        onSuccess(data.code);
    };

    return (
        <form onSubmit={codeForm.handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Te enviamos un código de verificación a
                <br />
                <span className="font-medium text-foreground">{email}</span>
            </p>

            <FormField
                label="Código de verificación"
                name="code"
                error={codeForm.formState.errors.code}
            >
                <Controller
                    control={codeForm.control}
                    name="code"
                    render={({ field }) => (
                        <OtpInput
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            hasError={!!codeForm.formState.errors.code}
                        />
                    )}
                />
            </FormField>

            <div className="flex flex-col gap-3">
                <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 rounded-xl font-medium"
                >
                    Continuar
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full h-12 rounded-xl font-medium text-muted-foreground hover:text-foreground"
                    onClick={onBack}
                >
                    Volver
                </Button>
            </div>
        </form>
    );
}