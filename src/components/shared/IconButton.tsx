import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  label: string;
  size?: "sm" | "md" | "lg";
}

// Tamaño del botón (contenedor) y del ícono interno, por variante.
const SIZE_STYLES: Record<NonNullable<IconButtonProps["size"]>, { button: string; icon: number }> = {
  sm: { button: "w-9 h-9", icon: 18 },
  md: { button: "w-11 h-11", icon: 22 },
  lg: { button: "w-14 h-14", icon: 28 },
};

/**
 * Botón circular con un ícono centrado.
 * Usado para acciones rápidas como carrito, favoritos, usuario, etc.
 *
 * Acepta cualquier prop nativa de <button> (onClick, disabled, type, etc.)
 * gracias a ButtonHTMLAttributes — no es necesario declararlas una por una.
 */
export function IconButton({
  icon: Icon,
  label,
  size = "md",
  className,
  type = "button",
  disabled,
  ...rest
}: IconButtonProps) {
  const { button: buttonSize, icon: iconSize } = SIZE_STYLES[size];

  return (
    <button
      type={type}
      aria-label={label}
      disabled={disabled}
      className={cn(
        "rounded-full bg-accent flex items-center justify-center text-foreground transition-colors",
        "hover:bg-accent/70",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent",
        buttonSize,
        className,
      )}
      {...rest}
    >
      <Icon size={iconSize} />
    </button>
  );
}