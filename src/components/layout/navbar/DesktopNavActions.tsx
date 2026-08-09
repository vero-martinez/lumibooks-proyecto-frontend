import { CartMiniDropdown } from "@/features/cart/components/CartMiniDropdown";
import { WishlistMiniDropdown } from "@/features/wishlists/components";
import { UserMiniDropdown } from "@/features/auth/components/UserMiniDropdown";
import { Separator } from "@/components/ui/separator";

export function DesktopNavActions() {
  return (
    <div className="hidden shrink-0 items-center gap-6 lg:flex">
      <div className="flex items-center gap-4">
        <CartMiniDropdown />
        <WishlistMiniDropdown />
      </div>

      <Separator orientation="vertical" className="bg-secondary/40" />

      <UserMiniDropdown />
    </div>
  );
}