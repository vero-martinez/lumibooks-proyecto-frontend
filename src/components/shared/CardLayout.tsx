/**
 * Tarjeta centrada con ícono opcional, título, subtítulo y contenido.
 */
import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface CardLayoutProps {
  title: string;
  subtitle: ReactNode;
  children: ReactNode;
  icon?: IconType;
  className?: string;
}

export function CardLayout({
  title,
  subtitle,
  children,
  icon: Icon,
  className,
}: CardLayoutProps) {
  const titleId = "card-title";

  return (
    <div
      aria-labelledby={titleId}
      role="region"
      className={cn(
        "relative w-full max-w-md p-8 pt-12 bg-background rounded-2xl shadow-xl border border-border/50 overflow-hidden",
        className,
      )}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-foreground rounded-t-2xl" />

      <div className="mb-6 space-y-2 text-center">
        {Icon && (
          <Icon size={36} className="mx-auto text-foreground" aria-hidden="true" />
        )}
        <h1 id={titleId} className="text-2xl font-bold">
          {title}
        </h1>
        <p className="text-sm text-secondary-foreground">{subtitle}</p>
      </div>

      {children}
    </div>
  );
}