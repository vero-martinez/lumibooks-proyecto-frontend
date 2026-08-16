import NextLink from "next/link";
import Image from "next/image";
import { ROUTES } from "@/lib/routes";

export function NavLogo() {
  return (
    <NextLink
      href={ROUTES.home}
      className="flex shrink-0 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-background/50 sm:gap-3 md:gap-4"
    >
      <div className="relative h-[70px] w-[70px] shrink-0 md:h-[85px] md:w-[85px]">
        <Image
          src="/logo.svg"
          alt="LumiBooks"
          fill
          priority
          className="object-contain"
        />
      </div>

      <span
        className="text-xl font-bold leading-none tracking-tight lg:text-2xl"
        aria-hidden="true"
      >
        <span className="text-accent drop-shadow-sm">Lumi</span>
        <span className="font-extrabold text-background drop-shadow-sm">
          Books
        </span>
      </span>
    </NextLink>
  );
}