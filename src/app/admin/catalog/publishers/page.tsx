/**
 * Página de administración de editoriales.
 */
import { PageHeader } from "@/components/shared/PageHeader";
import { PublishersAdmin } from "@/features/publishers/components/PublishersAdmin";

export default function PublishersAdminPage() {
    return (
        <div>
            <PageHeader
                title="Gestión de Editoriales"
                description="Consulta, crea, edita y administra el catálogo de editoriales."
            />
            <PublishersAdmin />
        </div>
    );
}