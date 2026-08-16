"use client";

/**
 * Diálogo para crear o editar una dirección.
 * Contiene el formulario y despacha la mutación correspondiente
 * (create o update) según haya una dirección preexistente.
 */
import { useMemo } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddressForm } from "./AddressForm";
import { useCreateAddress, useUpdateAddress } from "@/features/addresses/hooks";
import type { AddressResponse } from "@/features/addresses/types";
import type { AddressSchema } from "@/features/addresses/schemas";
import { ADDRESS_FORM, ADDRESS_ICON_SIZE } from "@/features/addresses/constants";

interface AddressFormDialogProps {
  open: boolean;
  address?: AddressResponse | null;
  onClose: () => void;
}

export function AddressFormDialog({ open, address, onClose }: AddressFormDialogProps) {
  const createAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();
  const isSubmitting = createAddress.isPending || updateAddress.isPending;

  const defaultValues = useMemo(
    () =>
      address
        ? {
            departmentId: address.department.id,
            provinceId: address.province.id,
            districtId: address.district.id,
            addressLine: address.addressLine,
            reference: address.reference ?? "",
          }
        : { addressLine: "", reference: "" },
    [address],
  );

  const handleSubmit = (values: AddressSchema) => {
    const request = {
      districtId: values.districtId,
      addressLine: values.addressLine,
      reference: values.reference,
    };
    if (address) {
      updateAddress.mutate({ addressId: address.id, request }, { onSuccess: onClose });
    } else {
      createAddress.mutate(request, { onSuccess: onClose });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent showCloseButton className="sm:max-w-xl p-4">
        <DialogHeader className="items-center gap-3 px-6 pt-6 pb-2 text-center">
          <span className="flex items-center justify-center size-16 rounded-full bg-primary/10">
            <FaMapMarkerAlt size={ADDRESS_ICON_SIZE} className="text-primary" aria-hidden="true" />
          </span>
          <DialogTitle className="text-lg">{address ? ADDRESS_FORM.editTitle : ADDRESS_FORM.createTitle}</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 pt-2">
          <AddressForm
            defaultValues={defaultValues}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}