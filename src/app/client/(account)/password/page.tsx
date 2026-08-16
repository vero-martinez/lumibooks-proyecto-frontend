"use client";

/**
 * Página de contraseña del usuario autenticado.
 * Permite cambiar la contraseña de la cuenta.
 */
import { ChangePasswordForm } from "@/features/password/components";

export default function PasswordPage() {
  return (
    <div className="mx-auto max-w-3xl pb-10 space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">Mi contraseña</h1>
        <p className="text-md text-muted-foreground">
          Cambia la contraseña de tu cuenta.
        </p>
      </div>

      <ChangePasswordForm />
    </div>
  );
}