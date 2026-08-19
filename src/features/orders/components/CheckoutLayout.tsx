/**
 * Layout principal del checkout. Orquesta el wizard de 3 pasos:
 * 1. Datos de envío (dirección + destinatario)
 * 2. Datos de pago
 * 3. Revisión del pedido
 *
 * Maneja la validación por paso: solo permite avanzar si el paso actual está completo.
 */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaSpinner,
  FaLock,
} from "react-icons/fa";
import { CheckoutStepper } from "./CheckoutStepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StepShipping } from "./StepShipping";
import { StepPayment } from "./StepPayment";
import { StepReview } from "./StepReview";
import { CheckoutSummary } from "./CheckoutSummary";
import { useAddresses } from "@/features/addresses/hooks";
import { useCheckoutPreview, useCreateOrder } from "@/features/orders/hooks";
import {
  shippingSchema,
  paymentSchema,
  type ShippingSchema,
  type PaymentSchema,
} from "@/features/orders/schemas";
import {
  CHECKOUT_STEPS,
  STEP_SHIPPING,
  STEP_PAYMENT,
  STEP_REVIEW,
} from "@/features/orders/constants";
import { ROUTES } from "@/lib/routes";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function CheckoutLayout() {
  const router = useRouter();
  const createOrder = useCreateOrder();

  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [shippingData, setShippingData] = useState<ShippingSchema | null>(null);

  // Direcciones
  const { data: addresses = [] } = useAddresses();

  // Dirección predeterminada (derivada, no vía effect)
  const defaultAddress = useMemo(
    () => addresses.find((a) => a.isDefault) ?? addresses[0] ?? null,
    [addresses],
  );

  // ID efectivo: el seleccionado o la predeterminada
  const effectiveAddressId = selectedAddressId ?? defaultAddress?.id ?? null;

  // Preview del checkout
  const { data: preview } = useCheckoutPreview(effectiveAddressId);

  // Formularios por paso
  const shippingForm = useForm<ShippingSchema>({
    resolver: zodResolver(shippingSchema),
    mode: "onChange",
    defaultValues: {
      addressId: 0,
      recipientName: "",
      dni: "",
      phone: "",
    },
  });

  const paymentForm = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),
    mode: "onChange",
    defaultValues: {
      cardHolderFirstName: "",
      cardHolderLastName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  // Sincronizar addressId del form cuando cambia la selección
  const handleAddressChange = useCallback(
  (id: number) => {
    setSelectedAddressId(id);
  },
  [],
);

  // Sincronizar dirección efectiva al form (incluye la predeterminada al cargar)
  useEffect(() => {
    if (effectiveAddressId) {
      shippingForm.setValue("addressId", effectiveAddressId, {
        shouldValidate: true,
      });
    }
  }, [effectiveAddressId, shippingForm]);

  // Validación de completitud por paso
  const shippingValues = shippingForm.watch();

  const isShippingComplete = useMemo(() => {
    const result = shippingSchema.safeParse(shippingValues);
    const hasShipping = preview?.address?.isShippingAvailable === true;
    return result.success && hasShipping;
  }, [shippingValues, preview]);

  const paymentValues = paymentForm.watch();

  const isPaymentComplete = useMemo(() => {
    return paymentSchema.safeParse(paymentValues).success;
  }, [paymentValues]);

  const isStepComplete =
    currentStep === 1 ? isShippingComplete : isPaymentComplete;

  // Navegación
  const handleNext = useCallback(() => {
    if (currentStep === 1) {
      setShippingData(shippingForm.getValues());
    }
    setCurrentStep((s) => Math.min(s + 1, 3));
  }, [currentStep, shippingForm]);

  const handleBack = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  }, []);

  // Envío final
  const handleConfirm = useCallback(() => {
    if (!shippingData || !preview?.address) return;

    createOrder.mutate(
      {
        addressId: shippingData.addressId,
        recipientName: shippingData.recipientName,
        dni: shippingData.dni,
        phone: shippingData.phone,
        payment: paymentForm.getValues(),
      },
      {
        onSuccess: () => {
          router.push(ROUTES.client.orderConfirmation);
        },
      },
    );
  }, [shippingData, preview, createOrder, paymentForm, router]);

  const selectedAddress = useMemo(
    () => addresses.find((a) => a.id === effectiveAddressId),
    [addresses, effectiveAddressId],
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <Breadcrumb className="mb-8">
          <BreadcrumbList className="gap-2">
            <BreadcrumbItem className="uppercase">
              <BreadcrumbLink asChild>
                <Link href={ROUTES.client.cart}>Carrito</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="uppercase">
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <CheckoutStepper steps={CHECKOUT_STEPS} currentStep={currentStep} />
      </div>

      {/* Contenido: formulario + summary */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-16 items-start">
        {/* Formulario del paso actual */}
        <Card className="min-w-0 border-border/80 shadow-sm bg-transparent">
          <CardContent className="p-6 sm:p-8">
            {currentStep === 1 && (
              <StepShipping
                form={shippingForm}
                selectedAddressId={effectiveAddressId}
                onAddressChange={handleAddressChange}
              />
            )}

            {currentStep === 2 && <StepPayment form={paymentForm} />}

            {currentStep === 3 && shippingData && (
              <StepReview
                shipping={shippingData}
                payment={paymentForm.getValues()}
                address={selectedAddress}
              />
            )}
          </CardContent>
        </Card>

        {/* Sidebar: Resumen */}
        <div className="space-y-8">
          {preview && (
            <CheckoutSummary
              items={preview.items}
              subtotal={preview.subtotal}
              shippingCost={preview.address.shippingCost}
              isShippingAvailable={preview.address.isShippingAvailable}
              total={preview.total}
            >
              <div className="flex justify-center">
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepComplete}
                    size="lg"
                    className="gap-2 px-8 shadow-sm shadow-primary/20"
                  >
                    {STEP_SHIPPING.continue}
                    <FaArrowRight className="size-3.5" aria-hidden="true" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleConfirm}
                    disabled={createOrder.isPending}
                    size="lg"
                    className="gap-2 px-8 shadow-sm shadow-primary/20"
                  >
                    {createOrder.isPending ? (
                      <>
                        <FaSpinner
                          className="size-4 animate-spin"
                          aria-hidden="true"
                        />
                        {STEP_REVIEW.confirming}
                      </>
                    ) : (
                      <>
                        <FaCheck className="size-3.5" aria-hidden="true" />
                        {STEP_REVIEW.confirmAndPay}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CheckoutSummary>
          )}

          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <FaLock className="size-2.5" aria-hidden="true" />
            Pago seguro y encriptado
          </p>
        </div>
      </div>


      {/* Botón volver */}
      {currentStep > 1 && (
        <div className="pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={createOrder.isPending}
            className="gap-2"
          >
            <FaArrowLeft className="size-3.5" aria-hidden="true" />
            {currentStep === 2 ? STEP_PAYMENT.back : STEP_REVIEW.back}
          </Button>
        </div>
      )}
    </div>
  );
}