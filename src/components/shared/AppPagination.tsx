/**
 * Componente de paginación reutilizable.
 * Se usa en cualquier listado paginado de la app (libros, usuarios, pedidos, etc.).
 * Cuando hay muchas páginas, muestra "..." para evitar llenar la pantalla de botones.
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
  onPageChange: (page: number) => void;
  className?: string;
}

// Cantidad máxima de botones numéricos visibles antes de mostrar "...".
const MAX_VISIBLE_PAGES = 5;

// Cantidad de páginas "vecinas" mostradas a cada lado de la página actual,
// derivada de MAX_VISIBLE_PAGES (resta primera y última página fijas).
const SIDE_NEIGHBORS = Math.floor((MAX_VISIBLE_PAGES - 2) / 2);

/**
 * Genera la lista de páginas que se mostrarán en la paginación,
 * incluyendo "ellipsis" donde haya tramos ocultos.
 */
function getPageNumbers(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
  // Si hay pocas páginas, se muestran todas sin elipsis.
  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  const pages: (number | "ellipsis")[] = [0];

  const start = Math.max(1, currentPage - SIDE_NEIGHBORS);
  const end = Math.min(totalPages - 2, currentPage + SIDE_NEIGHBORS);

  if (start > 1) pages.push("ellipsis");

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 2) pages.push("ellipsis");

  pages.push(totalPages - 1);

  return pages;
}

/**
 * Renderiza la paginación y notifica al componente padre
 * cuando el usuario cambia de página.
 */
export function AppPagination({
  currentPage,
  totalPages,
  isFirst,
  isLast,
  onPageChange,
  className,
}: AppPaginationProps) {
  // Memoriza las páginas visibles para no recalcularlas en cada render.
  const pageNumbers = useMemo(
    () => getPageNumbers(currentPage, totalPages),
    [currentPage, totalPages],
  );

  // Centraliza el preventDefault de los <a href="#">, que shadcn/ui
  // requiere para que los componentes de paginación se rendericen como link.
  const handleNavigate = useCallback(
    (e: React.MouseEvent, page: number) => {
      e.preventDefault();
      onPageChange(page);
    },
    [onPageChange],
  );

  // Si solo existe una página, no tiene sentido mostrar paginación.
  if (totalPages <= 1) return null;

  return (
    <Pagination className={cn("mt-5", className)}>
      <PaginationContent>
        {/* Botón para ir a la página anterior */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => !isFirst && handleNavigate(e, currentPage - 1)}
            className={cn(isFirst && "pointer-events-none opacity-50")}
          />
        </PaginationItem>

        {/* Botones numéricos y elipsis */}
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
                  "border",
                  currentPage === page
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-primary bg-accent/70",
                )}
              >
                {/* Se muestra 1,2,3... pero internamente se usa 0,1,2... */}
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {/* Botón para ir a la siguiente página */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => !isLast && handleNavigate(e, currentPage + 1)}
            className={cn(isLast && "pointer-events-none opacity-50")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}