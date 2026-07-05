import NextLink from "next/link";
import {
    FaInstagram,
    FaTiktok,
    FaWhatsapp,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaCcVisa,
    FaCcMastercard,
    FaCcDinersClub,
} from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { Link } from "@/components/shared/Link";

export function Footer() {
    return (
        <footer className="w-full bg-foreground text-primary-foreground mt-auto border-t border-primary-foreground/10">
            <div className="max-w-7xl mx-auto px-10 md:px-14 py-10 flex flex-col md:flex-row md:justify-between gap-10 text-center md:text-left">
                <div className="flex flex-col gap-4 items-center md:items-start">
                    <NextLink href="/" className="flex items-center gap-2">
                        <span
                            className="font-extrabold text-background text-xl lg:text-2xl tracking-tight drop-shadow-sm"
                            aria-hidden="true"
                        >
                            LumiBooks
                        </span>
                    </NextLink>
                    <p className="text-sm text-background/70 leading-relaxed max-w-[200px]">
                        Descubre historias que iluminan tu mundo.
                    </p>
                    <div className="flex items-center gap-3">
                        <Link
                            href="https://instagram.com"
                            target="_blank"
                            aria-label="Instagram"
                            className="rounded-full bg-background/10 p-2.5 hover:bg-background/20 hover:scale-110 transition-all"
                        >
                            <FaInstagram size={18} />
                        </Link>
                        <Link
                            href="https://tiktok.com"
                            target="_blank"
                            aria-label="TikTok"
                            className="rounded-full bg-background/10 p-2.5 hover:bg-background/20 hover:scale-110 transition-all"
                        >
                            <FaTiktok size={18} />
                        </Link>
                        <Link
                            href="https://wa.me/51999999999"
                            target="_blank"
                            aria-label="WhatsApp"
                            className="rounded-full bg-background/10 p-2.5 hover:bg-background/20 hover:scale-110 transition-all"
                        >
                            <FaWhatsapp size={18} />
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-3 items-center md:items-start">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-background pb-2 border-b-2 border-primary-foreground/30 w-full">
                        Contacto
                    </h4>
                    <div className="flex flex-col gap-2.5 text-sm text-background/80 items-center md:items-start">
                        <span className="flex items-start gap-2">
                            <FaMapMarkerAlt
                                size={14}
                                className="shrink-0 mt-0.5 text-primary-foreground/40"
                            />
                            Av. Ejemplo 123, Lima, Perú
                        </span>
                        <a
                            href="tel:+51999999999"
                            className="flex items-center gap-2 hover:text-background transition-colors"
                        >
                            <FaPhoneAlt
                                size={14}
                                className="shrink-0 text-primary-foreground/40"
                            />
                            +51 999 999 999
                        </a>
                        <a
                            href="mailto:books@lumibooks.pe"
                            className="flex items-center gap-2 hover:text-background transition-colors"
                        >
                            <FaEnvelope
                                size={14}
                                className="shrink-0 text-primary-foreground/40"
                            />
                            books@lumibooks.pe
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-3 items-center md:items-start">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-background pb-2 border-b-2 border-primary-foreground/30 w-full">
                        Categorías
                    </h4>
                    <div className="flex flex-col gap-2 text-sm text-background/80 items-center md:items-start">
                        <Link
                            href="/books"
                            className="hover:text-background transition-colors"
                        >
                            Infantil
                        </Link>
                        <Link
                            href="/books"
                            className="hover:text-background transition-colors"
                        >
                            Juvenil
                        </Link>
                        <Link
                            href="/books"
                            className="hover:text-background transition-colors"
                        >
                            Fantasía
                        </Link>
                        <Link
                            href="/books"
                            className="hover:text-background transition-colors"
                        >
                            Romance
                        </Link>
                        <Link
                            href="/books"
                            className="hover:text-background transition-colors"
                        >
                            Misterio
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-3 items-center md:items-start">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-background pb-2 border-b-2 border-primary-foreground/30 w-full">
                        Políticas
                    </h4>
                    <div className="flex flex-col gap-2 text-sm text-background/80 items-center md:items-start">
                        <Link
                            href="/terms"
                            className="hover:text-background transition-colors"
                        >
                            Términos y condiciones
                        </Link>
                        <Link
                            href="/privacy"
                            className="hover:text-background transition-colors"
                        >
                            Política de privacidad
                        </Link>
                    </div>

                    <h4 className="font-bold text-sm uppercase tracking-widest text-background pb-2 border-b-2 border-primary-foreground/30 w-full mt-3">
                        Métodos de Pago
                    </h4>
                    <div
                        className="flex items-center gap-2 flex-wrap justify-center md:justify-start"
                        aria-hidden="true"
                    >
                        <span className="rounded-lg bg-background/10 p-1.5">
                            <FaCcVisa size={22} />
                        </span>
                        <span className="rounded-lg bg-background/10 p-1.5">
                            <FaCcMastercard size={22} />
                        </span>
                        <span className="rounded-lg bg-background/10 p-1.5">
                            <SiAmericanexpress size={22} />
                        </span>
                        <span className="rounded-lg bg-background/10 p-1.5">
                            <FaCcDinersClub size={22} />
                        </span>
                    </div>
                </div>
            </div>

            <div className="border-t border-primary-foreground/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-center md:justify-between gap-2 text-sm text-background/50 text-center md:text-left">
                    <span>
                        © {new Date().getFullYear()} LumiBooks. Todos los derechos
                        reservados.
                    </span>
                    <div className="flex gap-5">
                        <Link
                            href="/terms"
                            className="hover:text-background/80 transition-colors"
                        >
                            Términos
                        </Link>
                        <Link
                            href="/privacy"
                            className="hover:text-background/80 transition-colors"
                        >
                            Privacidad
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}