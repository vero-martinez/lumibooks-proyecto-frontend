"use client";

import { useState } from "react";
import { FaHeart, FaPlus } from "react-icons/fa";
import {
  useWishlists,
  useCreateWishlist,
  useRenameWishlist,
  useDeleteWishlist,
} from "@/features/wishlists/hooks";
import { WishlistResponse } from "@/features/wishlists/types";
import {
  WishlistCard,
  WishlistNameDialog,
} from "@/features/wishlists/components";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ModalState =
  | { type: "closed" }
  | { type: "create" }
  | { type: "rename"; wishlist: WishlistResponse };

export default function WishlistsPage() {
  const { data: wishlists, isLoading, isError, refetch } = useWishlists();
  const createWishlist = useCreateWishlist();
  const renameWishlist = useRenameWishlist();
  const deleteWishlist = useDeleteWishlist();

  const [modal, setModal] = useState<ModalState>({ type: "closed" });
  const [deleteTarget, setDeleteTarget] = useState<WishlistResponse | null>(
    null,
  );

  const handleCreate = (name: string) => {
    createWishlist.mutate(
      { name },
      {
        onSuccess: () => setModal({ type: "closed" }),
      },
    );
  };

  const handleRename = (name: string) => {
    if (modal.type !== "rename") return;
    renameWishlist.mutate(
      { wishlistId: modal.wishlist.id, name },
      { onSuccess: () => setModal({ type: "closed" }) },
    );
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteWishlist.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  };

  if (isLoading) return <LoadingState label="Cargando tus listas..." />;
  if (isError)
    return (
      <ErrorState
        message="Error al cargar las listas"
        onRetry={() => refetch()}
      />
    );

  return (
    <div className="mx-auto max-w-3xl pb-10 space-y-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-foreground">
            Mis listas de deseos
          </h1>
          {wishlists && wishlists.length > 0 && (
            <Badge className="bg-accent text-secondary-foreground px-4 py-3">
              {wishlists.length} {wishlists.length === 1 ? "lista" : "listas"}
            </Badge>
          )}
        </div>
        <p className="text-md text-muted-foreground mb-4">
          Crea listas con los libros que te interesan y vuelve a ellas cuando
          estés listo para comprarlos.
        </p>
        {wishlists && wishlists.length > 0 && (
          <>
            <div className="flex justify-end">
              <Button onClick={() => setModal({ type: "create" })}>
                <FaPlus size={14} aria-hidden="true" />
                Nueva lista
              </Button>
            </div>
          </>
        )}
      </div>

      {!wishlists || wishlists.length === 0 ? (
        <EmptyState
          as="h2"
          title="No tienes ninguna lista"
          description="Crea una lista para guardar los libros que te interesan."
          icon={<FaHeart size={24} className="text-muted-foreground" />}
          action={{
            label: "Crear mi primera lista",
            onClick: () => setModal({ type: "create" }),
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlists.map((wishlist) => (
            <WishlistCard
              key={wishlist.id}
              wishlist={wishlist}
              onRename={(w) => setModal({ type: "rename", wishlist: w })}
              onDelete={(w) => setDeleteTarget(w)}
            />
          ))}
        </div>
      )}

      <WishlistNameDialog
        open={modal.type !== "closed"}
        title={modal.type === "rename" ? "Renombrar lista" : "Nueva lista"}
        initialName={modal.type === "rename" ? modal.wishlist.name : ""}
        isLoading={createWishlist.isPending || renameWishlist.isPending}
        onSubmit={modal.type === "rename" ? handleRename : handleCreate}
        onClose={() => setModal({ type: "closed" })}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar lista"
        message={`¿Estás seguro de eliminar la lista "${deleteTarget?.name}"? Se eliminarán todos los libros que contiene.`}
        confirmLabel="Eliminar"
        isLoading={deleteWishlist.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}