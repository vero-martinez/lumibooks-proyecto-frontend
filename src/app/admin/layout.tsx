"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AdminTopbar } from "@/components/layout/admin/AdminTopbar";
import { ROUTES } from "@/lib/routes";
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
} from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import type { SidebarItemData } from "@/components/layout/AppSidebar";

const ADMIN_SIDEBAR_ITEMS: SidebarItemData[] = [
  {
    type: "link",
    href: ROUTES.admin.dashboard,
    label: "Dashboard",
    icon: IoHome,
    exact: true,
  },
  { type: "link", href: ROUTES.admin.books, label: "Libros", icon: FaBook },
  {
    type: "catalog",
    label: "Catálogo",
    icon: FaListUl,
    children: [
      { href: ROUTES.admin.catalog.authors, label: "Autores", icon: FaUser },
      { href: ROUTES.admin.catalog.categories, label: "Categorías", icon: FaTag },
      { href: ROUTES.admin.catalog.publishers, label: "Editoriales", icon: FaBuilding },
    ],
  },
  { type: "link", href: ROUTES.admin.orders, label: "Pedidos", icon: FaShoppingCart },
  { type: "link", href: ROUTES.admin.users, label: "Usuarios", icon: FaUsers },
  { type: "link", href: ROUTES.admin.reviews, label: "Reseñas", icon: FaStar },
  { type: "link", href: ROUTES.admin.banners, label: "Banners", icon: FaImage },
  { type: "link", href: ROUTES.admin.history, label: "Historial", icon: FaHistory },
  { type: "link", href: ROUTES.admin.subscriptions, label: "Suscripciones", icon: FaCreditCard },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar
          items={ADMIN_SIDEBAR_ITEMS}
          ariaLabel="Menú de administración"
          brandLabel="Panel admin"
          dashboardHref={ROUTES.admin.dashboard}
        />
        <SidebarInset className="min-w-0 overflow-x-hidden">
          <AdminTopbar dashboardPath={ROUTES.admin.dashboard} />
          <div className="px-8 sm:px-8 md:px-18 md: py-12 overflow-hidden">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}