/**
 * Componente reutilizable para acciones de tabla (ver, editar, toggle, etc.).
 * Soporta botones con onClick y links con href.
 */
import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ActionItem {
    label: string;
    icon: ReactNode;
    onClick?: () => void;
    href?: string;
    disabled?: boolean;
}

interface TableActionsProps {
    actions: ActionItem[];
}

export function TableActions({ actions }: TableActionsProps) {
    return (
        <div className="flex gap-1">
            {actions.map((action, i) =>
                action.href ? (
                    <Button
                        key={i}
                        variant="ghost"
                        size="icon-lg"
                        asChild
                        className="text-foreground"
                    >
                        <Link href={action.href} aria-label={action.label}>
                            {action.icon}
                        </Link>
                    </Button>
                ) : (
                    <Button
                        key={i}
                        variant="ghost"
                        size="icon-lg"
                        onClick={action.onClick}
                        disabled={action.disabled}
                        aria-label={action.label}
                        className="text-foreground"
                    >
                        {action.icon}
                    </Button>
                ),
            )}
        </div>
    );
}