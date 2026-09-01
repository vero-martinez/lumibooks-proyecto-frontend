/**
 * Página de administración de reseñas.
 */
import { PageHeader } from "@/components/shared/PageHeader";
import { ReviewsAdmin } from "@/features/reviews/components/ReviewsAdmin";

export default function AdminReviewsPage() {
    return (
        <div>
            <PageHeader
                title="Gestión de Reseñas"
                description="Consulta, modera y administra las reseñas de los clientes."
            />
            <ReviewsAdmin />
        </div>
    );
}