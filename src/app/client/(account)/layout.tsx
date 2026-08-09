import { AccountSidebar } from "@/components/layout/account/AccountSidebar";

/**
 * Layout del área de cuenta (/client/...).
 * Agrega el sidebar de navegación a todas las páginas del route group.
 * El route group (account) no cambia las URLs.
 */
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row md:py-12">
      <AccountSidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}