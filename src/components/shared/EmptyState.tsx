/**
 * Estado vacío con icono, título, descripción opcional y acción.
 * Útil para "sin resultados", "carrito vacío", "sin reseñas", etc.
 */
import type { ReactNode } from "react";
import { ImSearch } from "react-icons/im";
import { Button } from "@/components/ui/button";

interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: EmptyStateAction;
  icon?: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}

export function EmptyState({
  title,
  description,
  action,
  icon,
  as: Tag = "p",
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center py-20 gap-4"
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
        {icon ?? (
          <ImSearch
            size={24}
            className="text-muted-foreground"
            aria-hidden="true"
          />
        )}
      </div>
      <Tag className="text-lg font-semibold">{title}</Tag>
      {description && (
        <p className="text-sm text-muted-foreground text-center max-w-md">
          {description}
        </p>
      )}
      {action && (
        <Button
          variant="outline"
          onClick={action.onClick}
          className="border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}