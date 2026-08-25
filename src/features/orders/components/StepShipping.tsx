/**
 * Paso 1 del checkout: selección de dirección de envío
 * y datos del destinatario.
 */
"use client";

import { useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FaMapMarkerAlt,
  FaExchangeAlt,
  FaExclamationTriangle,
  FaUser,
  FaIdCard,
  FaPhone,
  FaCheckCircle,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IconInput } from "@/components/shared/IconInput";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FormField } from "@/components/shared/FormField";
import { useCheckoutPreview } from "@/features/orders/hooks";
import { useAddresses } from "@/features/addresses/hooks";
import { SelectAddressDialog } from "@/features/orders/components/SelectAddressDialog";
import { STEP_SHIPPING } from "@/features/orders/constants";
import type { ShippingSchema } from "@/features/orders/schemas";
import { cn } from "@/lib/utils";

interface StepShippingProps {
  form: UseFormReturn<ShippingSchema>;
  selectedAddressId: number | null;
  onAddressChange: (addressId: number) => void;
}

export function StepShipping({
  form,
  selectedAddressId,
  onAddressChange,
}: StepShippingProps) {
  const { data: addresses = [] } = useAddresses();
  const { data: preview } = useCheckoutPreview(selectedAddressId);

  const [selectOpen, setSelectOpen] = useState(false);

  const {
    register,
    setValue,
    formState: { errors },
  } = form;

  const selectedAddress = useMemo(
    () => addresses.find((a) => a.id === selectedAddressId),
    [addresses, selectedAddressId],
  );

  const isShippingAvailable = preview?.address?.isShippingAvailable ?? false;

  return (
    <div className="space-y-10">
      {/* Sección: Dirección de envío */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              1
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              {STEP_SHIPPING.addressSection}
            </h3>
          </div>
        </div>

        {/* Card de dirección seleccionada */}
        {selectedAddress ? (
          <Card
            className={cn(
              "relative overflow-hidden rounded-2xl border-2 p-0 ring-0 bg-transparent transition-all",
              isShippingAvailable
                ? "border-primary/25 bg-gradient-to-br from-primary/[0.06] to-transparent"
                : "border-destructive/40 bg-destructive/5",
            )}
          >
            <div className="p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
                <div className="flex items-start gap-4 min-w-0">
                  <span
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-xl",
                      isShippingAvailable
                        ? "bg-foreground/90 text-primary-foreground"
                        : "bg-destructive/20 text-destructive",
                    )}
                  >
                    <FaMapMarkerAlt size={18} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-foreground leading-snug">
                        {selectedAddress.addressLine}
                      </p>
                      {selectedAddress.isDefault && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] font-medium bg-accent"
                        >
                          {STEP_SHIPPING.defaultBadge}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-secondary-foreground leading-relaxed">
                      {selectedAddress.department.name} ·{" "}
                      {selectedAddress.province.name} ·{" "}
                      {selectedAddress.district.name}
                    </p>
                    {selectedAddress.reference && (
                      <p className="mt-2 text-sm text-secondary-foreground/70">
                        <span className="font-medium text-muted-foreground">
                          {STEP_SHIPPING.referencePrefix}
                        </span>
                        {selectedAddress.reference}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={() => setSelectOpen(true)}
                  className="gap-2 py-4 px-4 w-full sm:w-auto"
                >
                  <FaExchangeAlt className="size-3" aria-hidden="true" />
                  {STEP_SHIPPING.changeAddress}
                </Button>
              </div>
            </div>

            {/* Indicador de envío */}
            {isShippingAvailable ? (
              <div className="flex items-center gap-2 border-t border-primary/15 bg-success-bg/20 px-5 py-3 text-sm font-medium text-success">
                <FaCheckCircle className="size-4" aria-hidden="true" />
                <span>{STEP_SHIPPING.shippingAvailable}</span>
              </div>
            ) : (
              <div className="flex items-start gap-2.5 border-t border-destructive/20 bg-destructive/10 px-5 py-3 text-sm text-destructive">
                <FaExclamationTriangle
                  className="size-4 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold">
                    {STEP_SHIPPING.shippingNotAvailable}
                  </p>
                  <p className="text-xs text-destructive/80">
                    {STEP_SHIPPING.shippingNotAvailableHint}
                  </p>
                </div>
              </div>
            )}
          </Card>
        ) : (
          <button
            type="button"
            onClick={() => setSelectOpen(true)}
            className="flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-border py-10 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
          >
            <FaMapMarkerAlt className="size-6" aria-hidden="true" />
            <span className="text-sm font-medium">
              {addresses.length > 0
                ? STEP_SHIPPING.changeAddress
                : STEP_SHIPPING.addFirstAddress}
            </span>
          </button>
        )}
      </section>

      {/* Sección: Datos del destinatario */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            2
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            {STEP_SHIPPING.recipientSection}
          </h3>
        </div>

        <Card
          className={cn(
            "space-y-5 rounded-2xl border-2 p-5 ring-0 transition-all",
            isShippingAvailable
              ? "border-primary/25 bg-gradient-to-br from-primary/[0.06] to-transparent"
              : "border-destructive/40 bg-destructive/5",
          )}
        >
          <FormField
            label={STEP_SHIPPING.recipientName}
            name="recipientName"
            error={errors.recipientName}
            required
          >
            <IconInput
              icon={FaUser}
              id="recipientName"
              placeholder={STEP_SHIPPING.recipientNamePlaceholder}
              aria-invalid={!!errors.recipientName}
              {...register("recipientName")}
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label={STEP_SHIPPING.dni}
              name="dni"
              error={errors.dni}
              required
            >
              <IconInput
                icon={FaIdCard}
                id="dni"
                placeholder={STEP_SHIPPING.dniPlaceholder}
                maxLength={8}
                aria-invalid={!!errors.dni}
                {...register("dni")}
              />
            </FormField>

            <FormField
              label={STEP_SHIPPING.phone}
              name="phone"
              error={errors.phone}
              required
            >
              <IconInput
                icon={FaPhone}
                id="phone"
                placeholder={STEP_SHIPPING.phonePlaceholder}
                maxLength={9}
                aria-invalid={!!errors.phone}
                {...register("phone")}
              />
            </FormField>
          </div>
        </Card>
      </section>

      {/* Dialogs de dirección */}
      <SelectAddressDialog
        open={selectOpen}
        onOpenChange={setSelectOpen}
        selectedAddressId={selectedAddressId}
        onSelectAddress={(id) => {
          onAddressChange(id);
          setValue("addressId", id, { shouldValidate: true });
        }}
      />
    </div>
  );
}