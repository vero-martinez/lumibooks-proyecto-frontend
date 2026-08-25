/**
 * Preview visual de tarjeta de crédito reutilizable.
 * Muestra chip, número, nombre y vencimiento.
 */
"use client";

interface CreditCardPreviewProps {
  cardNumber?: string;
  cardHolderFirstName?: string;
  cardHolderLastName?: string;
  expiryDate?: string;
  label?: string;
  className?: string;
}

export function CreditCardPreview({
  cardNumber = "",
  cardHolderFirstName = "",
  cardHolderLastName = "",
  expiryDate = "",
  label = "Tarjeta",
  className,
}: CreditCardPreviewProps) {
  const displayName =
    [cardHolderFirstName, cardHolderLastName].filter(Boolean).join(" ") ||
    "TU NOMBRE";

  return (
    <div
      className={`relative mx-auto max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 p-6 text-primary-foreground shadow-xl shadow-primary/25 ${className ?? ""}`}
    >
      {/* Decoración: círculos de fondo */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-8 size-32 rounded-full bg-black/10"
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between mb-8">
        {/* Chip */}
        <div
          className="h-8 w-10 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-400/80 shadow-inner"
          aria-hidden="true"
        />
        <span className="text-xs font-semibold uppercase tracking-widest opacity-80">
          {label}
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
  );
}