/**
 * Tabla de pedidos para el panel de administración.
 */
"use client";

import { FaEye, FaUserTie } from "react-icons/fa";
import { cn, formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";
import { TableActions } from "@/components/shared/TableActions";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { ADMIN_ORDERS } from "@/features/orders/constants";
import type { AdminOrderSummaryResponse } from "@/features/orders/types";

const COL_COUNT = 7;

interface AdminOrdersTableProps {
  orders: AdminOrderSummaryResponse[];
  isLoading: boolean;
  onViewDetail: (id: number) => void;
  onAssignManager: (order: AdminOrderSummaryResponse) => void;
}

export function AdminOrdersTable({
  orders,
  isLoading,
  onViewDetail,
  onAssignManager,
}: AdminOrdersTableProps) {
  return (
    <div className="rounded-xl border border-border overflow-x-auto w-full">
      <Table className="text-sm">
        <TableHeader className="[&_th]:px-6">
          <TableRow className="bg-foreground hover:bg-foreground [&_th]:text-white">
            <TableHead>N° Pedido</TableHead>
            <TableHead>{ADMIN_ORDERS.clientLabel}</TableHead>
            <TableHead>DNI</TableHead>
            <TableHead>{ADMIN_ORDERS.managerLabel}</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_td]:p-6">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={COL_COUNT} className="h-32">
                <LoadingState label={ADMIN_ORDERS.loading} />
              </TableCell>
            </TableRow>
          ) : orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={COL_COUNT} className="h-32">
                <EmptyState title={ADMIN_ORDERS.empty} />
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order, i) => (
              <TableRow
                key={order.id}
                className={cn("hover:bg-accent", i % 2 === 0 && "bg-card")}
              >
                <TableCell className="font-medium tracking-widest">
                  {order.orderNumber}
                </TableCell>
                <TableCell className="font-medium max-w-[180px] truncate">
                  {order.clientName}
                </TableCell>
                <TableCell className="font-medium">{order.dni}</TableCell>
                <TableCell className="font-medium max-w-[160px] truncate">
                  {order.managerName ?? ADMIN_ORDERS.noManager}
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell className="font-medium">
                  {formatDate(order.createdAt)}
                </TableCell>
                <TableCell>
                  <TableActions
                    actions={[
                      {
                        label: `Ver detalle del pedido ${order.orderNumber}`,
                        icon: <FaEye aria-hidden="true" />,
                        onClick: () => onViewDetail(order.id),
                      },
                      {
                        label: `Asignar gestor al pedido ${order.orderNumber}`,
                        icon: <FaUserTie aria-hidden="true" />,
                        onClick: () => onAssignManager(order),
                      },
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}