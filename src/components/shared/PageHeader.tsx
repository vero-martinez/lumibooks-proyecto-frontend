/**
 * Encabezado de página reutilizable para secciones admin, cliente y gestor.
 * Muestra un título con barra de acento y descripción opcional.
 */
interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 rounded-full bg-primary" />
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground mt-2 ml-4">
          {description}
        </p>
      )}
    </div>
  );
}