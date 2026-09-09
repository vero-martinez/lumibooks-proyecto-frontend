/**
 * Badge de estado con punto de color, compartido por varios módulos
 * (órdenes, reseñas, etc.). Cada módulo provee el label y las clases de
 * color según su propio enum, de modo que este componente no conoce
 * ninguna entidad de negocio.
 */
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
    /** Texto legible del estado (provisto por el módulo que lo usa). */
    label: string;
    /** Clases de estilo generales del badge (fondo, texto, borde). */
    colorClass: string;
    /** Clase de color del puntito indicador. */
    dotClass: string;
    /** Override de estilos externos. */
    className?: string;
}

export function StatusBadge({ label, colorClass, dotClass, className }: StatusBadgeProps) {
    return (
        <Badge
            variant="outline"
            className={cn(
                "gap-2 rounded-full p-3 text-xs font-medium",
                colorClass,
                className,
            )}
        >
            <span
                className={cn("size-1.5 rounded-full", dotClass)}
                aria-hidden="true"
            />
            {label}
        </Badge>
    );
}