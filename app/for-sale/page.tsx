import { Suspense } from "react";
import type { ApiResponse, SearchFilters as SearchFiltersType, SortOption } from "@/types/property";
import { PropertyGrid, PropertyGridSkeleton } from "@/components/property/property-grid";
import { PropertyPagination } from "@/components/property/pagination";
import { SearchBar } from "@/components/property/search-bar";
import { SortSelect } from "@/components/property/sort-select";
import { SearchFilters } from "@/components/property/search-filters";
import { LocationSearch } from "@/components/property/location-search";
import { SavedSearches } from "@/components/property/saved-searches";

export const metadata = {
  title: "Properties For Sale | PropertyGenie",
  description: "Browse properties for sale in Malaysia",
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ForSalePage({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const sort = (params.sort as SortOption) || "-createdAt";
  const name = typeof params.name === "string" ? params.name : undefined;
  const types = typeof params.types === "string" ? params.types.split(",").filter(Boolean) : undefined;
  const bedRooms = typeof params.bedRooms === "string" ? params.bedRooms.split(",").filter(Boolean).map(Number) : undefined;
  const bathRooms = typeof params.bathRooms === "string" ? params.bathRooms.split(",").filter(Boolean).map(Number) : undefined;
  const minPrice = typeof params.minPrice === "string" ? Number(params.minPrice) : undefined;
  const maxPrice = typeof params.maxPrice === "string" ? Number(params.maxPrice) : undefined;

  const location = typeof params.location === "string" ? params.location : undefined;
  const locationType = typeof params.locationType === "string" ? params.locationType : undefined;

  const filters: SearchFiltersType = {
    section: "sale",
    ...(name && { name }),
    ...(types && { types }),
    ...(bedRooms && { bedRooms }),
    ...(bathRooms && { bathRooms }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
  };

  const queryParams = new URLSearchParams();
  queryParams.set("page", String(page));
  queryParams.set("sort", sort);

  const res = await fetch(`${BASE_URL}/api/properties?${queryParams}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch properties: ${res.status}`);
  }

  const data: ApiResponse = await res.json();

  let filteredItems = data.items;
  let filteredCount = data._meta.totalCount;

  if (location && locationType) {
    // Location titles from API are like "Klang, Selangor" — extract the name part
    const locationName = location.split(",")[0].trim().toLowerCase();
    filteredItems = data.items.filter((property) => {
      const type = locationType.toLowerCase();
      if (type === "city") {
        return property.city.toLowerCase().includes(locationName);
      }
      if (type === "state") {
        return property.state.toLowerCase().includes(locationName);
      }
      return true;
    });
    filteredCount = filteredItems.length;
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">Properties For Sale</h1>
          <div className="flex flex-wrap items-center gap-3">
            <Suspense>
              <SearchBar />
            </Suspense>
            <Suspense>
              <LocationSearch />
            </Suspense>
            <Suspense>
              <SortSelect />
            </Suspense>
            <Suspense>
              <SavedSearches />
            </Suspense>
            <Suspense>
              <div className="lg:hidden">
                <SearchFilters />
              </div>
            </Suspense>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <Suspense>
            <div className="hidden lg:block">
              <SearchFilters />
            </div>
          </Suspense>

          <div className="flex-1 min-w-0">
            <Suspense fallback={<PropertyGridSkeleton />}>
              <PropertyGrid
                properties={filteredItems}
                totalCount={filteredCount}
              />
            </Suspense>

            <Suspense>
              <PropertyPagination
                currentPage={data._meta.currentPage}
                pageCount={data._meta.pageCount}
              />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
