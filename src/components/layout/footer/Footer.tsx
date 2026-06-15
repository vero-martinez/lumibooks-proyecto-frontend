import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaCcVisa, FaCcMastercard, FaCcDinersClub } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";

export function Footer() {
    return (
        <footer className="w-full bg-foreground text-primary-foreground mt-auto ">

            {/* CONTENIDO PRINCIPAL */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 ">

                {/* COLUMNA LOGO E INFO */}
                <div className="md:col-span-1 flex flex-col gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-bold text-2xl">LumiBooks</span>
                    </Link>

                    <div className="text-md text-background font-bold">
                        Siguenos en nuestras redes sociales:
                    </div>

                    {/* REDES SOCIALES */}
                    <div className="flex items-center gap-4 mt-2">
                        <Link href="https://instagram.com" target="_blank" className="hover:text-accent transition-colors">
                            <FaInstagram size={25} />
                        </Link>
                        <Link href="https://facebook.com" target="_blank" className="hover:text-accent transition-colors">
                            <FaFacebook size={25} />
                        </Link>
                        <Link href="https://tiktok.com" target="_blank" className="hover:text-accent transition-colors">
                            <FaTiktok size={25} />
                        </Link>

                        <Link href="https://wa.me/51999999999" target="_blank" className="hover:text-accent transition-colors">
                            <FaWhatsapp size={25} />
                        </Link>
                    </div>
                </div>

                {/* COLUMNA SOBRE NOSOTROS */}
                <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-sm uppercase tracking-wider">Sobre Nosotros</h4>
                    <div className="flex flex-col gap-4 text-sm text-background">
                        <Link href="/books" className="hover:text-accent hover:underline transition-colors">Quienes Somos</Link>
                        <span className="flex items-start gap-2">
                            <FaMapMarkerAlt size={16} className="shrink-0 mt-0.5" />
                            Av. Ejemplo 123, Lima, Perú
                        </span>
                        <span className="flex items-center gap-2">
                            <FaPhoneAlt size={16} className="shrink-0" />
                            +51 999 999 999
                        </span>
                        <span className="flex items-center gap-2">
                            <FaEnvelope size={16} className="shrink-0" />
                            books@lumibooks.pe
                        </span>
                    </div>
                </div>

                {/* COLUMNA AYUDA */}
                <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-sm uppercase tracking-wider">Categorías</h4>
                    <div className="flex flex-col gap-2 text-sm text-background">
                        <Link href="/books" className="hover:text-accent hover:underline transition-colors">Infantil</Link>
                        <Link href="/books" className="hover:text-accent hover:underline transition-colors">Juvenil</Link>
                        <Link href="/books" className="hover:text-accent hover:underline transition-colors">Fantasía</Link>
                        <Link href="/books" className="hover:text-accent hover:underline transition-colors">Romance</Link>
                        <Link href="/books" className="hover:text-accent hover:underline transition-colors">Misterio</Link>

                    </div>
                </div>

                {/* COLUMNA LEGAL */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-sm uppercase tracking-wider">Políticas</h4>
                    <div className="flex flex-col gap-2 text-sm text-background">
                        <Link href="/terms" className="hover:text-accent hover:underline transition-colors">Términos y condiciones</Link>
                        <Link href="/privacy" className="hover:text-accent hover:underline transition-colors">Política de privacidad</Link>
                    </div>

                    <h4 className="font-bold text-sm uppercase tracking-wider">Métodos de Pago</h4>
                    <div className="flex items-center gap-6 mt-1">
                        <FaCcVisa size={25} />
                        <FaCcMastercard size={25} />
                        <SiAmericanexpress size={25} />
                        <FaCcDinersClub size={25} />
                    </div>
                </div>

            </div>

            {/* LÍNEA Y COPYRIGHT */}
            <div className="border-t border-primary-foreground/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-background">
                    <span>© 2026 LumiBooks. Todos los derechos reservados.</span>
                    <div className="flex gap-4">
                        <Link href="/terms" className="hover:text-accent hover:underline transition-colors">Términos</Link>
                        <Link href="/privacy" className="hover:text-accent hover:underline transition-colors">Privacidad</Link>
                    </div>
                </div>
            </div>

        </footer>
    );
}