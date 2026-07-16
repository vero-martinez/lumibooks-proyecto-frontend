/**
 * Botón circular con un ícono centrado.
 * Usado para acciones rápidas: carrito, favoritos, menú de usuario, etc.
 *
 * Acepta cualquier prop nativa de <button> (onClick, disabled, type, etc.)
 * gracias a ButtonHTMLAttributes.
 */
import { memo, ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  /** Texto descriptivo para screen readers (aria-label) */
  label: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_STYLES: Record<
  NonNullable<IconButtonProps["size"]>,
  { button: string; icon: number }
> = {
  sm: { button: "w-9 h-9", icon: 18 },
  md: { button: "w-11 h-11", icon: 22 },
  lg: { button: "w-14 h-14", icon: 28 },
};

export const IconButton = memo(function IconButton({
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
        "rounded-full bg-accent flex items-center justify-center text-foreground transition-all",
        "hover:bg-foreground hover:text-secondary active:scale-95",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent disabled:active:scale-100",
        buttonSize,
        className,
      )}
      {...rest}
    >
      <Icon size={iconSize} aria-hidden="true" />
    </button>
  );
});