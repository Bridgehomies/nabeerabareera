// components/ProductsFilter.tsx
"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import qs from "query-string";
import { useSearchParams, useRouter } from "next/navigation";

export function ProductsFilter({ productsLength, limit }: { productsLength: number; limit: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") || "all";
  const subcategories = searchParams.getAll("subcategories") || [];
  const sort = searchParams.get("sort") || "newest";
  const page = searchParams.get("page") || "1";
  const pageNum = parseInt(page, 10) || 1;

  const changeQuery = (newParams: Record<string, any>) => {
    const currentParams = {
      category,
      subcategories,
      sort,
      page,
    };
    const newQuery = qs.stringify(
      { ...currentParams, ...newParams },
      { arrayFormat: "bracket", skipNull: true }
    );
    router.push(`/products/?${newQuery}`);
  };

  const currentSubcategory = Array.isArray(subcategories) && subcategories.length > 0
    ? subcategories[0]
    : "";

  return (
    <div className="flex flex-wrap gap-4 items-end mb-10">
      {/* Category */}
      <div>
        <label className="block font-semibold mb-1 text-xs uppercase">Category</label>
        <Select
          value={category}
          onValueChange={(v) => {
            changeQuery({ category: v, subcategories: undefined, page: 1 });

          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="jewelry">Jewelry</SelectItem>
            <SelectItem value="coats">Coats</SelectItem>
            <SelectItem value="kids">Kids</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Subcategories */}
      {category !== "all" && (
        <div>
          <label className="block font-semibold mb-1 text-xs uppercase">Subcategories</label>
          <Select
            value={currentSubcategory}
            onValueChange={(v) => {
              changeQuery({ subcategories: v ? [v] : undefined, page: 1 });

            }}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {category === "jewelry" &&
                ["NECKLACES", "EARRINGS", "BRACELETS", "RINGS"].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              {category === "kids" &&
                ["TOPS", "BOTTOMS", "DRESSES", "OUTERWEAR"].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              {category === "coats" &&
                ["OVERCOATS", "TRENCH COATS", "PUFFER JACKETS", "PARKAS"].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Sort */}
      <div>
        <label className="block font-semibold mb-1 text-xs uppercase">Sort By</label>
        <Select
          value={sort}
          onValueChange={(v) => {
            changeQuery({ sort: v });
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="low">Price Low → High</SelectItem>
            <SelectItem value="high">Price High → Low</SelectItem>
            <SelectItem value="rating">Best Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center gap-4">
        <button
          disabled={pageNum === 1}
          onClick={() => {
            changeQuery({ page: pageNum - 1 });
          }}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Previous
        </button>
        <button
          disabled={productsLength < limit}
          onClick={() => {
            changeQuery({ page: pageNum + 1 });
          }}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}