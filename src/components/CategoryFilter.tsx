"use client";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  categories: Category[];
  active: string | null;
  onSelect: (id: string | null) => void;
}

export function CategoryFilter({ categories, active, onSelect }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-3 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 min-w-max">
        <button
          onClick={() => onSelect(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            active === null
              ? "bg-neutral-900 text-white"
              : "bg-neutral-100 text-neutral-600 active:bg-neutral-200"
          }`}
        >
          Все
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id === active ? null : cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              active === cat.id
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-600 active:bg-neutral-200"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
