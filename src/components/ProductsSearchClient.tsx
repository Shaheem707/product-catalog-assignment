"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import FiltersPanel from "./FiltersPanel";
import { FaFilter } from "react-icons/fa";
import { Product } from "@/types/product";

export default function ProductsSearchClient({
  products,
}: {
  products: Product[];
}) {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "all",
  ]);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sortOrder, setSortOrder] = useState<
    "none" | "low-to-high" | "high-to-low"
  >("none");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] =
    useState<boolean>(false);

  const categories = useMemo(() => {
    const cats = new Set(
      products.map((p) => p.category).filter((c): c is string => Boolean(c)) // <- type guard ensures only strings
    );
    return ["all", ...Array.from(cats)];
  }, [products]);

  // Filter and sort products
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = products.filter((p) => {
      const matchesSearch = q
        ? (p.title ?? "").toLowerCase().includes(q)
        : true;
      const matchesCategory = selectedCategories.includes("all") // "all" selected → match everything
        ? true
        : selectedCategories.includes(p.category ?? "");
      const price = p.price ?? 0;
      const matchesMin = minPrice === "" ? true : price >= Number(minPrice);
      const matchesMax = maxPrice === "" ? true : price <= Number(maxPrice);

      return matchesSearch && matchesCategory && matchesMin && matchesMax;
    });

    // Apply sorting
    if (sortOrder === "low-to-high") {
      result = [...result].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sortOrder === "high-to-low") {
      result = [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    }

    return result;
  }, [products, query, selectedCategories, minPrice, maxPrice, sortOrder]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold">Product Catalog</h1>
        </Link>
        <div
          className="md:hidden border-2 border-gray-300 rounded-full p-2 cursor-pointer"
          onClick={() => setIsMobileFiltersOpen(true)}
        >
          <FaFilter />
        </div>
      </div>
      {/* Mobile search bar */}
      <div className="md:hidden mb-4">
        <input
          type="search"
          aria-label="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        />
      </div>
      <div className="flex gap-6 w-full h-full">
        {/* Sidebar with search + filters */}
        <aside className="w-64 hidden md:block border-r border-r-gray-300 pr-5 h-[93%] overflow-y-auto custom-scrollbar">
          {/* Testing with filter panel */}
          <FiltersPanel
            query={query}
            setQuery={setQuery}
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            isMobileFiltersOpen={isMobileFiltersOpen}
            setIsMobileFiltersOpen={setIsMobileFiltersOpen}
            namePrefix="category-desktop"
          />
        </aside>

        {/* Mobile filters modal */}
        {isMobileFiltersOpen && setIsMobileFiltersOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center"
            onClick={() => setIsMobileFiltersOpen(false)}
          >
            <div
              className="bg-black w-80 h-4/5 p-6 overflow-y-auto rounded-lg border border-gray-500 shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="text-2xl absolute top-4 right-4 text-white cursor-pointer"
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                ✕
              </button>

              <FiltersPanel
                query={query}
                setQuery={setQuery}
                categories={categories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                isMobileFiltersOpen={isMobileFiltersOpen}
                setIsMobileFiltersOpen={setIsMobileFiltersOpen}
                namePrefix="category-mobile"
              />
            </div>
          </div>
        )}

        {/* Products grid */}
        <main className="flex-1 w-full h-[93%] overflow-y-auto custom-scrollbar md:pr-2 pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
            {filtered.map((product) => {
              const slug = product.slug?.current;
              if (!slug) return null;

              return (
                <Link
                  key={product._id}
                  href={`/product/${slug}`}
                  target="_blank"
                  className="block"
                >
                  <div className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer flex flex-col h-full">
                    {product.image ? (
                      <img
                        src={urlFor(product.image).width(400).url()}
                        // src={product.image} //For mock data
                        alt={product.title ?? "Product image"}
                        className="mb-3 w-full h-48 object-cover rounded"
                      />
                    ) : (
                      <div className="mb-3 w-full h-48 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">
                        No image
                      </div>
                    )}

                    <h2 className="text-lg font-semibold">{product.title}</h2>
                    <p className="text-gray-600">${product.price ?? "—"}</p>
                    {product.category && (
                      <p className="text-sm text-gray-500 capitalize">
                        {product.category}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="mt-6 text-center text-gray-500">
              No products match your filters.
            </p>
          )}
        </main>
      </div>
    </>
  );
}
