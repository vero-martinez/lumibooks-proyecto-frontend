/**
 * Dialog con el detalle completo de un pedido.
 * Header con numero de pedido + fechas, luego estado, envío, productos y resumen.
 */
import {
  FaMapMarkerAlt,
  FaUser,
  FaIdCard,
  FaPhone,
  FaRegClock,
} from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { BookCover } from "@/components/shared/BookCover";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { OrderStatusStepper } from "./OrderStatusStepper";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { CLIENT_ORDERS } from "@/features/orders/constants";
import { useClientOrderDetail } from "@/features/orders/hooks";
import type { OrderClientResponse } from "@/features/orders/types";

interface OrderDetailDialogProps {
  order: OrderClientResponse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailDialog({
  order,
  open,
  onOpenChange,
}: OrderDetailDialogProps) {
  const {
    data: detail,
    isLoading,
    isError,
    refetch,
  } = useClientOrderDetail(order?.id ?? null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto p-0 gap-0">
        {/* Header con numero de pedido */}
        <DialogHeader className="bg-primary text-primary-foreground px-6 py-6 space-y-1.5">
          <DialogTitle className="text-xl font-bold pr-8 text-primary-foreground">
            {order
              ? `${CLIENT_ORDERS.detailTitle} #${order.orderNumber}`
              : CLIENT_ORDERS.detailTitle}
          </DialogTitle>
          <DialogDescription className="text-primary-foreground/80">
            {CLIENT_ORDERS.description}
          </DialogDescription>

          {detail && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-xs text-primary-foreground/80">
              <span className="flex items-center gap-1.5">
                <FaRegClock className="size-3" aria-hidden="true" />
                {CLIENT_ORDERS.created}: {formatDateTime(detail.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <FaRegClock className="size-3" aria-hidden="true" />
                {CLIENT_ORDERS.updated}: {formatDateTime(detail.updatedAt)}
              </span>
            </div>
          )}
        </DialogHeader>

        <div className="px-6 py-8">
          {isLoading ? (
            <LoadingState label="Cargando detalle..." />
          ) : isError ? (
            <ErrorState
              message={CLIENT_ORDERS.error}
              description={CLIENT_ORDERS.errorDescription}
              onRetry={refetch}
            />
          ) : detail ? (
            <div className="space-y-10 text-sm">
              {/* Stepper de estado */}
              <div className="rounded-2xl border border-border/20 shadow-sm px-4 py-6">
                <OrderStatusStepper
                  currentStatus={detail.status}
                  createdAt={detail.createdAt}
                  updatedAt={detail.updatedAt}
                />
              </div>

              {/* Datos de envío */}
              <section>
                <SectionTitle label={CLIENT_ORDERS.shippingData} />
                <div className="rounded-2xl border border-border/20 shadow-sm px-4 py-5 space-y-3.5">
                  <InfoRow icon={FaUser} iconColor="text-blue-500" label={detail.recipientName} />
                  <InfoRow icon={FaIdCard} iconColor="text-amber-500" label={`DNI: ${detail.dni}`} />
                  <InfoRow icon={FaPhone} iconColor="text-emerald-500" label={detail.phone} />
                  <InfoRow
                    icon={FaMapMarkerAlt}
                    iconColor="text-rose-500"
                    label={`${detail.addressLine}, ${detail.districtName} · ${detail.provinceName} · ${detail.departmentName}`}
                  />
                </div>
              </section>

              {/* Productos */}
              <section>
                <SectionTitle label={CLIENT_ORDERS.products} />
                <ul className="divide-y divide-border/20 rounded-2xl border border-border/20 shadow-sm overflow-hidden">
                  {detail.items.map((item) => (
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
                          {CLIENT_ORDERS.quantityLabel} {item.quantity} &times;{" "}
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
                <SectionTitle label={CLIENT_ORDERS.summary} />
                <div className="rounded-2xl border border-border/20 shadow-sm px-4 py-5 space-y-3">
                  <CostRow
                    label={CLIENT_ORDERS.summary}
                    value={formatPrice(detail.subtotal)}
                  />
                  <CostRow
                    label="Envío"
                    value={
                      detail.shippingCost > 0
                        ? formatPrice(detail.shippingCost)
                        : "Gratis"
                    }
                  />
                  <Separator className="my-1.5 bg-border/20" />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-foreground text-lg tabular-nums">
                      {formatPrice(detail.total)}
                    </span>
                  </div>
                </div>
              </section>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Titulo de seccion, centrado */
function SectionTitle({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-start mb-4">
      <h4 className="font-semibold text-foreground">{label}</h4>
    </div>
  );
}

/** Fila de info con icono */
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
        aria-hidden
      />
      <span className="text-foreground">{label}</span>
    </div>
  );
}

/** Fila de costo: label + valor */
function CostRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground tabular-nums">{value}</span>
    </div>
  );
}