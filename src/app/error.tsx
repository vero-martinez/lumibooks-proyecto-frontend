"use client";

import { IoWarningOutline } from "react-icons/io5";

// Error boundary global de Next.js.
// Se muestra cuando ocurre un error inesperado en cualquier página.
// El botón llama a reset() para reintentar sin recargar la página.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
        <IoWarningOutline size={28} className="text-destructive" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">Algo salió mal</h1>
      <p className="text-muted-foreground max-w-md">{error.message || "Ocurrió un error inesperado."}</p>
      <button
        onClick={reset}
        className="mt-2 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/80"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}