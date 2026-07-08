/**
 * Tarjeta resumen de un autor con foto, nombre, biografía (4 líneas)
 * y enlace a su página de detalle.
 * Es un Server Component porque solo renderiza datos recibidos por props.
 */
import { FaArrowRight } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Link } from "@/components/shared/Link";
import type { AuthorDetail } from "@/features/authors/types";
import { buildAuthorDetailUrl } from "@/features/authors/utils/buildAuthorDetailUrl";

interface AuthorResumeCardProps {
  author: AuthorDetail;
}

export function AuthorResumeCard({ author }: AuthorResumeCardProps) {
  const fullName = `${author.firstName} ${author.lastName}`;

  return (
    <Card className="w-full px-4 lg:px-8 shadow-lg shadow-foreground/30 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5">
      <CardContent className="flex items-center gap-6 md:gap-12 p-4 md:p-6">
        <UserAvatar
          src={author.profileImageUrl}
          name={fullName}
          className="w-24 h-24 text-2xl font-extrabold ring-2 ring-foreground/40 text-foreground bg-foreground/10"
        />
        <div className="flex-1 min-w-0 space-y-2 md:space-y-3">
          <h3 className="text-lg md:text-xl font-bold text-foreground">{fullName}</h3>
          {author.biography && (
            <div>
              <p className="text-[10px] md:text-xs text-muted-foreground tracking-wide uppercase mb-1">Biografía</p>
              <p className="text-sm md:text-base text-secondary-foreground leading-relaxed line-clamp-4">
                {author.biography}
              </p>
            </div>
          )}
          <Link
            href={buildAuthorDetailUrl(author.id, fullName)}
            className="inline-flex items-center gap-1.5 text-primary text-xs md:text-sm font-semibold decoration-current whitespace-nowrap"
          >
            Ver página del autor
            <FaArrowRight size={11} aria-hidden="true" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}