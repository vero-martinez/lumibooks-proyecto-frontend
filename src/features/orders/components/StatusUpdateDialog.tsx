/**
 * Dialog para actualizar el estado de un pedido.
 * Muestra todos los pasos como una línea de tiempo, solo el siguiente es seleccionable.
 */
"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { cn } from "@/lib/utils";
import {
  MANAGER_ORDERS,
  ORDER_STATUS_LABEL,
  ORDER_STATUS_STEPS,
} from "@/features/orders/constants";
import type {
  ManagerOrderSummaryResponse,
  OrderStatus,
} from "@/features/orders/types";

interface StatusUpdateDialogProps {
  order: ManagerOrderSummaryResponse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (orderId: number, status: OrderStatus) => void;
  isUpdating: boolean;
}

function getNextStatus(current: OrderStatus): OrderStatus | null {
  const idx = ORDER_STATUS_STEPS.indexOf(current);
  if (idx === -1 || idx === ORDER_STATUS_STEPS.length - 1) return null;
  return ORDER_STATUS_STEPS[idx + 1];
}

export function StatusUpdateDialog({
  order,
  open,
  onOpenChange,
  onConfirm,
  isUpdating,
}: StatusUpdateDialogProps) {
  const [selected, setSelected] = useState<OrderStatus | "">("");

  if (!order) return null;

  const currentIdx = ORDER_STATUS_STEPS.indexOf(order.status);
  const nextStatus = getNextStatus(order.status);
  const canUpdate = nextStatus !== null;

  const handleConfirm = () => {
    if (!selected) return;
    onConfirm(order.id, selected as OrderStatus);
    setSelected("");
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) setSelected("");
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm overflow-hidden">
        <DialogHeader className="items-center gap-1 px-6 pt-6 pb-5 text-center">
          <DialogTitle className="text-lg">
            {MANAGER_ORDERS.updateStatus}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Pedido #{order.orderNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          {/* Estado actual */}
          <div className="flex items-center justify-between rounded-2xl border border-border/20 shadow-sm px-4 py-3.5">
            <span className="text-sm text-muted-foreground">Estado actual</span>
            <OrderStatusBadge status={order.status} />
          </div>

          {/* Timeline: siempre visible, con o sin pasos pendientes */}
          <div className="rounded-2xl border border-border/20 shadow-sm px-4 py-5">
            <p className="text-sm font-medium text-foreground mb-5">
              {canUpdate
                ? "Selecciona el nuevo estado"
                : "Recorrido del pedido"}
            </p>

            <div role="radiogroup" aria-label="Nuevo estado">
              {ORDER_STATUS_STEPS.map((s, i) => {
                const isCompleted = i < currentIdx;
                const isCurrent = i === currentIdx;
                const isNext = s === nextStatus;
                const isFuture = i > currentIdx + 1;
                const isSelected = selected === s;
                const isLast = i === ORDER_STATUS_STEPS.length - 1;
                const isDone = isCompleted || isCurrent;
                const isEmphasized = isDone || isNext;

                return (
                  <div key={s} className="flex gap-3.5">
                    {/* Columna del circulo + linea */}
                    <div className="flex flex-col items-center shrink-0">
                      <span
                        className={cn(
                          "flex items-center justify-center rounded-full border-2 font-semibold shrink-0 transition-all duration-200",
                          isEmphasized
                            ? "size-8 text-xs"
                            : "size-6 text-[10px]",
                          isDone &&
                            "bg-primary border-primary text-primary-foreground shadow-sm shadow-primary/30",
                          isNext &&
                            isSelected &&
                            "bg-primary border-primary text-primary-foreground shadow-sm shadow-primary/30",
                          isNext &&
                            !isSelected &&
                            "bg-primary/5 border-primary text-primary",
                          isFuture &&
                            "bg-background border-muted text-muted-foreground/40",
                        )}
                      >
                        {isDone || (isNext && isSelected) ? (
                          <FaCheck
                            className={isEmphasized ? "size-3" : "size-2.5"}
                            aria-hidden
                          />
                        ) : (
                          i + 1
                        )}
                      </span>
                      {!isLast && (
                        <div
                          className={cn(
                            "w-0.5 flex-1 my-1 rounded-full transition-colors duration-200",
                            isEmphasized ? "min-h-8" : "min-h-5",
                            isDone ? "bg-primary/40" : "bg-muted",
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {/* Contenido de la fila */}
                    <button
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      disabled={!isNext}
                      onClick={() => isNext && setSelected(s)}
                      className={cn(
                        "flex-1 flex items-center justify-between rounded-xl px-3.5 text-left text-sm transition-all duration-200 mb-2",
                        isEmphasized ? "h-8" : "h-6",
                        isCompleted &&
                          "font-semibold text-foreground cursor-default",
                        isCurrent &&
                          "font-semibold text-foreground cursor-default",
                        isNext &&
                          !isSelected &&
                          "font-medium text-foreground border border-dashed border-primary/40 hover:border-primary hover:bg-primary/5 cursor-pointer",
                        isNext &&
                          isSelected &&
                          "font-semibold text-foreground border border-primary bg-primary/5 shadow-sm cursor-pointer",
                        isFuture && "text-muted-foreground/40 cursor-default",
                      )}
                    >
                      <span>{ORDER_STATUS_LABEL[s]}</span>
                      {isCurrent && (
                        <span className="text-[10px] font-medium text-primary/70 uppercase tracking-wide">
                          Actual
                        </span>
                      )}
                      {isNext && !isSelected && (
                        <span className="text-[10px] font-medium text-primary/70 uppercase tracking-wide">
                          Elegir
                        </span>
                      )}
                      {isSelected && (
                        <FaCheck
                          className="size-3 text-primary shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {!canUpdate && (
            <p className="text-sm text-muted-foreground text-center py-2">
              El pedido ya está en el estado final.
            </p>
          )}

          {canUpdate && (
            <div className="flex justify-center gap-3 pt-1">
              <DialogClose asChild>
                <Button variant="outline" className="h-11 px-8 rounded-full">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                onClick={handleConfirm}
                disabled={!selected || isUpdating}
                className="h-11 px-8 rounded-full"
              >
                {isUpdating ? (
                  <>
                    <Spinner className="mr-2" />
                    Actualizando
                  </>
                ) : (
                  MANAGER_ORDERS.updateStatus
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}