"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/lib/data";

export function ServiceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = searchParams ?? new URLSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(currentParams.get("q") ?? "");
  const [category, setCategory] = useState(currentParams.get("category") ?? "");

  const placeholder = useMemo(() => "Search laundry, tiffin, plumber...", []);

  function applyFilters() {
    const params = new URLSearchParams(currentParams.toString());

    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }

    if (category.trim()) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    startTransition(() => {
      const queryString = params.toString();
      router.push(queryString ? `/services?${queryString}` : "/services");
    });
  }

  function clearFilters() {
    setQuery("");
    setCategory("");
    startTransition(() => router.push("/services"));
  }

  return (
    <section className="filter-shell" aria-label="Service filters">
      <div className="filter-grid">
        <label className="field-group">
          <span className="field-label">Search</span>
          <input
            className="field"
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                applyFilters();
              }
            }}
          />
        </label>
        <label className="field-group">
          <span className="field-label">Category</span>
          <select
            className="field"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="filter-actions">
        <button
          className="button primary"
          type="button"
          onClick={applyFilters}
          disabled={isPending}
        >
          {isPending ? "Filtering..." : "Apply filters"}
        </button>
        <button
          className="button secondary"
          type="button"
          onClick={clearFilters}
          disabled={isPending}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
