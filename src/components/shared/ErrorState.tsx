/**
 * Estado de error con icono, mensaje y botón de reintentar.
 * Útil para fallos de red, errores de carga, etc.
 */
import { ImWarning } from "react-icons/im";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  message,
  description,
  onRetry = () => window.location.reload(),
  retryLabel = "Reintentar",
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center py-20 gap-4"
    >
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
        <ImWarning size={24} className="text-destructive" aria-hidden="true" />
      </div>
      <p className="text-lg font-semibold text-destructive">{message}</p>
      {description && (
        <p className="text-sm text-muted-foreground text-center max-w-md">
          {description}
        </p>
      )}
      <Button
        variant="outline"
        onClick={onRetry}
        className="border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
      >
        {retryLabel}
      </Button>
    </div>
  );
}