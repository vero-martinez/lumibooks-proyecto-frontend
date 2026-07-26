import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/footer/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}