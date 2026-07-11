"use client";

/**
 * Componente de autenticación para la navbar.
 * Muestra saludo con nombre y "Cerrar Sesión" si está autenticado,
 * o "¡Hola!" e "Iniciar Sesión" si no lo está.
 *
 * - Callback adicional al hacer clic (ej. cerrar menú mobile)
 * - "full" para desktop con saludo completo, "compact" para mobile con ícono
 */
import NextLink from "next/link";
import { FaUser } from "react-icons/fa";
import { useAuthStore } from "@/stores/auth.store";
import { useLogout } from "@/features/auth/hooks";

interface UserMenuProps {
  onAction?: () => void;
  /** Versión compacta (solo ícono + texto) vs completa (con saludo) */
  variant?: "full" | "compact";
}

const UserIcon = () => (
  <span className="rounded-full bg-accent flex items-center justify-center w-9 h-9 text-foreground">
    <FaUser size={18} aria-hidden="true" />
  </span>
);

export function UserMenu({ onAction, variant = "full" }: UserMenuProps) {
  const { token, user } = useAuthStore();
  const isAuthenticated = !!token;
  const { mutate: handleLogout } = useLogout();

  if (isAuthenticated) {
    return (
      <span
        role="button"
        tabIndex={0}
        onClick={() => {
          handleLogout();
          onAction?.();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogout();
            onAction?.();
          }
        }}
        className={variant === "full"
          ? "flex flex-col items-start justify-center hover:opacity-80 transition-opacity cursor-pointer"
          : "flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground px-3 py-2.5 rounded-md hover:bg-accent/10 transition-colors text-sm font-medium cursor-pointer"
        }
      >
        {variant === "full" && (
          <>
            <span className="font-bold text-primary-foreground">¡Hola, {user?.firstName}!</span>
            <span className="text-sm font-bold text-primary-foreground">Cerrar Sesión</span>
          </>
        )}
        {variant === "compact" && (
          <>
            <UserIcon />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </>
        )}
      </span>
    );
  }

  return (
    <NextLink
      href="/login"
      aria-label="Iniciar sesión"
      className={variant === "full"
        ? "flex flex-col items-start justify-center hover:opacity-80 transition-opacity"
        : "flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground px-3 py-2.5 rounded-md hover:bg-accent/10 transition-colors text-sm font-medium"
      }
      onClick={onAction}
    >
      {variant === "full" && (
        <>
          <span className="font-bold text-primary-foreground">¡Hola!</span>
          <span className="text-sm font-bold text-primary-foreground">Iniciar Sesión</span>
        </>
      )}
      {variant === "compact" && (
        <>
          <UserIcon />
          <span className="text-sm font-medium">Iniciar Sesión</span>
        </>
      )}
    </NextLink>
  );
}