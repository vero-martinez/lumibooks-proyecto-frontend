"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AdminTopbar } from "@/components/layout/admin/AdminTopbar";
import { ROUTES } from "@/lib/routes";
import { FaShoppingCart } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import type { SidebarItemData } from "@/components/layout/AppSidebar";

const GESTOR_SIDEBAR_ITEMS: SidebarItemData[] = [
  {
    type: "link",
    href: ROUTES.gestor.dashboard,
    label: "Dashboard",
    icon: IoHome,
    exact: true,
  },
  {
    type: "link",
    href: ROUTES.gestor.orders,
    label: "Mis Pedidos",
    icon: FaShoppingCart,
  },
];

export default function GestorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar
          items={GESTOR_SIDEBAR_ITEMS}
          ariaLabel="Menú de gestión"
          brandLabel="Panel gestor"
          dashboardHref={ROUTES.gestor.dashboard}
        />
        <SidebarInset className="min-w-0 overflow-x-hidden">
          <AdminTopbar dashboardPath={ROUTES.gestor.dashboard} />
          <div className="px-8 sm:px-8 md:px-18 md: py-12 overflow-hidden">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}