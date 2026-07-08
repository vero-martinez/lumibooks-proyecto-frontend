/**
 * Estado de carga con spinner animado y texto descriptivo.
 * Útil para indicar carga de datos, espera de procesos, etc.
 */
import { ImSpinner2 } from "react-icons/im";

interface LoadingStateProps {
  label?: string;
}

export function LoadingState({ label = "Cargando..." }: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-20 gap-3"
    >
      <ImSpinner2
        size={32}
        className="animate-spin text-primary"
        aria-hidden="true"
      />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}