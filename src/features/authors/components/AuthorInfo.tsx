/**
 * Información del autor en su página de detalle.
 * Muestra imagen, nombre y biografía.
 */
import { UserAvatar } from "@/components/shared/UserAvatar";
import type { AuthorDetail } from "@/features/authors/types";
import { Card, CardContent } from "@/components/ui/card";

interface AuthorInfoProps {
  author: AuthorDetail;
}

export function AuthorInfo({ author }: AuthorInfoProps) {
  const fullName = `${author.firstName} ${author.lastName}`;

  return (
    <Card className="p-12">
      <CardContent className="flex flex-col items-center gap-12 md:gap-10">
        <UserAvatar
          src={author.profileImageUrl}
          name={fullName}
          className="w-40 h-40 text-4xl font-extrabold ring-16 ring-foreground/40 text-foreground bg-foreground/10 shrink-0"
        />
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {fullName}
          </h1>
          {author.biography && (
            <p className="text-secondary-foreground leading-relaxed text-justify py-8 sm:p-8">
              {author.biography}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}