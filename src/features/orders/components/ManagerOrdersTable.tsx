/**
 * Tabla de pedidos para el panel gestor.
 */
"use client";

import { FaEye, FaSyncAlt } from "react-icons/fa";
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
import { MANAGER_ORDERS } from "@/features/orders/constants";
import type { ManagerOrderSummaryResponse } from "@/features/orders/types";

const COL_COUNT = 7;

interface ManagerOrdersTableProps {
  orders: ManagerOrderSummaryResponse[];
  isLoading: boolean;
  onViewDetail: (id: number) => void;
  onUpdateStatus: (order: ManagerOrderSummaryResponse) => void;
}

export function ManagerOrdersTable({
  orders,
  isLoading,
  onViewDetail,
  onUpdateStatus,
}: ManagerOrdersTableProps) {
  return (
    <div className="rounded-xl border border-border overflow-x-auto w-full">
      <Table className="text-sm">
        <TableHeader className="[&_th]:px-6">
          <TableRow className="bg-foreground hover:bg-foreground [&_th]:text-white">
            <TableHead>N° Pedido</TableHead>
            <TableHead>{MANAGER_ORDERS.clientLabel}</TableHead>
            <TableHead>DNI</TableHead>
            <TableHead>{MANAGER_ORDERS.managerLabel}</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_td]:p-6">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={COL_COUNT} className="h-32">
                <LoadingState label={MANAGER_ORDERS.loading} />
              </TableCell>
            </TableRow>
          ) : orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={COL_COUNT} className="h-32">
                <EmptyState title={MANAGER_ORDERS.empty} />
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
                  {order.managerName ?? MANAGER_ORDERS.noManager}
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
                        label: `Actualizar estado del pedido ${order.orderNumber}`,
                        icon: <FaSyncAlt aria-hidden="true" />,
                        onClick: () => onUpdateStatus(order),
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