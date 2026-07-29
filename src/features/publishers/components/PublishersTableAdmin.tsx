/**
 * Tabla de editoriales para administración.
 */
"use client";

import { FaEye, FaPencilAlt, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { cn, formatDate } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { LoadingState } from "@/components/shared/LoadingState";
import { EmptyState } from "@/components/shared/EmptyState";
import type { PublisherSummary } from "@/features/publishers/types";
import { ActiveBadge } from "@/components/shared/ActiveBadge";
import { TableActions } from "@/components/shared/TableActions";

const COL_COUNT = 5;

interface PublishersTableAdminProps {
    publishers: PublisherSummary[];
    isLoading: boolean;
    isToggling: boolean;
    onViewDetail: (id: number) => void;
    onToggleActive: (publisher: PublisherSummary) => void;
    onEdit: (id: number) => void;
}

export function PublishersTableAdmin({
    publishers,
    isLoading,
    isToggling,
    onViewDetail,
    onToggleActive,
    onEdit,
}: PublishersTableAdminProps) {
    return (
        <div className="rounded-xl border border-border overflow-x-auto w-full">
            <Table className="text-sm">
                <TableHeader className="[&_th]:px-18">
                    <TableRow className="bg-foreground hover:bg-foreground [&_th]:text-white">
                        <TableHead>Nombre</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Creado</TableHead>
                        <TableHead>Actualizado</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="[&_td]:px-18 [&_td]:py-4">
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={COL_COUNT} className="h-32">
                                <LoadingState label="Cargando editoriales..." />
                            </TableCell>
                        </TableRow>
                    ) : publishers.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={COL_COUNT} className="h-32">
                                <EmptyState title="No se encontraron editoriales." />
                            </TableCell>
                        </TableRow>
                    ) : (
                        publishers.map((publisher, i) => (
                            <TableRow
                                key={publisher.id}
                                className={cn("hover:bg-accent", i % 2 === 0 && "bg-card")}
                            >
                                <TableCell className="font-medium">{publisher.name}</TableCell>
                                <TableCell>
                                    <ActiveBadge isActive={publisher.isActive} />
                                </TableCell>
                                <TableCell className="font-medium">
                                    {formatDate(publisher.createdAt)}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {formatDate(publisher.updatedAt)}
                                </TableCell>
                                <TableCell>
                                    <TableActions
                                        actions={[
                                            { label: `Ver detalle de ${publisher.name}`, icon: <FaEye aria-hidden="true" />, onClick: () => onViewDetail(publisher.id) },
                                            { label: `Editar ${publisher.name}`, icon: <FaPencilAlt aria-hidden="true" />, onClick: () => onEdit(publisher.id) },
                                            { label: publisher.isActive ? `Desactivar ${publisher.name}` : `Activar ${publisher.name}`, icon: publisher.isActive ? <FaToggleOn aria-hidden="true" /> : <FaToggleOff aria-hidden="true" />, onClick: () => onToggleActive(publisher), disabled: isToggling },
                                        ]}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}