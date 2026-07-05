import Link from "next/link";
import { FaHome } from "react-icons/fa";

// Página 404 personalizada de Next.js.
// Se muestra cuando el usuario visita una ruta que no existe.
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 text-center">
      <div className="text-9xl font-bold text-primary/10 select-none leading-none">404</div>
      <h3 className="text-xl font-bold text-foreground -mt-4">Ups, página no encontrada</h3>
      <p className="text-sm text-muted-foreground max-w-sm">Puede que el enlace esté roto o la página haya sido eliminada.</p>
      <Link
        href="/"
        className="mt-2 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/80 gap-2"
      >
        <FaHome size={14} />
        Ir al inicio
      </Link>
    </div>
  );
}