"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useFavorites } from "./FavoritesProvider";
import { CATALOG_STATE_KEY } from "@/lib/nav";
import { SearchBar } from "./SearchBar";

export function Header() {
  const { setShowFavOnly } = useFavorites();
  const pathname = usePathname();
  const router = useRouter();

  const goHome = () => {
    if (pathname !== "/") {
      try { sessionStorage.removeItem(CATALOG_STATE_KEY); } catch {}
      router.push("/");
      return;
    }
    setShowFavOnly(false);
    window.dispatchEvent(new CustomEvent("autoshine-go-home"));
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <div className="px-4 h-14 flex items-center gap-3">
        <button onClick={goHome} className="flex items-center gap-2.5 shrink-0" aria-label="AUTOSHINE.TJ — на главную">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <Image src="/logo.png" alt="AUTOSHINE.TJ" width={32} height={32} className="w-full h-full object-contain" />
          </div>
          <span className="hidden sm:inline text-sm font-semibold tracking-tight">AUTOSHINE.TJ</span>
        </button>

        <SearchBar />

      </div>
    </header>
  );
}
