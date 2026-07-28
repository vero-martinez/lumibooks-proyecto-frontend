/**
 * Dialogo modal que muestra el detalle completo de un autor
 * en el panel de administración.
 */
"use client";

import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { useAdminAuthorDetail } from "@/features/authors/hooks";
import { formatDateTime } from "@/lib/utils";
import { ActiveBadge } from "@/components/shared/ActiveBadge";
import { UserAvatar } from "@/components/shared/UserAvatar";

interface AuthorDetailDialogProps {
  authorId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthorDetailDialog({
  authorId,
  open,
  onOpenChange,
}: AuthorDetailDialogProps) {
  const { data: author, isLoading, isError } = useAdminAuthorDetail(authorId, open);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg max-h-[85vh] overflow-y-auto p-0"
        showCloseButton={false}
      >
        <div className="bg-primary text-primary-foreground px-4 sm:px-10 py-4 rounded-t-lg flex items-center justify-between">
          <DialogTitle className="text-lg">Detalle del Autor</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon-sm" className="text-primary-foreground hover:bg-primary-foreground/20">
              <XIcon className="size-4" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </DialogClose>
        </div>
        <div className="px-4 sm:px-10 py-6">
          {isLoading ? (
            <LoadingState label="Cargando detalle..." />
          ) : isError ? (
            <ErrorState message="No se pudo cargar el detalle" />
          ) : author ? (
            <div className="flex flex-col items-center gap-8 text-center">
              <UserAvatar
                src={author.profileImageUrl}
                name={`${author.firstName} ${author.lastName}`}
                className="w-40 h-40 ring-8 ring-foreground/40"
              />

              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold leading-snug">
                  {author.firstName} {author.lastName}
                </span>
                <ActiveBadge isActive={author.isActive} />
              </div>

              {author.biography && (
                <p className="text-sm leading-relaxed text-secondary-foreground text-justify mt-2">
                  {author.biography}
                </p>
              )}

              <table className="w-full border-collapse text-sm mt-4" aria-label="Metadatos del autor">
                <tbody>
                  {[
                    { label: "Creado", value: formatDateTime(author.createdAt) },
                    { label: "Actualizado", value: formatDateTime(author.updatedAt) },
                  ].map((row, i) => (
                    <tr
                      key={row.label}
                      className={`border-b border-border/20 last:border-0 ${i % 2 === 0 ? "bg-card" : "bg-transparent"}`}
                    >
                      <th
                        scope="row"
                        className="py-3 pl-4 pr-3 text-muted-foreground font-semibold whitespace-nowrap text-left align-top"
                      >
                        {row.label}
                      </th>
                      <td className="py-3 pr-4 text-secondary-foreground">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}