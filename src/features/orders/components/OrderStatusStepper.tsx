/**
 * Stepper visual que muestra el progreso de estados de una orden.
 * Muestra la fecha debajo del paso actual.
 */
import { FaClipboardList, FaBoxOpen, FaTruck, FaCheckCircle } from "react-icons/fa";
import { cn, formatDate } from "@/lib/utils";
import { ORDER_STATUS_LABEL, ORDER_STATUS_STEPS } from "@/features/orders/constants";
import type { OrderStatus } from "@/features/orders/types";

const STATUS_ICON: Record<OrderStatus, React.ComponentType<{ className?: string }>> = {
    PENDIENTE: FaClipboardList,
    EN_PREPARACION: FaBoxOpen,
    ENVIADO: FaTruck,
    ENTREGADO: FaCheckCircle,
};

interface OrderStatusStepperProps {
    currentStatus: OrderStatus;
    createdAt: string;
    updatedAt: string;
}

function stepState(
    stepStatus: OrderStatus,
    currentStatus: OrderStatus,
): "completed" | "current" | "pending" {
    const currentIndex = ORDER_STATUS_STEPS.indexOf(currentStatus);
    const stepIndex = ORDER_STATUS_STEPS.indexOf(stepStatus);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "pending";
}

export function OrderStatusStepper({
    currentStatus,
    createdAt,
    updatedAt,
}: OrderStatusStepperProps) {
    const currentDate =
        currentStatus === "PENDIENTE"
            ? formatDate(createdAt)
            : formatDate(updatedAt);

    return (
        <ol
            className="flex items-start w-full"
            aria-label="Progreso del pedido"
        >
            {ORDER_STATUS_STEPS.map((stepStatus, index) => {
                const state = stepState(stepStatus, currentStatus);
                const isLast = index === ORDER_STATUS_STEPS.length - 1;
                const StepIcon = STATUS_ICON[stepStatus];

                return (
                    <li
                        key={stepStatus}
                        aria-current={state === "current" ? "step" : undefined}
                        aria-label={`${ORDER_STATUS_LABEL[stepStatus]}${state === "completed" ? " — completado" : state === "current" ? " — estado actual" : " — pendiente"}`}
                        className={cn(
                            "flex items-start",
                            !isLast && "flex-1",
                        )}
                    >
                        {/* Circulo */}
                        <div className="flex flex-col items-center shrink-0 w-16 sm:w-20">
                            <span
                                className={cn(
                                    "flex size-9 sm:size-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                                    state === "completed" &&
                                        "bg-accent/70 border-accent text-primary",
                                    state === "current" &&
                                        "bg-accent border-accent text-primary ring-[5px] ring-accent/50 scale-110",
                                    state === "pending" &&
                                        "bg-background border-muted text-muted-foreground",
                                )}
                            >
                                <StepIcon className="size-4" aria-hidden="true" />
                            </span>
                            <span
                                className={cn(
                                    "mt-2 text-[11px] sm:text-xs text-center leading-tight",
                                    state === "current"
                                        ? "font-semibold text-foreground"
                                        : state === "completed"
                                            ? "font-medium text-primary/80"
                                            : "font-medium text-muted-foreground",
                                )}
                            >
                                {ORDER_STATUS_LABEL[stepStatus]}
                            </span>
                            <span
                                className={cn(
                                    "mt-1 text-[10px] text-muted-foreground transition-opacity duration-300",
                                    state === "current" ? "opacity-100" : "opacity-0",
                                )}
                            >
                                {state === "current" ? currentDate : "\u00A0"}
                            </span>
                        </div>

                        {/* Linea conectora */}
                        {!isLast && (
                            <div
                                className="flex-1 mx-1 sm:mx-2 pt-[18px] sm:pt-[19px]"
                                aria-hidden="true"
                            >
                                <div className="h-1 bg-muted relative overflow-hidden rounded-full">
                                    <div
                                        className={cn(
                                            "absolute inset-y-0 left-0 bg-primary/40 rounded-full transition-all duration-500 ease-out",
                                            state === "completed" ? "w-full" : "w-0",
                                        )}
                                    />
                                </div>
                            </div>
                        )}
                    </li>
                );
            })}
        </ol>
    );
}