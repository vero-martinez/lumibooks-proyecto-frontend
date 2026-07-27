/**
 * Encabezado de sección numerado para formularios.
 * Muestra un número dentro de un círculo y un título.
 */
interface SectionHeaderProps {
  number: number;
  title: string;
}

export function SectionHeader({ number, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2.5 bg-accent rounded-lg px-4 py-2.5 border-l-4 border-primary">
      <span className="flex items-center justify-center size-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
        {number}
      </span>
      <h2 className="text-sm font-semibold text-foreground tracking-wide uppercase">{title}</h2>
    </div>
  );
}