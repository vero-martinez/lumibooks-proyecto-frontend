"use client";

import Link from "next/link";
import { ShoppingCart, Heart, User, Search } from "lucide-react";
import Image from "next/image";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full bg-foreground py-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center gap-12">

                {/* LOGO */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <Image src="/logo.svg" alt="LumiBooks" width={85} height={85} />
                    <span className="font-bold text-background text-2xl">LumiBooks</span>
                </Link>

                {/* BARRA DE BÚSQUEDA */}
                <div className="flex-1 max-w-xl flex items-center rounded-full bg-background overflow-hidden">
                    <input
                        type="text"
                        placeholder="Buscar por título, autor o ISBN"
                        className="flex-1 px-4 py-2 text-sm text-secondary-foreground placeholder:text-muted-foreground bg-transparent outline-none"
                    />
                    <button className="px-4 py-3 h-full bg-accent text-foreground flex items-center justify-center hover:bg-accent/80 transition-colors">
                        <Search size={22} />
                    </button>
                </div>

                {/* ICONOS Y BOTÓN */}
                <div className="flex items-center gap-6 shrink-0">

                    {/* CARRITO */}
                    <Link href="/cart" className="w-11 h-11 rounded-full bg-accent flex items-center justify-center text-foreground hover:bg-accent transition-colors">
                        <ShoppingCart size={22} />
                    </Link>

                    {/* FAVORITOS */}
                    <Link href="/cliente/wishlist" className="w-11 h-11 rounded-full bg-accent flex items-center justify-center text-foreground hover:bg-accent transition-colors">
                        <Heart size={22} />
                    </Link>

                    {/* INICIAR SESIÓN */}
                    <Link href="/login" className="flex flex-col items-start justify-center hover:opacity-80 transition-opacity">
                        <span className="font-bold text-primary-foreground">¡Hola!</span>
                        <span className="text-sm font-bold text-primary-foreground">Iniciar Sesión</span>
                    </Link>

                    {/* USUARIO */}
                    <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center text-foreground hover:bg-accent transition-colors cursor-pointer">
                        <User size={22} />
                    </div>
                </div>
                
            </div>
        </header>
    );
}