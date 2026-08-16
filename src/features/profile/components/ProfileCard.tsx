"use client";

/**
 * Tarjeta del perfil del usuario con modo lectura/edición.
 * Por defecto muestra la información como solo lectura con un botón "Editar".
 * Al editar, los campos editables se convierten en inputs y aparecen
 * los botones "Guardar cambios" y "Cancelar".
 */
import { useId, useState } from "react";
import { FaPen } from "react-icons/fa";

import { ProfileDetails } from "@/features/profile/components/ProfileDetails";
import { ProfileEditForm } from "@/features/profile/components/ProfileEditForm";
import type { UserMeResponse } from "@/features/profile/types";
import { PROFILE_ACTIONS, PROFILE_CARD } from "@/features/profile/constants";

import { Button } from "@/components/ui/button";

interface ProfileCardProps {
    profile: UserMeResponse;
}

export function ProfileCard({ profile }: ProfileCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const titleId = useId();

    const handleStartEditing = () => setIsEditing(true);
    const handleStopEditing = () => setIsEditing(false);

    return (
        <section aria-labelledby={titleId}>
            <div className="border border-border/20 rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between gap-4 px-8 py-8">
                    <div>
                        <h2 id={titleId} className="text-2xl font-semibold text-foreground">
                            {PROFILE_CARD.title}
                        </h2>
                        {!isEditing && (
                            <p className="text-base text-muted-foreground mt-1">
                                {PROFILE_CARD.description}
                            </p>
                        )}
                    </div>
                    {!isEditing && (
                        <Button
                            variant="outline"
                            type="button"
                            onClick={handleStartEditing}
                            className="h-11 px-5 text-base"
                        >
                            <FaPen size={14} aria-hidden="true" />
                            {PROFILE_ACTIONS.edit}
                        </Button>
                    )}
                </div>

                <div className="h-px bg-border/20" />

                {isEditing ? (
                    <ProfileEditForm
                        profile={profile}
                        onCancel={handleStopEditing}
                        onSaved={handleStopEditing}
                    />
                ) : (
                    <div className="px-8 py-8 space-y-5">
                        <ProfileDetails profile={profile} />
                    </div>
                )}
            </div>
        </section>
    );
}