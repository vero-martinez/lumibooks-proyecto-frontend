/**
 * Badge que muestra el estado de una orden con color.
 * Delega el render compartido en StatusBadge.
 */
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ORDER_STATUS_LABEL } from "@/features/orders/constants";
import type { OrderStatus } from "@/features/orders/types";

const STATUS_STYLES: Record<OrderStatus, string> = {
    PENDIENTE:
        "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    EN_PREPARACION:
        "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    ENVIADO:
        "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
    ENTREGADO:
        "bg-success-bg text-success border-success/20",
};

const STATUS_DOT: Record<OrderStatus, string> = {
    PENDIENTE: "bg-amber-500",
    EN_PREPARACION: "bg-blue-500",
    ENVIADO: "bg-violet-500",
    ENTREGADO: "bg-success",
};

interface OrderStatusBadgeProps {
    status: OrderStatus;
    className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
    return (
        <StatusBadge
            label={ORDER_STATUS_LABEL[status]}
            colorClass={STATUS_STYLES[status]}
            dotClass={STATUS_DOT[status]}
            className={className}
        />
    );
}