/**
 * Tabla de categorías para administración.
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
import type { CategorySummary } from "@/features/categories/types";
import { ActiveBadge } from "@/components/shared/ActiveBadge";
import { TableActions } from "@/components/shared/TableActions";

const COL_COUNT = 5;

interface CategoriesTableAdminProps {
    categories: CategorySummary[];
    isLoading: boolean;
    isToggling: boolean;
    onViewDetail: (id: number) => void;
    onToggleActive: (category: CategorySummary) => void;
    onEdit: (id: number) => void;
}

export function CategoriesTableAdmin({
    categories,
    isLoading,
    isToggling,
    onViewDetail,
    onToggleActive,
    onEdit,
}: CategoriesTableAdminProps) {
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
                                <LoadingState label="Cargando categorías..." />
                            </TableCell>
                        </TableRow>
                    ) : categories.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={COL_COUNT} className="h-32">
                                <EmptyState title="No se encontraron categorías." />
                            </TableCell>
                        </TableRow>
                    ) : (
                        categories.map((category, i) => (
                            <TableRow
                                key={category.id}
                                className={cn("hover:bg-accent", i % 2 === 0 && "bg-card")}
                            >
                                <TableCell className="font-medium">{category.name}</TableCell>
                                <TableCell>
                                    <ActiveBadge isActive={category.isActive} />
                                </TableCell>
                                <TableCell className="font-medium">
                                    {formatDate(category.createdAt)}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {formatDate(category.updatedAt)}
                                </TableCell>
                                <TableCell>
                                    <TableActions
                                        actions={[
                                            {
                                                label: `Ver detalle de ${category.name}`,
                                                icon: <FaEye aria-hidden="true" />,
                                                onClick: () => onViewDetail(category.id),
                                            },
                                            {
                                                label: `Editar ${category.name}`,
                                                icon: <FaPencilAlt aria-hidden="true" />,
                                                onClick: () => onEdit(category.id),
                                            },
                                            {
                                                label: category.isActive
                                                    ? `Desactivar ${category.name}`
                                                    : `Activar ${category.name}`,
                                                icon: category.isActive ? (
                                                    <FaToggleOn aria-hidden="true" />
                                                ) : (
                                                    <FaToggleOff aria-hidden="true" />
                                                ),
                                                onClick: () => onToggleActive(category),
                                                disabled: isToggling,
                                            },
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