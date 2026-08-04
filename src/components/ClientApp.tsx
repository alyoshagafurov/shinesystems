"use client";

import { CartProvider } from "./CartProvider";
import { Header } from "./Header";
import { CompanyInfo } from "./CompanyInfo";
import { Catalog } from "./Catalog";
import { CartDrawer } from "./CartDrawer";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
}

interface Props {
  categories: Category[];
  products: Product[];
}

export function ClientApp({ categories, products }: Props) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">
        <CompanyInfo />
        <div className="border-t border-neutral-100" />
        <Catalog categories={categories} products={products} />
      </main>

      <footer className="border-t border-neutral-100 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center">
          <p className="text-xs text-neutral-400">
            AUTOSHINE.TJ — Детейлинг Маркет
          </p>
          <p className="text-xs text-neutral-300 mt-1">
            ш. Душанбе бозори Кушониён блоки 14 моғозаи 4492
          </p>
          <a href="/admin" className="inline-block mt-3 text-[10px] text-neutral-300 hover:text-neutral-500 transition-colors">
            Панель управления
          </a>
        </div>
      </footer>

      <CartDrawer />
    </CartProvider>
  );
}
