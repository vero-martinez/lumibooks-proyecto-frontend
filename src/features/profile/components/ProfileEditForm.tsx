"use client";

/**
 * Formulario de edición de los datos básicos del perfil.
 * Valida con el schema de perfil y persiste los cambios mediante useUpdateProfile.
 */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser, FaPhone, FaEnvelope, FaCreditCard } from "react-icons/fa";

import { profileSchema, ProfileSchema } from "@/features/profile/schemas";
import { useUpdateProfile } from "@/features/profile/hooks";
import type { UserMeResponse } from "@/features/profile/types";
import {
    INFO_ICON_SIZE,
    PROFILE_ACTIONS,
    PROFILE_EDITING_TITLE,
    PROFILE_FIELD_LABELS,
    PROFILE_PLACEHOLDERS,
} from "@/features/profile/constants";
import { InfoRow } from "@/features/profile/components/ProfileDetails";

import { FormField } from "@/components/shared/FormField";
import { IconInput } from "@/components/shared/IconInput";
import { LoadingButton } from "@/components/shared/LoadingButton";
import { Button } from "@/components/ui/button";

interface ProfileEditFormProps {
    profile: UserMeResponse;
    onCancel: () => void;
    onSaved: () => void;
}

export function ProfileEditForm({ profile, onCancel, onSaved }: ProfileEditFormProps) {
    const { mutate: updateProfile, isPending } = useUpdateProfile();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),
        mode: "onBlur",
        defaultValues: {
            firstName: profile.firstName,
            lastName: profile.lastName,
            cellphone: profile.cellphone ?? "",
        },
    });

    const onSubmit = (data: ProfileSchema) => {
        updateProfile(data, { onSuccess: onSaved });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="px-8 py-8 space-y-5">
                <div className="rounded-2xl border border-primary/20 bg-primary/[0.03] p-6 sm:p-7 space-y-6">
                    <p className="text-sm font-medium uppercase tracking-wide text-primary/70">
                        {PROFILE_EDITING_TITLE}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField label={PROFILE_FIELD_LABELS.firstName} name="firstName" error={errors.firstName}>
                            <IconInput
                                icon={FaUser}
                                id="firstName"
                                autoComplete="given-name"
                                placeholder={PROFILE_PLACEHOLDERS.firstName}
                                className="h-12 text-base"
                                aria-invalid={!!errors.firstName}
                                autoFocus
                                {...register("firstName")}
                            />
                        </FormField>

                        <FormField label={PROFILE_FIELD_LABELS.lastName} name="lastName" error={errors.lastName}>
                            <IconInput
                                icon={FaUser}
                                id="lastName"
                                autoComplete="family-name"
                                placeholder={PROFILE_PLACEHOLDERS.lastName}
                                className="h-12 text-base"
                                aria-invalid={!!errors.lastName}
                                {...register("lastName")}
                            />
                        </FormField>
                    </div>

                    <FormField label={PROFILE_FIELD_LABELS.cellphone} name="cellphone" error={errors.cellphone}>
                        <IconInput
                            icon={FaPhone}
                            id="cellphone"
                            autoComplete="tel"
                            placeholder={PROFILE_PLACEHOLDERS.cellphone}
                            maxLength={9}
                            inputMode="numeric"
                            className="h-12 text-base"
                            aria-invalid={!!errors.cellphone}
                            {...register("cellphone")}
                        />
                    </FormField>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                        <InfoRow
                            icon={<FaEnvelope size={INFO_ICON_SIZE} className="text-primary" aria-hidden="true" />}
                            label={PROFILE_FIELD_LABELS.email}
                            value={profile.email}
                        />
                        <InfoRow
                            icon={<FaCreditCard size={INFO_ICON_SIZE} className="text-primary" aria-hidden="true" />}
                            label={PROFILE_FIELD_LABELS.dni}
                            value={profile.dni}
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 px-8 py-6 border-t border-border/20 bg-muted/10">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isPending}
                    className="flex-1 h-12 text-base"
                >
                    {PROFILE_ACTIONS.cancel}
                </Button>
                <LoadingButton
                    type="submit"
                    className="flex-1 h-12 text-base"
                    loading={isPending}
                    loadingText={PROFILE_ACTIONS.saving}
                >
                    {PROFILE_ACTIONS.save}
                </LoadingButton>
            </div>
        </form>
    );
}