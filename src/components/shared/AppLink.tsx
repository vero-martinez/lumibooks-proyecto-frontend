import Link from "next/link";
import { cn } from "@/lib/utils";

interface AppLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export function AppLink({ href, children, className }: AppLinkProps) {
    return (
        <Link href={href} className={cn("hover:text-accent hover:underline transition-colors", className)}>
            {children}
        </Link>
    );
}