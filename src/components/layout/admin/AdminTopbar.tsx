/**
 * Topbar del panel de administración.
 * Solo visible en mobile/tablet. Muestra logo y botón hamburguesa.
 * En desktop el sidebar maneja logo, navegación y usuario.
 */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { TiThMenu } from "react-icons/ti";
import { IoMdCloseCircle } from "react-icons/io";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function AdminTopbar() {
  const { openMobile, setOpenMobile } = useSidebar();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMobile(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setOpenMobile]);

  return (
    <div className="lg:hidden sticky top-0 z-50 bg-foreground shadow-lg">
      <header className="w-full px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 shrink-0"
          >
            <Image src="/logo.svg" alt="LumiBooks" width={40} height={40} />
            <span className="text-lg font-bold tracking-tight text-background drop-shadow-sm">
              LumiBooks
            </span>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpenMobile(!openMobile)}
            aria-label={openMobile ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={openMobile}
            className="text-background hover:bg-background/10"
          >
            {openMobile ? (
              <IoMdCloseCircle size={26} />
            ) : (
              <TiThMenu size={26} />
            )}
          </Button>
        </div>
      </header>
    </div>
  );
}