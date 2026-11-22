"use client";

import { usePathname, useRouter } from "next/navigation";
import { setSearchQuery, useSearchQuery } from "@/lib/search-query";
import { CATALOG_STATE_KEY } from "@/lib/nav";

/**
 * Search field that lives in the header on every page. On the home page it
 * filters the catalog as you type; elsewhere Enter opens the catalog with the query.
 */
export function SearchBar() {
  const value = useSearchQuery();
  const pathname = usePathname();
  const router = useRouter();
  const onHome = pathname === "/";

  const openCatalog = () => {
    const q = value.trim();
    if (!q || onHome) return;
    try {
      sessionStorage.setItem(CATALOG_STATE_KEY, JSON.stringify({ categoryPath: [], search: q, limit: 24, scrollY: 0 }));
    } catch {}
    router.push("/");
  };

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        openCatalog();
        (document.activeElement as HTMLElement | null)?.blur();
      }}
      className="relative flex-1 min-w-0"
    >
      <svg
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Поиск товаров и категорий..."
        enterKeyHint="search"
        autoComplete="off"
        aria-label="Поиск товаров"
        className="w-full h-10 pl-11 pr-10 rounded-xl bg-neutral-100/80 text-[16px] sm:text-sm placeholder:text-neutral-400 border-0 outline-none transition-[background-color,box-shadow] focus:bg-white focus:ring-2 focus:ring-neutral-900/10 [&::-webkit-search-cancel-button]:appearance-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => setSearchQuery("")}
          aria-label="Очистить поиск"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-neutral-600"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </form>
  );
}
