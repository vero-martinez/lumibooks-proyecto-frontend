/**
 * Header de la página de detalle de una lista de deseos.
 * Muestra breadcrumb de navegación, ícono, nombre de la lista y cantidad de libros.
 */
import NextLink from "next/link";
import { FaHeart } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import type { WishlistDetailResponse } from "@/features/wishlists/types";

interface WishlistDetailHeaderProps {
  wishlist?: WishlistDetailResponse;
}

export function WishlistDetailHeader({ wishlist }: WishlistDetailHeaderProps) {
  return (
    <div className="mb-12">
      <Breadcrumb className="mb-10">
        <BreadcrumbList className="gap-2">
          <BreadcrumbItem className="uppercase">
            <BreadcrumbLink asChild>
              <NextLink href="/client/wishlist">Mis listas</NextLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="uppercase">
            <BreadcrumbPage>{wishlist?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-start gap-4 mb-3">
        <div className="flex items-center justify-center size-14 rounded-full bg-primary/10 shrink-0 mt-0.5">
          <FaHeart size={28} className="text-primary" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-foreground">{wishlist?.name}</h1>
            {wishlist && (
              <Badge className="bg-accent text-secondary-foreground px-4 py-3">
                {wishlist.books.length} {wishlist.books.length === 1 ? "libro" : "libros"}
              </Badge>
            )}
          </div>
          <p className="text-base text-muted-foreground">
            Explora y administra los libros guardados en esta lista de deseos.
          </p>
        </div>
      </div>
    </div>
  );
}