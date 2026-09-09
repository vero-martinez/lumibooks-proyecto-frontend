/**
 * Dialog de detalle de pedido para el panel de administración.
 * Incluye botón para asignar/reasignar gestor.
 */
"use client";

import {
  FaMapMarkerAlt,
  FaUser,
  FaIdCard,
  FaPhone,
  FaRegClock,
  FaUserTie,
} from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookCover } from "@/components/shared/BookCover";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderStatusStepper } from "./OrderStatusStepper";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { ADMIN_ORDERS } from "@/features/orders/constants";
import type { AdminOrderDetailResponse } from "@/features/orders/types";

interface AdminOrderDetailDialogProps {
  order: AdminOrderDetailResponse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssignManager: () => void;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="font-semibold text-foreground mb-4">{children}</h4>;
}

function InfoRow({
  icon: Icon,
  iconColor,
  label,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  iconColor: string;
  label: string;
}) {
  return (
    <div className="flex items-start gap-2.5 text-sm">
      <Icon
        className={`size-3.5 shrink-0 mt-0.5 ${iconColor}`}
        aria-hidden={true}
      />
      <span className="text-foreground">{label}</span>
    </div>
  );
}

function CostRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground tabular-nums">{value}</span>
    </div>
  );
}

export function AdminOrderDetailDialog({
  order,
  open,
  onOpenChange,
  onAssignManager,
}: AdminOrderDetailDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Header con numero de pedido */}
        <DialogHeader className="bg-primary text-primary-foreground px-6 py-6 space-y-1.5">
          <DialogTitle className="text-xl font-bold text-primary-foreground pr-8">
            {ADMIN_ORDERS.detailTitle} #{order.orderNumber}
          </DialogTitle>
          <DialogDescription className="text-primary-foreground/80">
            CLIENTE: {order.clientName}
          </DialogDescription>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-xs text-primary-foreground/80">
            <span className="flex items-center gap-1.5">
              <FaRegClock className="size-3" aria-hidden="true" />
              {ADMIN_ORDERS.created}: {formatDateTime(order.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <FaRegClock className="size-3" aria-hidden="true" />
              {ADMIN_ORDERS.updated}: {formatDateTime(order.updatedAt)}
            </span>
          </div>
        </DialogHeader>

        <div className="px-6 py-8">
          <div className="space-y-10 text-sm">
            {/* Estado actual + Stepper */}
            <div className="rounded-2xl border border-border/20 shadow-sm px-4 py-6">
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm text-muted-foreground">
                  Estado actual
                </span>
                <OrderStatusBadge status={order.status} />
              </div>
              <OrderStatusStepper
                currentStatus={order.status}
                createdAt={order.createdAt}
                updatedAt={order.updatedAt}
              />
            </div>

            {/* Gestor asignado */}
            <section>
              <SectionTitle>{ADMIN_ORDERS.managerLabel}</SectionTitle>
              <div className="rounded-2xl border border-border/20 shadow-sm px-4 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-sm">
                    <FaUserTie
                      className="size-3.5 shrink-0 text-primary"
                      aria-hidden={true}
                    />
                    <span className="text-foreground font-medium">
                      {order.managerName ?? ADMIN_ORDERS.noManager}
                    </span>
                  </div>
                  
                </div>
              </div>
            </section>

            {/* Datos del destinatario + dirección */}
            <section>
              <SectionTitle>{ADMIN_ORDERS.recipientData}</SectionTitle>
              <div className="rounded-2xl border border-border/20 shadow-sm px-4 py-5 space-y-3.5">
                <InfoRow
                  icon={FaUser}
                  iconColor="text-blue-500"
                  label={order.recipientName}
                />
                <InfoRow
                  icon={FaIdCard}
                  iconColor="text-amber-500"
                  label={`DNI: ${order.dni}`}
                />
                <InfoRow
                  icon={FaPhone}
                  iconColor="text-emerald-500"
                  label={order.phone}
                />
                <InfoRow
                  icon={FaMapMarkerAlt}
                  iconColor="text-rose-500"
                  label={`${order.addressLine}, ${order.districtName}, ${order.provinceName}, ${order.departmentName}`}
                />
              </div>
            </section>

            {/* Productos */}
            <section>
              <SectionTitle>{ADMIN_ORDERS.products}</SectionTitle>
              <ul className="divide-y divide-border/20 rounded-2xl border border-border/20 shadow-sm overflow-hidden">
                {order.items.map((item) => (
                  <li
                    key={item.bookId}
                    className="flex items-center gap-3 px-4 py-4"
                  >
                    <BookCover
                      src={item.coverImageUrl}
                      alt={item.title}
                      className="h-[60px] w-10 shrink-0 rounded-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {ADMIN_ORDERS.quantityLabel} {item.quantity} &times;{" "}
                        {formatPrice(item.unitPrice)}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-foreground tabular-nums">
                      {formatPrice(item.subtotal)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Resumen de costos */}
            <section>
              <SectionTitle>{ADMIN_ORDERS.summary}</SectionTitle>
              <div className="rounded-2xl border border-border/20 shadow-sm px-4 py-5 space-y-3">
                <CostRow label="Subtotal" value={formatPrice(order.subtotal)} />
                <CostRow
                  label="Envío"
                  value={formatPrice(order.shippingCost)}
                />
                <Separator className="my-1.5 bg-border/20" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-foreground text-lg tabular-nums">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}