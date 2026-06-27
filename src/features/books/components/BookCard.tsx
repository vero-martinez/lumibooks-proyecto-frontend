/* components/features/books/BookCard.tsx */
import Link from "next/link";
import Image from "next/image";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { BookCard as BookCardType } from "@/features/books/types";
import { IconButton } from "@/components/shared/IconButton";
import { buildBookDetailUrl } from "@/features/books/utils/buildBookDetailUrl";

interface BookCardProps {
  book: BookCardType;
  /**
  * Indica si la imagen debe precargarse con Next.js Image.
  * Solo debe activarse para las primeras cards visibles.
  * Esta decisión corresponde al componente padre.
  */
  priority?: boolean;
}

const COVER_SIZES =
  "(min-width: 1024px) 125px, (min-width: 768px) 115px, (min-width: 640px) 105px, 90px";

const QUICK_ACTION_HOVER = "hover:bg-foreground hover:text-secondary";

export function BookCard({ book, priority = false }: BookCardProps) {
  const detailUrl = buildBookDetailUrl(book.id, book.title);

  return (
    <Card className="shadow-lg shadow-foreground/30 bg-card w-full min-h-[300px] sm:min-h-[330px] md:min-h-[360px] lg:min-h-[390px]">
      <CardContent className="flex flex-col items-center p-3 md:p-6">
        {/* Portada */}
        <div className="relative shrink-0 w-[90px] h-[145px] sm:w-[105px] sm:h-[168px] md:w-[115px] md:h-[185px] lg:w-[125px] lg:h-[200px] overflow-hidden rounded-sm shadow-sm">
          <Image
            src={book.coverImageUrl}
            alt={book.title}
            fill
            sizes={COVER_SIZES}
            priority={priority}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col items-center gap-1 md:gap-2 text-card-foreground mt-2">
          {/* Título */}
          <Link href={detailUrl}>
            <h3 className="text-xs md:text-sm h-9 md:h-12 font-semibold line-clamp-2 text-center p-1 md:p-2 hover:text-foreground transition-colors">
              {book.title}
            </h3>
          </Link>

          {/* Autores */}
          <p className="text-xs md:text-sm line-clamp-1 text-center">
            {book.authors.join(", ")}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 md:gap-2">
            <FaStar size={14} className="text-accent md:size-4" />
            <span className="text-xs md:text-sm">
              {book.averageRating.toFixed(1)} ({book.totalReviews})
            </span>
          </div>

          {/* Precio */}
          <p className="text-xs md:text-sm font-bold text-foreground">
            S/ {book.price.toFixed(2)}
          </p>

          {/* Acciones rápidas */}
          <div className="flex items-center gap-2 md:gap-4 mt-1">
            <IconButton
              icon={FaShoppingCart}
              label="Agregar al carrito"
              className={QUICK_ACTION_HOVER}
            />

            <IconButton
              icon={FaHeart}
              label="Agregar a favoritos"
              className={QUICK_ACTION_HOVER}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}