"use client";

/**
 * Página de reseñas del usuario.
 * Gestión de reseñas propias y libros pendientes de reseñar.
 */
import { ClientReviewsContainer } from "@/features/reviews/components";

export default function ReviewsPage() {
    return (
        <div className="mx-auto max-w-3xl pb-10 space-y-6">
            <div>
                <h1 className="mb-2 text-2xl font-bold text-foreground">
                    Mis Reviews
                </h1>
                <p className="text-md text-muted-foreground">
                    Opina sobre los libros que recibiste y administra tus reseñas.
                </p>
            </div>

            <ClientReviewsContainer />
        </div>
    );
}