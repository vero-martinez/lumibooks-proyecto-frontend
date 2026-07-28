/**
 * Badge reutilizable para mostrar estado activo/inactivo.
 */
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ActiveBadgeProps {
    isActive: boolean;
}

export function ActiveBadge({ isActive }: ActiveBadgeProps) {
    return (
        <Badge
            variant={isActive ? "secondary" : "destructive"}
            className={cn("text-sm font-medium", isActive && "bg-success-bg text-success")}
        >
            {isActive ? "Activo" : "Inactivo"}
        </Badge>
    );
}