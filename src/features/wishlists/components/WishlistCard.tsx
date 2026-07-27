"use client";

/**
 * Card de wishlist para la página principal de listas.
 * Muestra nombre, cantidad de libros y acciones (renombrar/eliminar).
 * El link lleva al detalle de la wishlist.
 */
import NextLink from "next/link";
import { FaHeart, FaPen, FaTrash } from "react-icons/fa";
import { IconButton } from "@/components/shared/IconButton";
import { Badge } from "@/components/ui/badge";
import { WishlistResponse } from "@/features/wishlists/types";

interface WishlistCardProps {
  wishlist: WishlistResponse;
  onRename: (wishlist: WishlistResponse) => void;
  onDelete: (wishlist: WishlistResponse) => void;
}

export function WishlistCard({ wishlist, onRename, onDelete }: WishlistCardProps) {
  return (
    <div className="group flex flex-col bg-card border border-border/20 rounded-xl p-6 hover:border-border/40 hover:shadow-md transition-all">
      <NextLink
        href={`/client/wishlist/${wishlist.id}`}
        className="flex-1 min-w-0 mb-6"
      >
        <div className="flex items-center justify-center size-12 rounded-full bg-primary/10 mx-auto mb-4">
          <FaHeart size={20} className="text-primary" aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold mb-4 text-secondary-foreground text-center truncate group-hover:text-primary transition-colors">
          {wishlist.name}
        </p>
        <div className="flex justify-center">
          <Badge className="text-xs bg-popover text-secondary-foreground/80">
            {wishlist.itemCount} {wishlist.itemCount === 1 ? "libro" : "libros"}
          </Badge>
        </div>
      </NextLink>
      
      <div className="flex items-center justify-center gap-2">
        <IconButton
          icon={FaPen}
          label={`Renombrar ${wishlist.name}`}
          size="sm"
          onClick={() => onRename(wishlist)}
        />
        <IconButton
          icon={FaTrash}
          label={`Eliminar ${wishlist.name}`}
          size="sm"
          className=" hover:text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(wishlist)}
        />
      </div>
    </div>
  );
}