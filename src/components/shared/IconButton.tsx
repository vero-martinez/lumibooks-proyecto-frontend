import Link from "next/link";
import { IconType } from "react-icons";

interface IconButtonProps {
    icon: IconType;
    href?: string;
    label: string;
    onClick?: () => void;
}

export function IconButton({ icon: Icon, href, label, onClick }: IconButtonProps) {
    const classes = "w-11 h-11 rounded-full bg-accent flex items-center justify-center text-foreground hover:bg-accent/80 transition-colors";

    if (href) {
        return (
            <Link href={href} aria-label={label} className={classes}>
                <Icon size={22} />
            </Link>
        );
    }

    return (
        <button onClick={onClick} aria-label={label} className={classes}>
            <Icon size={22} />
        </button>
    );
}