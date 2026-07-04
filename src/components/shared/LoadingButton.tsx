/**
 * Botón con estado de carga para acciones del usuario (enviar formulario, guardar, etc.).
 * Úsalo cuando el usuario hace clic y esperas una respuesta del backend.
 * NO es para carga de datos al entrar a una página (usa Suspense o skeletons para eso).
 *
 * Extiende shadcn/ui Button y agrega un spinner (FaSpinner)
 * cuando loading=true. Se deshabilita automáticamente
 * mientras carga para evitar doble envío.
 *
 * Si no se especifica loadingText, muestra el children original
 * junto al spinner durante la carga.
 */
import { ImSpinner2 } from "react-icons/im";
import { Button } from "@/components/ui/button";

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  loading: boolean;
  loadingText?: string;
}

export function LoadingButton({
  loading,
  loadingText,
  children,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={disabled || loading} aria-busy={loading} {...props}>
      {loading ? (
        <>
          <ImSpinner2 size={18} className="animate-spin" aria-hidden="true" />
          <span aria-live="polite">{loadingText ?? children}</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
}