/**
 * Sidebar de navegación reutilizable para paneles admin y gestor.
 * Soporta items tipo link simple y submenús colapsables (catalog).
 */
"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useAuthStore } from "@/stores/auth.store";
import { useLogout } from "@/features/auth/hooks";
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

export interface SidebarChild {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

export type SidebarItemData =
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

interface AppSidebarProps {
  items: SidebarItemData[];
  ariaLabel: string;
  brandLabel: string;
  dashboardHref: string;
}

export function AppSidebar({
  items,
  ariaLabel,
  brandLabel,
  dashboardHref,
}: AppSidebarProps) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const { mutate: handleLogout } = useLogout();
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());

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
      aria-label={ariaLabel}
      className="rounded-r-2xl overflow-hidden border-r border-sidebar-border/60 shadow-sm"
    >
      {/* Header */}
      <SidebarHeader className="hidden lg:flex flex-col items-center py-7">
        <Link
          href={dashboardHref}
          className="flex flex-col items-center gap-2"
        >
          <span className="grid place-items-center rounded-2xl bg-sidebar-accent/40 p-2.5 ring-1 ring-sidebar-border/50 transition-all duration-200 group-hover:ring-primary/40 group-focus-visible:ring-2 group-focus-visible:ring-primary">
            <Image
              src="/logo.svg"
              alt="LumiBooks"
              width={40}
              height={40}
              className="transition-transform duration-200 group-hover:scale-105"
            />
          </span>
          <span className="text-lg font-bold tracking-tight">
            LumiBooks
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-sidebar-foreground/45">
            {brandLabel}
          </span>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Navegación */}
      <SidebarContent>
        <SidebarGroup className="px-4 py-5">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 text-[0.925rem]">
              {items.map((item) => {
                if (item.type === "catalog") {
                  const isOpen = openGroups.has(item.label);
                  const hasActiveChild = item.children.some((c) =>
                    pathname.startsWith(c.href),
                  );

                  return (
                    <Fragment key={item.label}>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => toggleGroup(item.label)}
                          aria-expanded={isOpen}
                          aria-controls={`sidebar-group-${item.label}`}
                          className={`justify-between gap-2 rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-sidebar-accent/60 ${
                            hasActiveChild ? "font-semibold" : ""
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <item.icon size={17} />
                            <span>{item.label}</span>
                          </span>
                          <FaChevronDown
                            size={11}
                            className={`transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <div
                        id={`sidebar-group-${item.label}`}
                        className={`grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out ${
                          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="ml-[1.15rem] flex flex-col gap-1 border-l border-sidebar-border/60 py-1 pl-4">
                            {item.children.map((child) => {
                              const isChildActive = pathname.startsWith(
                                child.href,
                              );
                              return (
                                <SidebarMenuItem key={child.href}>
                                  <SidebarMenuButton
                                    asChild
                                    isActive={isChildActive}
                                    className={`rounded-lg px-3 py-2 text-[0.875rem] transition-colors duration-150 ${
                                      isChildActive
                                        ? "bg-white/15 font-medium"
                                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                                    }`}
                                  >
                                    <Link href={child.href}>
                                      <child.icon size={15} />
                                      <span>{child.label}</span>
                                    </Link>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              );
                            })}
                          </div>
                        </div>
                      </div>
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
                      className={`rounded-xl px-3 py-2.5 transition-colors duration-150 ${
                        isActive
                          ? "bg-white/15 font-medium ring-1 ring-white/20"
                          : "hover:bg-sidebar-accent/60"
                      }`}
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon size={17} />
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

      {/* Footer / usuario */}
      <SidebarFooter className="p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl px-2 py-2 transition-colors duration-150 hover:bg-sidebar-accent/50">
          <UserAvatar
            name={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
            className="h-9 w-9 shrink-0 ring-2 ring-sidebar-border/60"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="truncate text-xs text-sidebar-foreground/55">
              {user?.email}
            </p>
          </div>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => handleLogout()}
              className="rounded-xl px-3 py-2.5 text-sidebar-foreground/80 transition-colors duration-150 hover:bg-destructive/10 hover:text-destructive"
            >
              <IoLogOut size={18} />
              <span>Cerrar Sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}