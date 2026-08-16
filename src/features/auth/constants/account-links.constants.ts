import { User, Package, MapPin, Heart, Lock, type LucideIcon } from "lucide-react";
import { ROUTES } from "@/lib/routes";

/**
 * Opciones de la sección "Mi cuenta".
 */
export const ACCOUNT_LINKS: ReadonlyArray<{
  href: string;
  label: string;
  icon: LucideIcon;
}> = [
  { href: ROUTES.client.profile, label: "Mi perfil", icon: User },
  { href: ROUTES.client.orders, label: "Mis pedidos", icon: Package },
  { href: ROUTES.client.addresses, label: "Mis direcciones", icon: MapPin },
  { href: ROUTES.client.wishlist, label: "Mis listas de deseos", icon: Heart },
  { href: ROUTES.client.password, label: "Mi contraseña", icon: Lock },
];