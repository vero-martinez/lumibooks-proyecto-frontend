/**
 * Paso 3 del checkout: revisión general del pedido.
 * Muestra dirección, destinatario y pago en modo solo lectura.
 */
"use client";

import {
  FaMapMarkerAlt,
  FaUser,
  FaIdCard,
  FaPhone,
  FaCreditCard,
} from "react-icons/fa";
import { STEP_REVIEW } from "@/features/orders/constants";
import { CreditCardPreview } from "@/components/shared/CreditCardPreview";
import { cn } from "@/lib/utils";
import type { ShippingSchema } from "@/features/orders/schemas";
import type { PaymentSchema } from "@/features/orders/schemas";
import type { AddressResponse } from "@/features/addresses/types";

interface StepReviewProps {
  shipping: ShippingSchema;
  payment: PaymentSchema;
  address: AddressResponse | undefined;
}

/** Sección de revisión reutilizable */
function ReviewSection({
  icon: Icon,
  title,
  children,
  accent = "primary",
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  children: React.ReactNode;
  accent?: "primary" | "amber" | "emerald";
}) {
  const accentClasses = {
    primary: "bg-primary/10 text-primary",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  } as const;

  return (
    <div className="group rounded-2xl border border-border/60 bg-card/50 p-5 shadow-sm transition-colors hover:border-border sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
              accentClasses[accent],
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
          </span>
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            {title}
          </h3>
        </div>
      </div>
      <div className="mt-4 pl-[42px]">{children}</div>
    </div>
  );
}

/** Fila de dato simple: icono + etiqueta + valor */
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-sm">
      <Icon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
      <span className="text-muted-foreground">{label}</span>
      <span
        className={cn(
          "font-medium text-foreground",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function StepReview({ shipping, payment, address }: StepReviewProps) {
  const maskedCard = `•••• •••• •••• ${payment.cardNumber.replace(/\D/g, "").slice(-4)}`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2" role="group" aria-label="Resumen del pedido">
        {/* Dirección de envío */}
        {address && (
          <ReviewSection
            icon={FaMapMarkerAlt}
            title={STEP_REVIEW.shippingAddress}
            accent="amber"
          >
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                {address.addressLine}
              </p>
              <p className="text-sm text-muted-foreground">
                {address.department.name}, {address.province.name},{" "}
                {address.district.name}
              </p>
              {address.reference && (
                <p className="text-sm text-muted-foreground">
                  Ref: {address.reference}
                </p>
              )}
            </div>
          </ReviewSection>
        )}

        {/* Datos del destinatario */}
        <ReviewSection
          icon={FaUser}
          title={STEP_REVIEW.recipientData}
          accent="emerald"
        >
          <div className="grid grid-cols-1 gap-3">
            <InfoRow
              icon={FaUser}
              label="Nombre:"
              value={shipping.recipientName}
            />
            <InfoRow icon={FaIdCard} label="DNI:" value={shipping.dni} />
            <InfoRow icon={FaPhone} label="Teléfono:" value={shipping.phone} />
          </div>
        </ReviewSection>
      </div>

      {/* Datos de pago */}
      <ReviewSection icon={FaCreditCard} title={STEP_REVIEW.paymentData}>
        <CreditCardPreview
          cardNumber={maskedCard}
          cardHolderFirstName={payment.cardHolderFirstName}
          cardHolderLastName={payment.cardHolderLastName}
          expiryDate={payment.expiryDate}
          label="Terminada en"
        />
      </ReviewSection>
    </div>
  );
}