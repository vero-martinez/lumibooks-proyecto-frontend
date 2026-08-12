"use client";

/**
 * Página de direcciones del usuario autenticado.
 * Lista las direcciones guardadas y permite crear, editar, eliminar
 * y establecer una dirección como predeterminada.
 */
import { useState } from "react";
import { FaMapMarkerAlt, FaPlus, FaStar } from "react-icons/fa";
import { useAddresses, useDeleteAddress, useSetDefaultAddress } from "@/features/addresses/hooks";
import { AddressCard, AddressFormDialog } from "@/features/addresses/components";
import type { AddressResponse } from "@/features/addresses/types";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";

export default function AddressesPage() {
  const { data: addresses, isLoading, isError, refetch } = useAddresses();
  const deleteAddress = useDeleteAddress();
  const setDefaultAddress = useSetDefaultAddress();

  const [formOpen, setFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressResponse | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AddressResponse | null>(null);
  const [defaultTarget, setDefaultTarget] = useState<AddressResponse | null>(null);

  const handleOpenCreate = () => {
    setEditingAddress(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (address: AddressResponse) => {
    setEditingAddress(address);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingAddress(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteAddress.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  const handleSetDefault = () => {
    if (!defaultTarget) return;
    setDefaultAddress.mutate(defaultTarget.id, {
      onSuccess: () => setDefaultTarget(null),
    });
  };

  return (
    <div className="mx-auto max-w-3xl pb-10 space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">Mis direcciones</h1>
        <p className="text-md text-muted-foreground">
          Administra tus direcciones de envío.
        </p>
      </div>

      {isLoading ? (
        <LoadingState label="Cargando tus direcciones..." />
      ) : isError ? (
        <ErrorState
          message="Error al cargar las direcciones"
          description="No pudimos obtener tus direcciones. Inténtalo de nuevo."
          onRetry={refetch}
        />
      ) : !addresses || addresses.length === 0 ? (
        <EmptyState
          title="No tienes direcciones guardadas"
          description="Agrega una dirección para usarla al momento de comprar."
          icon={<FaMapMarkerAlt size={24} className="text-muted-foreground" aria-hidden="true" />}
          action={{ label: "Agregar mi primera dirección", onClick: handleOpenCreate }}
        />
      ) : (
        <>
          <div className="flex justify-end">
            <Button onClick={handleOpenCreate}>
              <FaPlus size={14} aria-hidden="true" />
              Nueva dirección
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                isDefaultPending={setDefaultAddress.isPending}
                onEdit={handleOpenEdit}
                onDelete={setDeleteTarget}
                onSetDefault={setDefaultTarget}
              />
            ))}
          </div>
        </>
      )}

      <AddressFormDialog
        open={formOpen}
        address={editingAddress}
        onClose={handleCloseForm}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar dirección"
        message={`¿Estás seguro de eliminar la dirección "${deleteTarget?.addressLine}"?`}
        confirmLabel="Eliminar"
        isLoading={deleteAddress.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <ConfirmDialog
        open={!!defaultTarget}
        title="Establecer dirección predeterminada"
        message={`¿Quieres que "${defaultTarget?.addressLine}" sea tu dirección predeterminada? Se reemplazará la actual.`}
        confirmLabel="Sí, hacer predeterminada"
        icon={
          <span className="flex items-center justify-center size-16 rounded-full bg-primary/10">
            <FaStar size={24} className="text-primary" aria-hidden="true" />
          </span>
        }
        isLoading={setDefaultAddress.isPending}
        onConfirm={handleSetDefault}
        onCancel={() => setDefaultTarget(null)}
      />
    </div>
  );
}