/**
 * Flujo de recuperación de contraseña en pasos:
 *
 * 1. Email: el usuario escribe su correo.
 * 2. Código: se confirma que se envió un código de verificación.
 * 3. Contraseña: se ingresa la nueva contraseña y su confirmación.
 *
 * Este componente renderiza el CardLayout con el encabezado propio de cada
 * paso y solo orquesta la navegación entre pasos, conservando el email y el
 * código en memoria para no volver a pedirlos.
 */
"use client";

import { useState } from "react";
import { FaEnvelope, FaKey, FaLock } from "react-icons/fa";
import type { IconType } from "react-icons";

import { CardLayout } from "@/components/shared/CardLayout";
import { ForgotPasswordEmailStep } from "@/features/auth/components/ForgotPasswordEmailStep";
import { ForgotPasswordCodeStep } from "@/features/auth/components/ForgotPasswordCodeStep";
import { ForgotPasswordPasswordStep } from "@/features/auth/components/ForgotPasswordPasswordStep";

type ResetStep = "email" | "code" | "password";

interface ForgotPasswordFlowProps {
    onBackToLogin: () => void;
}

export function ForgotPasswordFlow({ onBackToLogin }: ForgotPasswordFlowProps) {
    const [step, setStep] = useState<ResetStep>("email");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");

    const headers: Record<ResetStep, { title: string; subtitle: string; icon: IconType }> = {
        email: {
            title: "Olvidé mi contraseña",
            subtitle: "Por favor introduce tu correo y te enviaremos un código para restablecerla.",
            icon: FaEnvelope,
        },
        code: {
            title: "Código de verificación",
            subtitle: "Ingresa el código de 6 dígitos que enviamos a tu correo.",
            icon: FaKey,
        },
        password: {
            title: "Nueva contraseña",
            subtitle: "Ingresa tu nueva contraseña y confírmala para restablecer el acceso.",
            icon: FaLock,
        },
    };

    return (
        <CardLayout {...headers[step]}>
            {step === "email" && (
                <ForgotPasswordEmailStep
                    defaultEmail={email}
                    onBack={onBackToLogin}
                    onSent={(value) => {
                        setEmail(value);
                        setStep("code");
                    }}
                />
            )}

            {step === "code" && (
                <ForgotPasswordCodeStep
                    email={email}
                    onBack={() => setStep("email")}
                    onSuccess={(value) => {
                        setCode(value);
                        setStep("password");
                    }}
                />
            )}

            {step === "password" && (
                <ForgotPasswordPasswordStep
                    email={email}
                    code={code}
                    onBack={() => setStep("code")}
                    onComplete={onBackToLogin}
                />
            )}
        </CardLayout>
    );
}