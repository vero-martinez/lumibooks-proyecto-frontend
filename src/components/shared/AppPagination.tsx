/**
 * Componente de paginación reutilizable.
 * Se usa en cualquier listado paginado de la app (libros, autores, etc.).
 *
 * Las páginas se manejan internamente como 0-indexed (0 = primera página),
 * pero se muestran al usuario como 1-indexed (1, 2, 3...).
 *
 * Comportamiento:
 * - Si totalPages <= 1, no renderiza nada.
 * - Si hay muchas páginas, muestra primera, última, vecinas de la actual y "..." en medio.
 * - Previous/Next se deshabilitan (aria-disabled + tabIndex=-1) en extremos.
 */
import { useMemo, useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface AppPaginationProps {
  currentPage: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
  /** Callback al cambiar de página. Recibe la página (0-indexed) */
  onPageChange: (page: number) => void;
  /** Texto informativo mostrado a la izquierda (ej. "Mostrando 1–10 de 50 libros") */
  info?: string;
  className?: string;
}

/** Controla cuántos vecinos mostrar a cada lado de la página actual */
const SIDE_NEIGHBORS = 1;

/** Genera el arreglo de páginas a mostrar.
 * Siempre incluye primera y última página, inserta "ellipsis" si es necesario.
 */
function getPageNumbers(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
  const neighborCount = SIDE_NEIGHBORS;

  if (totalPages <= 3 + neighborCount * 2) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  const pages: (number | "ellipsis")[] = [0];

  const start = Math.max(1, currentPage - neighborCount);
  const end = Math.min(totalPages - 2, currentPage + neighborCount);

  if (start > 1) pages.push("ellipsis");

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 2) pages.push("ellipsis");

  pages.push(totalPages - 1);

  return pages;
}

export function AppPagination({
  currentPage,
  totalPages,
  isFirst,
  isLast,
  onPageChange,
  info,
  className,
}: AppPaginationProps) {
  const pageNumbers = useMemo(
    () => getPageNumbers(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const handleNavigate = useCallback(
    (e: React.MouseEvent, page: number) => {
      e.preventDefault();
      onPageChange(page);
    },
    [onPageChange],
  );

  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between", className)}>
      {info && (
        <span className="text-sm text-muted-foreground whitespace-nowrap">{info}</span>
      )}
      <Pagination className="w-auto mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-label="Ir a página anterior"
              aria-disabled={isFirst || undefined}
              tabIndex={isFirst ? -1 : undefined}
              onClick={(e) => !isFirst && handleNavigate(e, currentPage - 1)}
              className={cn(
                "transition-opacity",
                isFirst ? "opacity-40 cursor-default" : "hover:opacity-80",
              )}
            />
          </PaginationItem>

          {pageNumbers.map((page, idx) =>
            page === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => handleNavigate(e, page)}
                  className={cn(
                    "border transition-all duration-150",
                    currentPage === page
                      ? "bg-primary text-primary-foreground border-primary shadow-sm scale-105 cursor-default"
                      : "border-primary bg-accent/70 hover:bg-accent cursor-pointer",
                  )}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              aria-label="Ir a página siguiente"
              aria-disabled={isLast || undefined}
              tabIndex={isLast ? -1 : undefined}
              onClick={(e) => !isLast && handleNavigate(e, currentPage + 1)}
              className={cn(
                "transition-opacity",
                isLast ? "opacity-40 cursor-default" : "hover:opacity-80",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}