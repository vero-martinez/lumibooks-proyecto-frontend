/**
 * Tabla de autores para administración.
 * Solo renderiza filas — sin hooks, sin estado, sin diálogos.
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
import type { AuthorSummary } from "@/features/authors/types";
import { ActiveBadge } from "@/components/shared/ActiveBadge";
import { TableActions } from "@/components/shared/TableActions";
import { UserAvatar } from "@/components/shared/UserAvatar";

const COL_COUNT = 5;

interface AuthorsTableAdminProps {
  authors: AuthorSummary[];
  isLoading: boolean;
  isToggling: boolean;
  onViewDetail: (id: number) => void;
  onToggleActive: (author: AuthorSummary) => void;
  onEdit: (id: number) => void;
}

export function AuthorsTableAdmin({
  authors,
  isLoading,
  isToggling,
  onViewDetail,
  onToggleActive,
  onEdit,
}: AuthorsTableAdminProps) {
  return (
    <div className="rounded-xl border border-border overflow-x-auto w-full">
      <Table className="text-sm">
        <TableHeader className="[&_th]:px-18">
          <TableRow className="bg-foreground hover:bg-foreground [&_th]:text-white">
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_td]:px-18 [&_td]:py-4">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={COL_COUNT} className="h-32">
                <LoadingState label="Cargando autores..." />
              </TableCell>
            </TableRow>
          ) : authors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={COL_COUNT} className="h-32">
                <EmptyState title="No se encontraron autores." />
              </TableCell>
            </TableRow>
          ) : (
            authors.map((author, i) => (
              <TableRow
                key={author.id}
                className={cn("hover:bg-accent", i % 2 === 0 && "bg-card")}
              >
                <TableCell>
                  <UserAvatar
                    src={author.profileImageUrl}
                    name={`${author.firstName} ${author.lastName}`}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {author.firstName} {author.lastName}
                </TableCell>
                <TableCell>
                  <ActiveBadge isActive={author.isActive} />
                </TableCell>
                <TableCell className="font-medium">
                  {formatDate(author.createdAt)}
                </TableCell>
                <TableCell>
                  <TableActions
                    actions={[
                      { label: `Ver detalle de ${author.firstName} ${author.lastName}`, icon: <FaEye aria-hidden="true" />, onClick: () => onViewDetail(author.id) },
                      { label: `Editar ${author.firstName} ${author.lastName}`, icon: <FaPencilAlt aria-hidden="true" />, onClick: () => onEdit(author.id) },
                      { label: author.isActive ? `Desactivar ${author.firstName} ${author.lastName}` : `Activar ${author.firstName} ${author.lastName}`, icon: author.isActive ? <FaToggleOn aria-hidden="true" /> : <FaToggleOff aria-hidden="true" />, onClick: () => onToggleActive(author), disabled: isToggling },
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