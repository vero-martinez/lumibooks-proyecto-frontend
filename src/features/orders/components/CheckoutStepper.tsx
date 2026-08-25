/**
 * Indicador de progreso visual del wizard de checkout.
 */
import { FaCheck } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface CheckoutStepperProps {
  steps: readonly { number: number; label: string }[];
  currentStep: number;
}

function stepState(
  stepNumber: number,
  currentStep: number,
): "completed" | "current" | "pending" {
  if (currentStep > stepNumber) return "completed";
  if (currentStep === stepNumber) return "current";
  return "pending";
}

const STEP_STATE_LABEL: Record<
  "completed" | "current" | "pending",
  (label: string, number: number) => string
> = {
  completed: (label, number) => `Paso ${number}: ${label} — completado`,
  current: (label, number) => `Paso ${number}: ${label} — paso actual`,
  pending: (label, number) => `Paso ${number}: ${label} — pendiente`,
};

export function CheckoutStepper({
  steps,
  currentStep,
}: CheckoutStepperProps) {
  return (
    <nav aria-label="Pasos del checkout">
      <ol className="flex items-start w-full sm:justify-center">
        {steps.map((step, index) => {
          const state = stepState(step.number, currentStep);
          const isLast = index === steps.length - 1;

          return (
            <li
              key={step.number}
              aria-current={state === "current" ? "step" : undefined}
              aria-label={STEP_STATE_LABEL[state](step.label, step.number)}
              className={cn(
                "flex items-start",
                !isLast && "flex-1 sm:flex-none",
              )}
            >
              {/* Columna: circulo + label */}
              <div className="flex flex-col items-center shrink-0">
                <span
                  className={cn(
                    "flex size-9 sm:size-12 items-center justify-center rounded-full text-sm sm:text-base font-semibold shrink-0 transition-all duration-300",
                    state === "completed" &&
                      "bg-primary text-primary-foreground shadow-sm shadow-primary/30",
                    state === "current" &&
                      "bg-primary text-primary-foreground ring-4 ring-primary/15 scale-105",
                    state === "pending" &&
                      "bg-muted text-muted-foreground",
                  )}
                >
                  {state === "completed" ? (
                    <FaCheck
                      className="size-3.5 sm:size-4"
                      aria-hidden="true"
                    />
                  ) : (
                    step.number
                  )}
                </span>
                <span
                  className={cn(
                    "mt-2 text-[11px] sm:text-sm font-medium text-center leading-tight transition-colors max-w-16 sm:max-w-none",
                    state === "current"
                      ? "text-foreground"
                      : state === "completed"
                        ? "text-foreground/70"
                        : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Linea conectora */}
              {!isLast && (
                <div
                  className="flex items-center h-9 sm:h-12 mx-1.5 sm:mx-4 flex-1 sm:flex-none min-w-4 sm:min-w-0"
                  aria-hidden="true"
                >
                  <div className="w-full sm:w-36 h-px bg-border relative overflow-hidden rounded-full">
                    <div
                      className={cn(
                        "absolute inset-y-0 left-0 bg-primary transition-all duration-500 ease-out",
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
    </nav>
  );
}