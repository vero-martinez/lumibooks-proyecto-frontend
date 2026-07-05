/**
 * Enlace inline con subrayado animado al hacer hover.
 * Wrapper sobre Next.js Link que acepta todas sus props nativas.
 */
import { type ComponentPropsWithoutRef } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

interface LinkProps extends ComponentPropsWithoutRef<typeof NextLink> {
    children: React.ReactNode;
}

export function Link({ children, className, ...props }: LinkProps) {
    return (
        <NextLink
            {...props}
            className={cn(
                "underline decoration-transparent hover:decoration-accent underline-offset-2 transition-[text-decoration-color] duration-200",
                className,
            )}
        >
            {children}
        </NextLink>
    );
}