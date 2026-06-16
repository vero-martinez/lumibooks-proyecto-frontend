"use client";

import { BsFillSearchHeartFill } from "react-icons/bs";

interface SearchBarProps {
    placeholder?: string;
}

export function SearchBar({ placeholder = "Buscar por título, autor o ISBN" }: SearchBarProps) {
    return (
        <div className=" w-full flex items-center rounded-full bg-background overflow-hidden">
            <input
                type="text"
                placeholder={placeholder}
                className="flex-1 px-4 py-2 text-sm text-secondary-foreground placeholder:text-muted-foreground bg-transparent outline-none"
            />
            <button className="px-4 py-3 h-full bg-accent text-foreground flex items-center justify-center hover:bg-accent/80 transition-colors">
                <BsFillSearchHeartFill size={22} />
            </button>
        </div>
    );
}