"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useCart } from "./CartProvider";
import { useFavorites } from "./FavoritesProvider";
import { CATALOG_STATE_KEY } from "@/lib/nav";

const icon = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Item({
  label,
  active,
  badge,
  badgeClass,
  onClick,
  href,
  children,
}: {
  label: string;
  active?: boolean;
  badge?: number;
  badgeClass?: string;
  onClick?: () => void;
  href?: string;
  children: ReactNode;
}) {
  const body = (
    <>
      <span className="relative">
        {children}
        {!!badge && badge > 0 && (
          <span
            className={`absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full ring-2 ring-white text-white text-[10px] font-bold leading-none flex items-center justify-center tabular-nums ${badgeClass}`}
          >
            {badge > 99 ? "99+" : badge}
          </span>
        )}
      </span>
      <span className="text-[10.5px] font-medium leading-none">{label}</span>
    </>
  );
  const cls = `flex-1 h-full flex flex-col items-center justify-center gap-1 transition-colors hover:text-neutral-900 active:scale-95 ${active ? "text-neutral-900" : "text-neutral-400"}`;
  return href ? (
    <a href={href} className={cls} aria-label={label}>
      {body}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={cls} aria-label={label}>
      {body}
    </button>
  );
}

/** Bottom menu bar on every screen size. */
export function MobileNav() {
  const { totalItems, setIsOpen } = useCart();
  const { totalFavorites, setFavDrawerOpen, setShowFavOnly } = useFavorites();
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* keeps the page end clear of the bar */}
      <div className="h-[calc(64px+env(safe-area-inset-bottom))]" aria-hidden />
      <nav
        aria-label="Меню"
        className="fixed inset-x-0 bottom-0 z-50 bg-white/90 backdrop-blur-xl backdrop-saturate-150 border-t border-neutral-200/70 shadow-[0_-8px_24px_-16px_rgba(0,0,0,0.18)] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="h-16 max-w-xl mx-auto flex items-stretch px-2">
          <Item label="Главная" active={pathname === "/"} onClick={goHome}>
            <svg {...icon}>
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </Item>
          <Item label="Избранное" badge={totalFavorites} badgeClass="bg-red-500" onClick={() => setFavDrawerOpen(true)}>
            <svg {...icon}>
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </Item>
          <Item label="Админ" href="/admin">
            <svg {...icon}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </Item>
          <Item label="Корзина" active badge={totalItems} badgeClass="bg-neutral-900" onClick={() => setIsOpen(true)}>
            <svg {...icon}>
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </Item>
        </div>
      </nav>
    </>
  );
}
