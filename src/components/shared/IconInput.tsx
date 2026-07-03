/**
 * Input con un ícono posicionado a la derecha.
 * Útil para campos como email, usuario, búsqueda, etc.
 *
 * El padding derecho se calcula automáticamente según iconSize
 * para evitar que el ícono sobresalga del input.
 */
import * as React from "react";
import { type IconType } from "react-icons";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface IconInputProps extends React.ComponentProps<"input"> {
  icon: IconType;
  iconSize?: number;
}

export function IconInput({ icon: Icon, iconSize = 16, className, style, ...props }: IconInputProps) {
  const paddingRight = iconSize + 20;

  return (
    <div className="relative">
      <Icon
        size={iconSize}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-foreground"
      />
      <Input
        className={cn("text-secondary-foreground", className)}
        style={{ paddingRight, ...style }}
        {...props}
      />
    </div>
  );
}