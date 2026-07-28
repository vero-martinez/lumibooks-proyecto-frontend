/**
 * Sidebar de navegación del panel de administración.
 * Muestra logo, enlaces de navegación con estado activo y botón de logout.
 */
"use client";

import { Fragment, useState } from "react";
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
  FaTag,
  FaBuilding,
  FaChevronDown,
} from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
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

interface SidebarChild {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

type SidebarItemData =
  | {
      type: "link";
      href: string;
      label: string;
      icon: React.ComponentType<{ size?: number }>;
      exact?: boolean;
    }
  | {
      type: "catalog";
      label: string;
      icon: React.ComponentType<{ size?: number }>;
      children: SidebarChild[];
    };

const SIDEBAR_ITEMS: SidebarItemData[] = [
  {
    type: "link",
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: IoHome,
    exact: true,
  },
  { type: "link", href: "/admin/books", label: "Libros", icon: FaBook },
  {
    type: "catalog",
    label: "Catálogo",
    icon: FaListUl,
    children: [
      { href: "/admin/catalog/authors", label: "Autores", icon: FaUser },
      { href: "/admin/catalog/categories", label: "Categorías", icon: FaTag },
      {
        href: "/admin/catalog/publishers",
        label: "Editoriales",
        icon: FaBuilding,
      },
    ],
  },
  {
    type: "link",
    href: "/admin/orders",
    label: "Pedidos",
    icon: FaShoppingCart,
  },
  { type: "link", href: "/admin/users", label: "Usuarios", icon: FaUsers },
  { type: "link", href: "/admin/reviews", label: "Reseñas", icon: FaStar },
  { type: "link", href: "/admin/banners", label: "Banners", icon: FaImage },
  { type: "link", href: "/admin/history", label: "Historial", icon: FaHistory },
  {
    type: "link",
    href: "/admin/subscriptions",
    label: "Suscripciones",
    icon: FaCreditCard,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    new Set(["Catálogo"]),
  );

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

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
              {SIDEBAR_ITEMS.map((item) => {
                if (item.type === "catalog") {
                  const isOpen = openGroups.has(item.label);
                  const hasActiveChild = item.children.some((child) =>
                    pathname.startsWith(child.href),
                  );

                  return (
                    <Fragment key={item.label}>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => toggleGroup(item.label)}
                          aria-expanded={isOpen}
                          aria-controls={`sidebar-group-${item.label}`}
                          className="gap-2 data-active:bg-accent data-active:text-accent-foreground justify-between"
                        >
                          <span className="flex items-center gap-2">
                            <item.icon size={18} />
                            <span>{item.label}</span>
                          </span>
                          <FaChevronDown
                            size={12}
                            className={`transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      {isOpen && (
                        <div id={`sidebar-group-${item.label}`}>
                          {item.children.map((child) => (
                            <SidebarMenuItem key={child.href}>
                              <SidebarMenuButton
                                asChild
                                isActive={pathname.startsWith(child.href)}
                                className="data-active:bg-accent data-active:text-accent-foreground pl-8"
                              >
                                <Link href={child.href}>
                                  <child.icon size={18} />
                                  <span>{child.label}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </div>
                      )}
                    </Fragment>
                  );
                }

                const isActive = item.exact
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