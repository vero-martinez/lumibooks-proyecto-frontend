/**
 * Sidebar de navegación del panel de administración.
 * Muestra logo, enlaces de navegación con estado activo y botón de logout.
 */
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaBook,
  FaShoppingCart,
  FaListUl,
  FaUsers,
  FaStar,
  FaImage,
  FaHistory,
  FaCreditCard,
} from "react-icons/fa";
import { IoLogOut, IoHome } from "react-icons/io5";
import { useAuthStore } from "@/stores/auth.store";
import { UserAvatar } from "@/components/shared/UserAvatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: IoHome },
  { href: "/admin/books", label: "Libros", icon: FaBook },
  { href: "/admin/orders", label: "Pedidos", icon: FaShoppingCart },
  { href: "/admin/catalog", label: "Catalogo", icon: FaListUl },
  { href: "/admin/users", label: "Usuarios", icon: FaUsers },
  { href: "/admin/reviews", label: "Reseñas", icon: FaStar },
  { href: "/admin/banners", label: "Banners", icon: FaImage },
  { href: "/admin/history", label: "Historial", icon: FaHistory },
  { href: "/admin/subscriptions", label: "Suscripciones", icon: FaCreditCard },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <Sidebar
      aria-label="Menú de administración"
      className="rounded-r-2xl overflow-hidden"
    >
      <SidebarHeader className="hidden lg:flex flex-col items-center py-6">
        <Link
          href="/admin/dashboard"
          className="flex flex-col items-center gap-2"
        >
          <Image
            src="/logo.svg"
            alt="LumiBooks"
            width={64}
            height={64}
            className="transition-opacity duration-200"
          />
          <span className="text-xl font-bold tracking-tight drop-shadow-sm">
            LumiBooks
          </span>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup className="p-6">
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 text-base">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/admin/dashboard"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="data-active:bg-accent data-active:text-accent-foreground"
                    >
                      <Link href={item.href}>
                        <item.icon size={18} />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-6">
        <div className="flex items-center gap-3 px-2 mb-4">
          <UserAvatar
            name={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
            className="w-9 h-9"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              {user?.email}
            </p>
          </div>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logout}>
              <IoLogOut size={18} />
              <span>Cerrar Sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}