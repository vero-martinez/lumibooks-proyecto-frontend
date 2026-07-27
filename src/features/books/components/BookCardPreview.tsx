/**
 * Versión estática de BookCard para previsualización en formularios (crear/editar libro).
 */
import { FaStar } from "react-icons/fa";
import { FcAddImage } from "react-icons/fc";
import { Card, CardContent } from "@/components/ui/card";
import { BookCover } from "@/components/shared/BookCover";
import { formatPrice } from "@/lib/utils";

interface BookCardPreviewProps {
  title?: string;
  authors?: string[];
  price?: number;
  coverImageUrl?: string;
  averageRating?: number;
  totalReviews?: number;
}

export function BookCardPreview({
  title,
  authors = [],
  price,
  coverImageUrl,
  averageRating = 0,
  totalReviews = 0,
}: BookCardPreviewProps) {
  return (
    <Card className="shadow-lg shadow-foreground/30 bg-card w-full max-w-[250px]">
      <CardContent className="flex flex-col items-center px-3 py-2 md:px-6">
        <div className="flex flex-col items-center w-full">
          {/* Portada */}
          {coverImageUrl ? (
            <BookCover
              src={coverImageUrl}
              alt={title || "Portada"}
              className="w-32 h-48 shadow-sm rounded-lg bg-muted"
            />
          ) : (
            <div className="w-32 h-48 rounded-lg bg-muted flex items-center justify-center">
              <FcAddImage size={48} />
            </div>
          )}

          <div className="flex flex-col items-center gap-2 text-card-foreground mt-2 w-full min-w-0 px-1">
            {/* Título */}
            <h3 className="text-sm h-12 font-semibold line-clamp-2 text-center min-w-0 break-words w-full">
              {title || "Título del libro"}
            </h3>

            {/* Autores */}
            <p className="text-xs line-clamp-1 text-center">
              {authors.length > 0 ? authors.join(", ") : "Autor(es)"}
            </p>

            {/* Rating */}
            <div
              className="flex items-center gap-1"
              aria-label={`${averageRating.toFixed(1)} de 5 estrellas, ${totalReviews} ${totalReviews === 1 ? "comentario" : "comentarios"}`}
            >
              <FaStar size={14} className="text-star" aria-hidden="true" />
              <span className="text-xs">
                {averageRating.toFixed(1)} ({totalReviews})
              </span>
            </div>

            {/* Precio */}
            <p className="text-sm font-bold text-foreground">
              {price && !isNaN(price) ? formatPrice(price) : "S/ 0.00"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}