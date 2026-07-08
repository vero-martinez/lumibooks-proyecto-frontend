/**
 * Avatar de usuario con imagen de perfil o iniciales como fallback.
 * Útil para reseñas, autores, perfiles de usuario, etc.
 */
import Image from "next/image";
import { memo } from "react";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string | null;
  name: string;
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export const UserAvatar = memo(function UserAvatar({
  src,
  name,
  className,
}: UserAvatarProps) {
  const size = "w-10 h-10";

  if (src) {
    return (
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full bg-accent",
          size,
          className,
        )}
      >
        <Image src={src} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={name}
      className={cn(
        "shrink-0 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold",
        size,
        className,
      )}
    >
      {getInitials(name)}
    </div>
  );
});