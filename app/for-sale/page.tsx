import { Suspense } from "react";
import { searchProperties } from "@/lib/api";
import type { SearchFilters as SearchFiltersType, SortOption } from "@/types/property";
import { PropertyGrid, PropertyGridSkeleton } from "@/components/property/property-grid";
import { PropertyPagination } from "@/components/property/pagination";
import { SearchBar } from "@/components/property/search-bar";
import { SortSelect } from "@/components/property/sort-select";
import { SearchFilters } from "@/components/property/search-filters";

export const metadata = {
  title: "Properties For Sale | PropertyGenie",
  description: "Browse properties for sale in Malaysia",
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ForSalePage({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const sort = (params.sort as SortOption) || "newest";
  const name = typeof params.name === "string" ? params.name : undefined;
  const types = typeof params.types === "string" ? params.types.split(",").filter(Boolean) : undefined;
  const bedRooms = typeof params.bedRooms === "string" ? params.bedRooms.split(",").filter(Boolean) : undefined;
  const bathRooms = typeof params.bathRooms === "string" ? params.bathRooms.split(",").filter(Boolean) : undefined;
  const minPrice = typeof params.minPrice === "string" ? Number(params.minPrice) : undefined;
  const maxPrice = typeof params.maxPrice === "string" ? Number(params.maxPrice) : undefined;

  const filters: SearchFiltersType = {
    section: "for-sale",
    ...(name && { name }),
    ...(types && { types }),
    ...(bedRooms && { bedRooms }),
    ...(bathRooms && { bathRooms }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
  };

  const data = await searchProperties(filters, page, sort);

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
              <SortSelect />
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
                properties={data.items}
                totalCount={data._meta.totalCount}
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
