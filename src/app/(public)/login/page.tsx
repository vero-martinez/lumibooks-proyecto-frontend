/**
 * Página de login.
 * Permite alternar entre el formulario de inicio de sesión
 * y el flujo de recuperación de contraseña sin cambiar de ruta.
 */
"use client";

import { useState } from "react";

import { CardLayout } from "@/components/shared/CardLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { ForgotPasswordFlow } from "@/features/auth/components/ForgotPasswordFlow";

export default function LoginPage() {
    const [view, setView] = useState<"login" | "forgot">("login");

    if (view === "forgot") {
        return (
            <div className="min-h-screen w-full flex items-center justify-center px-6 py-12">
                <ForgotPasswordFlow onBackToLogin={() => setView("login")} />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-6 py-12">
            <CardLayout title="Iniciar sesión" subtitle="Si tienes una cuenta, inicia sesión aquí.">
                <LoginForm onForgotPassword={() => setView("forgot")} />
            </CardLayout>
        </div>
    );
}