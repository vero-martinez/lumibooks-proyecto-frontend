/**
 * Dialog para asignar o reasignar un gestor a una orden.
 * Utiliza SearchableSelect para buscar y seleccionar el gestor.
 */
"use client";

import { useState } from "react";
import { FaUserTie } from "react-icons/fa";
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
import { SearchableSelect } from "@/components/shared/SearchableSelect";
import { useGestores } from "@/features/orders/hooks";
import { ADMIN_ORDERS } from "@/features/orders/constants";
import type {
  AdminOrderSummaryResponse,
  GestorSummaryResponse,
} from "@/features/orders/types";

interface AssignManagerDialogProps {
  order: AdminOrderSummaryResponse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (orderId: number, managerId: number) => void;
  isUpdating: boolean;
}

export function AssignManagerDialog({
  order,
  open,
  onOpenChange,
  onConfirm,
  isUpdating,
}: AssignManagerDialogProps) {
  const [selectedManagerId, setSelectedManagerId] = useState<
    number | undefined
  >(undefined);
  const { data: gestores, isLoading: loadingGestores } = useGestores();

  if (!order) return null;

  const gestorOptions =
    gestores?.map((g: GestorSummaryResponse) => ({
      id: g.id,
      name: g.fullName,
    })) ?? [];

  const handleConfirm = () => {
    if (!selectedManagerId) return;
    onConfirm(order.id, selectedManagerId);
    setSelectedManagerId(undefined);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) setSelectedManagerId(undefined);
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm overflow-hidden">
        <DialogHeader className="items-center gap-1 px-6 pt-6 pb-5 text-center">
          <span className="flex items-center justify-center size-16 rounded-full bg-primary/10">
            <FaUserTie size={24} className="text-primary" aria-hidden="true" />
          </span>
          <DialogTitle className="text-lg">
            {ADMIN_ORDERS.managerDialogTitle}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Pedido #{order.orderNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          <div className="rounded-2xl border border-border/20 shadow-sm px-4 py-3.5">
            <p className="text-sm text-muted-foreground mb-1">
              Gestor actual
            </p>
            <p className="text-sm font-medium text-foreground">
              {order.managerName ?? ADMIN_ORDERS.noManager}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              {ADMIN_ORDERS.managerDialogDescription}
            </label>
            <SearchableSelect
              value={selectedManagerId}
              onValueChange={setSelectedManagerId}
              options={gestorOptions}
              placeholder="Seleccionar gestor..."
              searchPlaceholder="Buscar gestor..."
              emptyMessage="No se encontraron gestores"
              loading={loadingGestores}
              loadingMessage="Cargando gestores..."
            />
          </div>

          <div className="flex justify-center gap-3 pt-1">
            <DialogClose asChild>
              <Button variant="outline" className="h-11 px-8 rounded-full">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              onClick={handleConfirm}
              disabled={!selectedManagerId || isUpdating}
              className="h-11 px-8 rounded-full"
            >
              {isUpdating ? (
                <>
                  <Spinner className="mr-2" />
                  Asignando
                </>
              ) : (
                ADMIN_ORDERS.managerDialogConfirm
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}