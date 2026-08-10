"use client";

/**
 * Página del perfil del usuario autenticado.
 * Muestra la información personal en modo solo lectura con un botón "Editar"
 * que activa el modo edición de los datos básicos.
 */
import { useProfile } from "@/features/profile/hooks";
import { ProfileCard } from "@/features/profile/components/ProfileCard";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";

export default function ProfilePage() {
    const { data: profile, isLoading, isError, refetch } = useProfile();

    return (
        <div className="mx-auto max-w-3xl pb-10 space-y-6">
            <div>
                <h1 className="mb-2 text-2xl font-bold text-foreground">Mi perfil</h1>
                <p className="text-md text-muted-foreground">
                    Administra tu información personal desde aquí.
                </p>
            </div>

            {isLoading ? (
                <LoadingState label="Cargando tu perfil..." />
            ) : isError ? (
                <ErrorState
                    message="Error al cargar el perfil"
                    description="No pudimos obtener tu información. Inténtalo de nuevo."
                    onRetry={refetch}
                />
            ) : (
                profile && <ProfileCard profile={profile} />
            )}
        </div>
    );
}