"use client";

/**
 * Card de dirección para la página de direcciones.
 * Muestra los datos de la dirección y las acciones
 * (predeterminada, editar y eliminar).
 */
import {
  FaStar,
  FaRegStar,
  FaPen,
  FaTrash,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { cn } from "@/lib/utils";
import type { AddressResponse } from "@/features/addresses/types";
import { ADDRESS_CARD } from "@/features/addresses/constants";

interface AddressCardProps {
  address: AddressResponse;
  isDefaultPending: boolean;
  onEdit: (address: AddressResponse) => void;
  onDelete: (address: AddressResponse) => void;
  onSetDefault: (address: AddressResponse) => void;
}

const PLAIN_ICON_BUTTON =
  "flex items-center justify-center p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export function AddressCard({
  address,
  isDefaultPending,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  const { isDefault } = address;

  return (
    <div className="grid grid-cols-[1fr_56px] overflow-hidden rounded-2xl border border-border/40 shadow-sm transition-all hover:shadow-md">
      {/* Header izquierdo */}
      <div
        className={cn(
          "flex items-center border-b px-5 py-3",
          isDefault
            ? "border-accent bg-accent"
            : "border-border/60 bg-muted/40",
        )}
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-foreground">
          {isDefault ? ADDRESS_CARD.defaultBadge : ADDRESS_CARD.notDefaultBadge}
        </span>
      </div>

      {/* Header derecho */}
      <div className="flex items-center justify-center border-b border-l border-border/60 py-2">
        {isDefault ? (
          <span
            className="flex items-center justify-center "
            aria-hidden="true"
          >
            <FaStar size={18} className="text-accent-foreground"/>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onSetDefault(address)}
            disabled={isDefaultPending}
            aria-label={ADDRESS_CARD.setDefaultLabel(address.addressLine)}
            className={cn(
              PLAIN_ICON_BUTTON,
              "text-muted-foreground/80 hover:text-accent-foreground",
            )}
          >
            <FaRegStar size={18} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Cuerpo izquierdo: datos de la dirección */}
      <div className="flex items-start gap-3 p-5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <FaMapMarkerAlt
            size={16}
            className="text-primary"
            aria-hidden="true"
          />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{address.addressLine}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {address.department.name}, {address.province.name},{" "}
            {address.district.name}
          </p>
          {address.reference && (
            <p className="mt-1 text-sm text-muted-foreground">
              {ADDRESS_CARD.referencePrefix}
              {address.reference}
            </p>
          )}
        </div>
      </div>

      {/* Cuerpo derecho: editar / eliminar */}
      <div className="grid grid-rows-2 divide-y divide-border/60 border-l border-border/60">
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => onEdit(address)}
            aria-label={ADDRESS_CARD.editLabel(address.addressLine)}
            className={cn(
              PLAIN_ICON_BUTTON,
              "text-foreground hover:text-foreground/70",
            )}
          >
            <FaPen size={15} aria-hidden="true" />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => onDelete(address)}
            aria-label={ADDRESS_CARD.deleteLabel(address.addressLine)}
            className={cn(
              PLAIN_ICON_BUTTON,
              "text-foreground hover:text-destructive",
            )}
          >
            <FaTrash size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}