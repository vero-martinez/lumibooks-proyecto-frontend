"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { IconButton } from "@/components/shared/IconButton";
import { SearchBar } from "@/components/shared/SearchBar";
import { AppLink } from "@/components/shared/AppLink";

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="sticky top-0 z-50 shadow-lg">
            <header className="w-full bg-foreground px-6 py-4 ">
                <div className="max-w-7xl mx-auto flex items-center gap-12">
                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-4 shrink-0">
                        <Image src="/logo.svg" alt="LumiBooks" width={85} height={85} />
                        <span className="font-bold text-background text-2xl">
                            LumiBooks
                        </span>
                    </Link>

                    {/* BARRA DE BÚSQUEDA — oculta en mobile */}
                    <div className="hidden lg:flex flex-1 max-w-xl">
                        <SearchBar />
                    </div>

                    {/* ICONOS — ocultos en mobile */}
                    <div className="hidden lg:flex items-center gap-6 shrink-0">
                        <IconButton href="/cart" icon={FaShoppingCart} label="Carrito" />
                        <IconButton
                            href="/cliente/wishlist"
                            icon={FaHeart}
                            label="Favoritos"
                        />

                        <Link
                            href="/login"
                            className="flex flex-col items-start justify-center hover:opacity-80 transition-opacity"
                        >
                            <span className="font-bold text-primary-foreground">¡Hola!</span>
                            <span className="text-sm font-bold text-primary-foreground">
                                Iniciar Sesión
                            </span>
                        </Link>

                        <IconButton icon={FaUser} label="Usuario" />
                    </div>

                    {/* HAMBURGUESA — solo en mobile */}
                    <button
                        className="lg:hidden ml-auto text-background"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menú"
                    >
                        {menuOpen ? <IoMdCloseCircle size={28} /> : <TiThMenu size={28} />}
                    </button>
                </div>

                {/* MENÚ MOBILE */}
                {menuOpen && (
                    <div className="lg:hidden bg-foreground px-6 py-6 flex flex-col gap-6 border-t border-primary-foreground/20">
                        <SearchBar />
                        <div className="flex flex-col gap-4 text-background">
                            <Link
                                href="/cart"
                                className="flex items-center gap-3 hover:opacity-80"
                                onClick={() => setMenuOpen(false)}
                            >
                                <FaShoppingCart size={20} />
                                <span className="text-sm font-medium">Carrito</span>
                            </Link>
                            <Link
                                href="/cliente/wishlist"
                                className="flex items-center gap-3 hover:opacity-80"
                                onClick={() => setMenuOpen(false)}
                            >
                                <FaHeart size={20} />
                                <span className="text-sm font-medium">Favoritos</span>
                            </Link>
                            <Link
                                href="/login"
                                className="flex items-center gap-3 hover:opacity-80"
                                onClick={() => setMenuOpen(false)}
                            >
                                <FaUser size={20} />
                                <span className="text-sm font-medium">Iniciar Sesión</span>
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* BARRA DE NAVEGACIÓN SECUNDARIA */}
            <nav className="flex w-full bg-accent">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-12">
                    <AppLink href="/" className="hover:text-foreground font-semibold">
                        Inicio
                    </AppLink>
                    <AppLink
                        href="/books"
                        className="hover:text-foreground font-semibold"
                    >
                        Libros
                    </AppLink>
                    <AppLink
                        href="/authors"
                        className="hover:text-foreground font-semibold"
                    >
                        Autores
                    </AppLink>
                </div>
            </nav>
        </div>
    );
}
