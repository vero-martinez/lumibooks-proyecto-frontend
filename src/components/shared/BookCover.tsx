/**
 * Portada de libro con next/image y fill.
 * Recibe className para tamaño y estilo específico de cada contexto
 * (card, dropdown, detalle, carrito, etc.).
 */

import Image from "next/image";
import { cn } from "@/lib/utils";

interface BookCoverProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function BookCover({
  src,
  alt,
  priority = false,
  sizes,
  className,
}: BookCoverProps) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}