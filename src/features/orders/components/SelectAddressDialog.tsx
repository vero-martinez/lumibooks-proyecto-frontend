/**
 * Diálogo de selección de dirección de envío.
 * Encapsula la lista de direcciones, agregar nueva y confirmar eliminación.
 */
"use client";

import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AddressFormDialog } from "@/features/addresses/components";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import {
  useAddresses,
  useDeleteAddress,
} from "@/features/addresses/hooks";
import { STEP_SHIPPING } from "@/features/orders/constants";
import type { AddressResponse } from "@/features/addresses/types";
import { cn } from "@/lib/utils";

interface SelectAddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAddressId: number | null;
  onSelectAddress: (addressId: number) => void;
}

export function SelectAddressDialog({
  open,
  onOpenChange,
  selectedAddressId,
  onSelectAddress,
}: SelectAddressDialogProps) {
  const { data: addresses = [], isLoading } = useAddresses();
  const deleteAddress = useDeleteAddress();

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AddressResponse | null>(null);

  const handleSelectAddress = (address: AddressResponse) => {
    onSelectAddress(address.id);
    onOpenChange(false);
  };

  const handleDeleteAddress = () => {
    if (!deleteTarget) return;
    deleteAddress.mutate(deleteTarget.id, {
      onSuccess: () => {
        if (deleteTarget.id === selectedAddressId) {
          const remaining = addresses.filter((a) => a.id !== deleteTarget.id);
          const next = remaining.find((a) => a.isDefault) ?? remaining[0];
          if (next) {
            onSelectAddress(next.id);
          } else {
            onSelectAddress(0);
          }
        }
        setDeleteTarget(null);
      },
    });
  };

  const atLimit = addresses.length >= 5;

  return (
    <>
      {/* Dialog: Seleccionar dirección */}
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) onOpenChange(false);
        }}
      >
        <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden">
          <DialogHeader className="items-center gap-3 px-8 pt-10 pb-6 text-center">
            <span className="flex items-center justify-center size-16 rounded-2xl bg-primary/10">
              <FaMapMarkerAlt size={24} className="text-primary" aria-hidden="true" />
            </span>
            <DialogTitle className="text-xl">
              {STEP_SHIPPING.selectAddressTitle}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-center max-w-sm">
              {STEP_SHIPPING.selectAddressDescription}
            </DialogDescription>
          </DialogHeader>

          <div className="px-8 pb-4 max-h-[50vh] overflow-y-auto">
            {isLoading ? (
              <div className="py-14 text-center text-sm text-muted-foreground">
                {STEP_SHIPPING.loadingAddresses}
              </div>
            ) : addresses.length === 0 ? (
              <div className="py-14 text-center text-sm text-muted-foreground">
                {STEP_SHIPPING.noAddresses}
              </div>
            ) : (
              <ul className="space-y-3" role="radiogroup">
                {addresses.map((address) => {
                  const isSelected = address.id === selectedAddressId;
                  return (
                    <li
                      key={address.id}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSelectAddress(address);
                        }
                      }}
                      className={cn(
                        "group relative flex items-start gap-4 rounded-2xl border-2 p-5 cursor-pointer transition-all",
                        isSelected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border/50 hover:border-border hover:bg-muted/30",
                      )}
                      onClick={() => handleSelectAddress(address)}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-muted-foreground/30",
                        )}
                        aria-hidden="true"
                      >
                        {isSelected && (
                          <span className="size-2 rounded-full bg-primary-foreground" />
                        )}
                      </span>

                      <div className="min-w-0 flex-1 space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-sm text-foreground truncate">
                            {address.addressLine}
                          </p>
                          {address.isDefault && (
                            <Badge variant="secondary" className="text-[10px] font-medium bg-accent shrink-0">
                              {STEP_SHIPPING.defaultBadge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {address.department.name}, {address.province.name},{" "}
                          {address.district.name}
                        </p>
                        {address.reference && (
                          <p className="text-xs text-muted-foreground/70">
                            {STEP_SHIPPING.referencePrefix} {address.reference}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteTarget(address);
                        }}
                        disabled={deleteAddress.isPending}
                        aria-label={`Eliminar dirección ${address.addressLine}`}
                        className="shrink-0 mt-0.5 p-2 rounded-lg text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
                      >
                        <FaTrash className="size-3.5" aria-hidden="true" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="px-6 py-6 mt-2 space-y-3">
            <Button
              type="button"
              variant="default"
              onClick={() => {
                onOpenChange(false);
                setAddDialogOpen(true);
              }}
              disabled={atLimit}
              size="lg"
              className="w-full gap-2 py-6"
            >
              <FaPlus className="size-3.5" aria-hidden="true" />
              {STEP_SHIPPING.addAddress}
            </Button>
            {atLimit && (
              <p className="text-xs text-muted-foreground text-center">
                {STEP_SHIPPING.addressLimitReached}{" "}
                {STEP_SHIPPING.addressLimitHint}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog: Agregar dirección */}
      <AddressFormDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
      />

      {/* Dialog: Confirmar eliminación */}
      <ConfirmDialog
        open={!!deleteTarget}
        title={STEP_SHIPPING.deleteTitle}
        message={STEP_SHIPPING.deleteMessage(deleteTarget?.addressLine ?? "")}
        confirmLabel={STEP_SHIPPING.deleteConfirmLabel}
        confirmClassName="hover:bg-destructive/90"
        isLoading={deleteAddress.isPending}
        onConfirm={handleDeleteAddress}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}