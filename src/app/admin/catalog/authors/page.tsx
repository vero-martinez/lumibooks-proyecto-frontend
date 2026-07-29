/**
 * Página de administración de autores.
 */
import { PageHeader } from "@/components/shared/PageHeader";
import { AuthorsAdmin } from "@/features/authors/components/AuthorsAdmin";

export default function AuthorsAdminPage() {
  return (
    <div>
      <PageHeader
        title="Gestión de Autores"
        description="Consulta, crea, edita y administra el catálogo de autores."
      />
      <AuthorsAdmin />
    </div>
  );
}