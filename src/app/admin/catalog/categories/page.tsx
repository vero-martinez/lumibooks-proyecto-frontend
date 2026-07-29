/**
 * Página de administración de categorías.
 */
import { PageHeader } from "@/components/shared/PageHeader";
import { CategoriesAdmin } from "@/features/categories/components/CategoriesAdmin";

export default function AuthorsAdminPage() {
    return (
        <div>
            <PageHeader
                title="Gestión de Categorías"
                description="Consulta, crea, edita y administra el catálogo de categorías."
            />
            <CategoriesAdmin />
        </div>
    );
}