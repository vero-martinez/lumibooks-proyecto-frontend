"use client";

/**
 * Selector interactivo de calificación por estrellas.
 * Usado en el formulario de creación de reseñas; soporta estado
 * deshabilitado (edición, donde la calificación no se puede cambiar).
 */
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface StarRatingInputProps {
    value: number | null;
    onChange: (value: number) => void;
    disabled?: boolean;
}

export function StarRatingInput({ value, onChange, disabled = false }: StarRatingInputProps) {
    const [hovered, setHovered] = useState<number | null>(null);
    const displayed = hovered ?? value ?? 0;

    return (
        <div
            role="radiogroup"
            aria-label="Calificación"
            className="flex items-center gap-1"
            onMouseLeave={() => setHovered(null)}
        >
            {Array.from({ length: 5 }, (_, i) => {
                const stars = i + 1;
                const active = stars <= displayed;
                const Icon = active ? FaStar : FaRegStar;

                return (
                    <button
                        key={stars}
                        type="button"
                        role="radio"
                        aria-checked={value === stars}
                        aria-label={`${stars} ${stars === 1 ? "estrella" : "estrellas"}`}
                        disabled={disabled}
                        onClick={() => onChange(stars)}
                        onMouseEnter={() => !disabled && setHovered(stars)}
                        className={cn(
                            "rounded-sm transition-transform",
                            "!outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            !disabled && "hover:scale-110 cursor-pointer",
                            disabled && "cursor-not-allowed opacity-70",
                        )}
                    >
                        <Icon
                            size={28}
                            aria-hidden="true"
                            className={active ? "text-star" : "text-muted"}
                        />
                    </button>
                );
            })}
            <span
                aria-hidden="true"
                className="ml-2 text-sm text-muted-foreground tabular-nums w-4"
            >
                {displayed > 0 ? displayed : ""}
            </span>
        </div>
    );
}