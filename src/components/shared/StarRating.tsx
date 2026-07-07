/**
 * Componente visual de calificación por estrellas.
 * Muestra 5 estrellas que pueden estar completas, media estrella o vacías
 * según el valor de rating, para una representación más precisa.
 * Incluye un aria-label descriptivo para accesibilidad.
 */
import { memo } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

export const StarRating = memo(function StarRating({
  rating,
  size = 18,
  className,
}: StarRatingProps) {
  const normalized = Math.round(rating * 2) / 2;
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`${rating.toFixed(1)} de 5 estrellas`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const full = i < Math.floor(normalized);
        const half = !full && i < normalized;

        const Icon = full ? FaStar : half ? FaStarHalfAlt : FaRegStar;

        return (
          <Icon
            key={i}
            size={size}
            aria-hidden="true"
            className={full || half ? "text-star" : "text-muted"}
          />
        );
      })}
    </div>
  );
});