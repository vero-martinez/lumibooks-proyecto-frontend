import Link from "next/link";

interface AppLinkProps {
    href: string;
    children: React.ReactNode;
}

export function AppLink({ href, children }: AppLinkProps) {
    return (
        <Link href={href} className="hover:text-accent hover:underline transition-colors">
            {children}
        </Link>
    );
}