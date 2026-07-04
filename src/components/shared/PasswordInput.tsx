/**
 * Input de contraseña con toggle de visibilidad.
 * Muestra un botón con ícono de ojo para mostrar/ocultar el texto.
 *
 * Edge cases:
 * - forwardRef para integración con react-hook-form.
 * - type siempre es controlado internamente (password/text) y no se puede pisar.
 * - placeholder y className se pueden personalizar via props.
 */
"use client";

import { forwardRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.ComponentProps<typeof Input> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ className, placeholder, ...props }, ref) {
    const [show, setShow] = useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={show ? "text" : "password"}
          placeholder={placeholder ?? "••••••••"}
          className={cn("pr-10", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-md text-foreground hover:text-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors"
          aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {show ? (
            <FaEyeSlash size={18} aria-hidden="true" />
          ) : (
            <FaEye size={18} aria-hidden="true" />
          )}
        </button>
      </div>
    );
  },
);