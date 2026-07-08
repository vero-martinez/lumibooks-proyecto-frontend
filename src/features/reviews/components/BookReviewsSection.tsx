/**
 * Sección de reseñas de un libro.
 * Muestra la lista de reseñas con avatar, nombre, rating, fecha y comentario.
 */
import { StarRating } from "@/components/shared/StarRating";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatDate } from "@/lib/utils";
import { FaRegCommentDots } from "react-icons/fa";
import type { ReviewPublic } from "@/features/reviews/types";

interface BookReviewsSectionProps {
  reviews: ReviewPublic[];
}

export function BookReviewsSection({ reviews }: BookReviewsSectionProps) {
  if (reviews.length === 0) {
    return (
      <EmptyState
        title="No hay reseñas aún"
        description="Este libro no tiene reseñas. ¡Sé el primero en opinar!"
        as="h3"
        icon={<FaRegCommentDots size={24} />}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto pt-6">
      {reviews.map((review, i) => (
        <div key={review.id}>
          {i > 0 && <hr className="border-border/20 my-6" />}
          <div className="flex items-start gap-3">
            <UserAvatar name={review.userName} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-secondary-foreground">
                  {review.userName}
                </span>
                <span className="text-muted-foreground">
                  {formatDate(review.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <StarRating rating={review.rating} size={14} />
                <span aria-hidden="true" className="text-muted-foreground ml-1">
                  {review.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
          <p className="text-secondary-foreground leading-relaxed mt-3">
            {review.comment}
          </p>
          {review.updatedAt !== review.createdAt && (
            <p className="text-muted-foreground mt-2">
              Editado: {formatDate(review.updatedAt)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}