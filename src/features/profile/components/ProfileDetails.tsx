"use client";

/**
 * Vista de solo lectura de la información personal del usuario.
 * Muestra la suscripción al boletín y los datos del perfil.
 */
import type { ReactNode } from "react";
import {
    FaUser,
    FaPhone,
    FaEnvelope,
    FaCreditCard,
    FaEnvelopeOpenText,
} from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import {
    CELLPHONE_FALLBACK,
    PROFILE_FIELD_LABELS,
    PROFILE_SUBSCRIPTION,
} from "@/features/profile/constants";
import type { UserMeResponse } from "@/features/profile/types";

interface ProfileDetailsProps {
    profile: UserMeResponse;
}

export function InfoRow({
    icon,
    label,
    value,
}: {
    icon: ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-4 rounded-xl border border-border/15 bg-muted/20 px-5 py-4">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-base font-medium text-secondary-foreground truncate">{value}</p>
            </div>
        </div>
    );
}

function ProfileSubscription({ isSubscribed }: { isSubscribed: boolean }) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-border/15 bg-muted/20 px-5 py-4">
            <div className="flex items-center gap-4 min-w-0">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <FaEnvelopeOpenText size={17} className="text-primary" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                    <p className="text-base font-medium text-secondary-foreground">
                        {PROFILE_SUBSCRIPTION.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {isSubscribed
                            ? PROFILE_SUBSCRIPTION.subscribed
                            : PROFILE_SUBSCRIPTION.notSubscribed}
                    </p>
                </div>
            </div>
            <Badge
                variant={isSubscribed ? "secondary" : "outline"}
                className="gap-1.5 shrink-0 text-sm px-3 py-1"
            >
                {isSubscribed
                    ? PROFILE_SUBSCRIPTION.badgeSubscribed
                    : PROFILE_SUBSCRIPTION.badgeNotSubscribed}
            </Badge>
        </div>
    );
}

export function ProfileDetails({ profile }: ProfileDetailsProps) {
    const { firstName, lastName, cellphone, email, dni, isSubscribed } = profile;

    const infoRows = [
        {
            icon: <FaUser size={17} className="text-primary" aria-hidden="true" />,
            label: PROFILE_FIELD_LABELS.fullName,
            value: `${firstName} ${lastName}`,
        },
        {
            icon: <FaPhone size={17} className="text-primary" aria-hidden="true" />,
            label: PROFILE_FIELD_LABELS.cellphone,
            value: cellphone ?? CELLPHONE_FALLBACK,
        },
        {
            icon: <FaEnvelope size={17} className="text-primary" aria-hidden="true" />,
            label: PROFILE_FIELD_LABELS.email,
            value: email,
        },
        {
            icon: <FaCreditCard size={17} className="text-primary" aria-hidden="true" />,
            label: PROFILE_FIELD_LABELS.dni,
            value: dni,
        },
    ];

    return (
        <>
            <ProfileSubscription isSubscribed={isSubscribed} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {infoRows.map((row) => (
                    <InfoRow key={row.label} {...row} />
                ))}
            </div>
        </>
    );
}