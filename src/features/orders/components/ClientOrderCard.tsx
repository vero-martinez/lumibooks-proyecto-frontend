/**
 * Card individual de un pedido en la lista de "Mis pedidos".
 * Muestra: #Pedido, badge de estado, fecha, cantidad de productos y total.
 */
import { FaArrowRight } from "react-icons/fa";
import { FcAutomotive } from "react-icons/fc";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { formatPrice, formatDate } from "@/lib/utils";
import { CLIENT_ORDERS } from "@/features/orders/constants";
import type { OrderClientResponse } from "@/features/orders/types";

interface ClientOrderCardProps {
    order: OrderClientResponse;
    onViewDetail: (order: OrderClientResponse) => void;
}

export function ClientOrderCard({ order, onViewDetail }: ClientOrderCardProps) {
    return (
        <Card className="border-border/20 rounded-2xl shadow-sm overflow-hidden py-0 gap-0 transition-shadow hover:shadow-md bg-secondary/40">
            {/* Cabecera: icono + numero de pedido + fecha + estado */}
            <CardContent className="flex items-center justify-between gap-4 px-6 py-5">
                <div className="flex items-center gap-4 min-w-0">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-muted">
                        <FcAutomotive className="size-6" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-lg font-semibold text-foreground truncate">
                            Pedido #{order.orderNumber}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            Fecha de creación: {formatDate(order.createdAt)}
                        </p>
                    </div>
                </div>

                <OrderStatusBadge status={order.status} />
            </CardContent>

            <div className="h-px bg-border/20" />

            {/* Pie: total + boton de ver detalle */}
            <CardContent className="flex items-center justify-between gap-4 px-6 py-5">
                <p className="text-base text-muted-foreground">
                    Total:{" "}
                    <span className="font-semibold text-foreground tabular-nums">
                        {formatPrice(order.total)}
                    </span>
                </p>

                <Button
                    variant="outline"
                    type="button"
                    onClick={() => onViewDetail(order)}
                    className="h-10 px-4 text-sm text-foreground"
                >
                    {CLIENT_ORDERS.viewDetail}
                    <FaArrowRight className="size-3" aria-hidden="true" />
                </Button>
            </CardContent>
        </Card>
    );
}