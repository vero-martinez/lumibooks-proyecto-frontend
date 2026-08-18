/**
 * Paso 2 del checkout: formulario de pago con tarjeta.
 */
"use client";

import { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FaCreditCard,
  FaUser,
  FaCalendarAlt,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";
import { IconInput } from "@/components/shared/IconInput";
import { Card } from "@/components/ui/card";
import { FormField } from "@/components/shared/FormField";
import { STEP_PAYMENT } from "@/features/orders/constants";
import type { PaymentSchema } from "@/features/orders/schemas";

interface StepPaymentProps {
  form: UseFormReturn<PaymentSchema>;
}

/** Formatea el número de tarjeta con espacios cada 4 dígitos */
function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

/** Formatea la fecha de vencimiento como MM/AA */
function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length > 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

export function StepPayment({ form }: StepPaymentProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const cardNumber = watch("cardNumber");
  const expiryDate = watch("expiryDate");
  const cardHolderFirstName = watch("cardHolderFirstName");
  const cardHolderLastName = watch("cardHolderLastName");

  const handleCardNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatCardNumber(e.target.value);
      setValue("cardNumber", formatted, { shouldValidate: true });
    },
    [setValue],
  );

  const handleExpiryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatExpiry(e.target.value);
      setValue("expiryDate", formatted, { shouldValidate: true });
    },
    [setValue],
  );

  const displayName =
    [cardHolderFirstName, cardHolderLastName].filter(Boolean).join(" ") ||
    "TU NOMBRE";

  return (
    <div className="space-y-10">
      {/* Sección: Preview de tarjeta */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            1
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Vista previa de tu tarjeta
          </h3>
        </div>

        <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 p-6 text-primary-foreground shadow-xl shadow-primary/25">
          <div className="relative flex items-center justify-between mb-8">
            {/* Chip */}
            <div
              className="h-8 w-10 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-400/80 shadow-inner"
              aria-hidden="true"
            />
            <span className="text-xs font-semibold uppercase tracking-widest opacity-80">
              Tarjeta
            </span>
          </div>

          <p className="relative font-mono text-xl tracking-[0.2em] mb-7 drop-shadow-sm">
            {cardNumber || "•••• •••• •••• ••••"}
          </p>

          <div className="relative flex items-end justify-between text-sm">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wide opacity-60 mb-0.5">
                Titular
              </p>
              <p className="font-semibold uppercase tracking-wide text-sm truncate max-w-[180px]">
                {displayName}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] uppercase tracking-wide opacity-60 mb-0.5">
                Vence
              </p>
              <p className="font-semibold tracking-wide">
                {expiryDate || "MM/AA"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Datos de la tarjeta */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            2
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Datos de la tarjeta
          </h3>
        </div>

        <Card className="space-y-5 rounded-2xl border-2 border-primary/25 bg-gradient-to-br from-primary/[0.06] to-transparent p-5 ring-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label={STEP_PAYMENT.cardHolderFirstName}
              name="cardHolderFirstName"
              error={errors.cardHolderFirstName}
              required
            >
              <IconInput
                icon={FaUser}
                id="cardHolderFirstName"
                placeholder={STEP_PAYMENT.cardHolderFirstNamePlaceholder}
                autoComplete="cc-given-name"
                aria-invalid={!!errors.cardHolderFirstName}
                {...register("cardHolderFirstName")}
              />
            </FormField>

            <FormField
              label={STEP_PAYMENT.cardHolderLastName}
              name="cardHolderLastName"
              error={errors.cardHolderLastName}
              required
            >
              <IconInput
                icon={FaUser}
                id="cardHolderLastName"
                placeholder={STEP_PAYMENT.cardHolderLastNamePlaceholder}
                autoComplete="cc-family-name"
                aria-invalid={!!errors.cardHolderLastName}
                {...register("cardHolderLastName")}
              />
            </FormField>
          </div>

          <FormField
            label={STEP_PAYMENT.cardNumber}
            name="cardNumber"
            error={errors.cardNumber}
            required
          >
            <IconInput
              icon={FaCreditCard}
              id="cardNumber"
              placeholder={STEP_PAYMENT.cardNumberPlaceholder}
              className="font-mono tracking-wider"
              autoComplete="cc-number"
              aria-invalid={!!errors.cardNumber}
              {...register("cardNumber", {
                onChange: handleCardNumberChange,
              })}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label={STEP_PAYMENT.expiryDate}
              name="expiryDate"
              error={errors.expiryDate}
              required
            >
              <IconInput
                icon={FaCalendarAlt}
                id="expiryDate"
                placeholder={STEP_PAYMENT.expiryDatePlaceholder}
                maxLength={5}
                autoComplete="cc-exp"
                aria-invalid={!!errors.expiryDate}
                {...register("expiryDate", {
                  onChange: handleExpiryChange,
                })}
              />
            </FormField>

            <FormField
              label={STEP_PAYMENT.cvv}
              name="cvv"
              error={errors.cvv}
              hint={STEP_PAYMENT.cvvHint}
              required
            >
              <IconInput
                icon={FaLock}
                id="cvv"
                type="password"
                placeholder={STEP_PAYMENT.cvvPlaceholder}
                maxLength={4}
                autoComplete="cc-csc"
                aria-invalid={!!errors.cvv}
                {...register("cvv")}
              />
            </FormField>
          </div>
        </Card>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <FaShieldAlt className="size-3" aria-hidden="true" />
          Tus datos de pago están protegidos y encriptados
        </p>
      </section>
    </div>
  );
}