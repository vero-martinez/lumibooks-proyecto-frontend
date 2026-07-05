import { Suspense } from "react";
import { Footer } from "@/components/layout/footer/Footer";
import { Navbar } from "@/components/layout/navbar/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex flex-col w-screen overflow-x-clip">
      {/* Suspense necesario porque Navbar usa useSearchParams */}
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      {/* El contenido principal ocupa el espacio restante */}
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}