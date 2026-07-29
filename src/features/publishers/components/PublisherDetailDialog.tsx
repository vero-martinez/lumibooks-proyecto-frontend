/**
 * Dialogo modal que muestra el detalle completo de una editorial
 * en el panel de administración.
 */
"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { useAdminPublisherDetail } from "@/features/publishers/hooks";
import { formatDateTime } from "@/lib/utils";
import { ActiveBadge } from "@/components/shared/ActiveBadge";
import { FcLibrary } from "react-icons/fc";

interface PublisherDetailDialogProps {
    publisherId: number | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PublisherDetailDialog({
    publisherId,
    open,
    onOpenChange,
}: PublisherDetailDialogProps) {
    const { data: publisher, isLoading, isError } = useAdminPublisherDetail(publisherId, open);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-lg max-h-[85vh] overflow-y-auto p-0"
                showCloseButton={false}
            >
                <div className="bg-primary text-primary-foreground px-4 sm:px-10 py-4 rounded-t-lg flex items-center justify-between">
                    <DialogTitle className="text-lg">Detalle de la Editorial</DialogTitle>
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
                    ) : publisher ? (
                        <div className="flex flex-col items-center gap-8 text-center">
                            <FcLibrary size={64} aria-hidden="true" />
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-semibold leading-snug">
                                    {publisher.name}
                                </span>
                                <ActiveBadge isActive={publisher.isActive} />
                            </div>

                            <table className="w-full border-collapse text-sm mt-4" aria-label="Metadatos de la editorial">
                                <tbody>
                                    {[
                                        { label: "Creado", value: formatDateTime(publisher.createdAt) },
                                        { label: "Actualizado", value: formatDateTime(publisher.updatedAt) },
                                    ].map((row, i) => (
                                        <tr
                                            key={row.label}
                                            className={`border-b border-border/20 last:border-0 ${i % 2 === 0 ? "bg-card" : "bg-transparent"}`}
                                        >
                                            <th scope="row" className="py-3 pl-4 pr-3 text-muted-foreground font-semibold whitespace-nowrap text-left align-top">
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