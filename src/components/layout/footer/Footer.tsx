import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaCcVisa, FaCcMastercard, FaCcDinersClub } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { AppLink } from "@/components/shared/AppLink";

export function Footer() {
    return (
        <footer className="w-full bg-foreground text-primary-foreground mt-auto ">

            {/* CONTENIDO PRINCIPAL */}
            <div className="max-w-7xl mx-auto px-14 py-10 grid grid-cols-1 md:grid-cols-4 gap-10 justify-items-center md:justify-items-start text-center md:text-left">

                {/* COLUMNA LOGO E INFO */}
                <div className="md:col-span-1 flex flex-col gap-4 items-center md:items-start">
                    <Link href="/" className="flex items-center gap-2 justify-center">
                        <span className="font-bold text-2xl">LumiBooks</span>
                    </Link>

                    <div className="text-md text-background font-bold">
                        Siguenos en nuestras redes sociales:
                    </div>

                    {/* REDES SOCIALES */}
                    <div className="flex items-center gap-4 mt-2">
                        <AppLink href="https://instagram.com">
                            <FaInstagram size={25} />
                        </AppLink>
                        <AppLink href="https://facebook.com">
                            <FaFacebook size={25} />
                        </AppLink>
                        <AppLink href="https://tiktok.com">
                            <FaTiktok size={25} />
                        </AppLink>

                        <AppLink href="https://wa.me/51999999999">
                            <FaWhatsapp size={25} />
                        </AppLink>
                    </div>
                </div>

                {/* COLUMNA SOBRE NOSOTROS */}
                <div className="flex flex-col gap-3">
                    <h4 className="font-bold text-sm uppercase tracking-wider">Sobre Nosotros</h4>
                    <div className="flex flex-col gap-4 text-sm text-background">
                        <AppLink href="/books">Quienes Somos</AppLink>
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
                        <AppLink href="/books">Infantil</AppLink>
                        <AppLink href="/books">Juvenil</AppLink>
                        <AppLink href="/books">Fantasía</AppLink>
                        <AppLink href="/books">Romance</AppLink>
                        <AppLink href="/books">Misterio</AppLink>

                    </div>
                </div>

                {/* COLUMNA LEGAL */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-sm uppercase tracking-wider">Políticas</h4>
                    <div className="flex flex-col gap-2 text-sm text-background">
                        <AppLink href="/terms">Términos y condiciones</AppLink>
                        <AppLink href="/privacy">Política de privacidad</AppLink>
                    </div>

                    <h4 className="font-bold text-sm uppercase tracking-wider">Métodos de Pago</h4>
                    <div className="flex items-center gap-4 mt-1">
                        <FaCcVisa size={22} />
                        <FaCcMastercard size={22} />
                        <SiAmericanexpress size={22} />
                        <FaCcDinersClub size={23} />
                    </div>
                </div>

            </div>

            {/* LÍNEA Y COPYRIGHT */}
            <div className="border-t border-primary-foreground/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 text-sm text-background text-center md:text-left">
                    <span>© 2026 LumiBooks. Todos los derechos reservados.</span>
                    <div className="flex gap-4">
                        <AppLink href="/terms" >Términos</AppLink>
                        <AppLink href="/privacy">Privacidad</AppLink>
                    </div>
                </div>
            </div>

        </footer>
    );
}