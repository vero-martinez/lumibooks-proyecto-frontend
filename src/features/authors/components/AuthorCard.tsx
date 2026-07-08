/**
 * Tarjeta de autor con foto, nombre y enlace a detalle.
 * Usada en listados de autores (grid).
 */
import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Link } from "@/components/shared/Link";
import type { AuthorPublicResponse } from "@/features/authors/types";
import { buildAuthorDetailUrl } from "@/features/authors/utils/buildAuthorDetailUrl";

interface AuthorCardProps {
  author: AuthorPublicResponse;
  priority?: boolean;
}

export const AuthorCard = memo(function AuthorCard({ author, priority = false }: AuthorCardProps) {
  return (
    <Card className="shadow-lg shadow-foreground/30 bg-card w-full min-h-[200px] md:min-h-[220px] transition-all duration-200 hover:shadow-xl hover:shadow-foreground/40 hover:-translate-y-1">
      <CardContent className="flex flex-col items-center justify-center p-3 md:p-6 gap-3 md:gap-4">
        <UserAvatar
          src={author.profileImageUrl}
          name={author.fullName}
          className="w-24 h-24 text-2xl font-extrabold ring-2 ring-foreground/40 text-foreground bg-foreground/10"
        />
        <h3 className="text-xs md:text-sm font-semibold text-center line-clamp-2 text-foreground">
          {author.fullName}
        </h3>
        <Link
          href={buildAuthorDetailUrl(author.id, author.fullName)}
          aria-label={`Ver detalles de ${author.fullName}`}
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 text-xs md:text-sm font-semibold transition-colors"
        >
          Ver detalles
        </Link>
      </CardContent>
    </Card>
  );
});