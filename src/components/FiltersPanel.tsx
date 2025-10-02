type FiltersPanelProps = {
  query: string;
  setQuery: (val: string) => void;
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (val: string[]) => void;
  minPrice: number | "";
  setMinPrice: (val: number | "") => void;
  maxPrice: number | "";
  setMaxPrice: (val: number | "") => void;
  sortOrder: "none" | "low-to-high" | "high-to-low";
  setSortOrder: (val: "none" | "low-to-high" | "high-to-low") => void;
  isMobileFiltersOpen: boolean;
  setIsMobileFiltersOpen: (val: boolean) => void;
  namePrefix?: string; // so radio inputs don't conflict between desktop & mobile
};

function FiltersPanel({
  query,
  setQuery,
  categories,
  selectedCategories,
  setSelectedCategories,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortOrder,
  setSortOrder,
  isMobileFiltersOpen,
  setIsMobileFiltersOpen,
  namePrefix = "category",
}: FiltersPanelProps) {
  return (
    <div>
      {/* Search */}
      <div className="mb-6 hidden md:block">
        <input
          type="search"
          aria-label="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products by title..."
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
        />
      </div>

      {/* Category filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Category</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => {
                    if (cat === "all") {
                      // Selecting "all" clears others
                      setSelectedCategories(["all"]);
                    } else {
                      // Remove "all" if any other category is selected
                      const newSelection = selectedCategories.includes(cat)
                        ? selectedCategories.filter((c) => c !== cat) // uncheck
                        : [
                            ...selectedCategories.filter((c) => c !== "all"),
                            cat,
                          ]; // check new
                      setSelectedCategories(newSelection);
                    }
                  }}
                />
                <span className="capitalize">{cat}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price filter */}
      <div className="mb-2 md:mb-6">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value ? Number(e.target.value) : "")
            }
            className="w-20 border rounded px-2 py-1"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value ? Number(e.target.value) : "")
            }
            className="w-20 border rounded px-2 py-1"
          />
        </div>
      </div>

      {/* Sort filter */}
      <div className="md:mb-6">
        <h3 className="font-semibold mb-2">Sort By</h3>
        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(
              e.target.value as "none" | "low-to-high" | "high-to-low"
            )
          }
          className="w-full border rounded px-2 py-1"
        >
          <option value="none" className="text-black">
            None
          </option>
          <option value="low-to-high" className="text-black">
            Price: Low to High
          </option>
          <option value="high-to-low" className="text-black">
            Price: High to Low
          </option>
        </select>
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setSelectedCategories(["all"]);
            setMinPrice("");
            setMaxPrice("");
            setSortOrder("none");
            setIsMobileFiltersOpen(false);
          }}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition ease-in-out duration-300 cursor-pointer"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default FiltersPanel;
