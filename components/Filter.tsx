"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function ProductsFilter({
  categories,
  searchParams,
}: {
  categories: { id: string; name: string }[];
  searchParams: any;
}) {
  const router = useRouter();
  const [category, setCategory] = useState(searchParams.cat || "");
  const [sort, setSort] = useState(searchParams.sort);
  const [maxPrice, setMaxPrice] = useState(searchParams.maxPrice || "");
  const [minPrice, setMinPrice] = useState(searchParams.minPrice || "");

  function filterChange(id: string, value: string) {
    if (id == "cat") {
      setCategory(value);
    } else if (id == "sort") {
      setSort(value);
    }
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set(id, value);
    const newPathname = `${window.location.pathname}?${currentParams.toString()}`;
    router.push(newPathname);
  }

  function setPrices(e: FormEvent) {
    e.preventDefault();
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("minPrice", minPrice);
    currentParams.set("maxPrice", maxPrice);
    const newPathname = `${window.location.pathname}?${currentParams.toString()}`;
    router.push(newPathname);
  }

  return (
    <div className="filter pt-5 pb-5 px-[1px] mb-5 flex justify-between overflow-x-auto">
      <div className="flex me-5">
        <form onSubmit={setPrices} className="flex gap-3">
          <input
            type="number"
            placeholder="min price"
            className="text-xs rounded-2xl pl-3 pe-1 py-1 w-24 ring-1 ring-gray-400 focus:outline-main bg-transparent"
            onChange={(e) => setMinPrice(e.target.value)}
            value={minPrice}
          />
          <input
            type="number"
            placeholder="max price"
            className="text-xs rounded-2xl pl-3 pe-1 py-1 w-24 ring-1 ring-gray-400 focus:outline-main bg-transparent"
            onChange={(e) => setMaxPrice(e.target.value)}
            value={maxPrice}
          />
          <button className="text-xs bg-black text-white px-3 rounded-2xl">OK</button>
        </form>
        <select
          onChange={(e) => filterChange("cat", e.target.value)}
          value={category}
          className="py-2 px-4 w-[180px] rounded-2xl text-xs font-medium ring-1 ring-gray-400 focus:outline-main ms-10 bg-transparent"
        >
          <option value="">Category</option>
          {categories.map((cat) => {
            return (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <select
          onChange={(e) => filterChange("sort", e.target.value)}
          value={sort}
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-transparent ring-1 ring-gray-400 focus:outline-main w-[150px]"
        >
          <option value="">Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc updatedAt">Newest</option>
          <option value="desc updatedAt">Oldest</option>
        </select>
      </div>
    </div>
  );
}