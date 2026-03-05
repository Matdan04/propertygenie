"use client";

import { PropertyCard } from "./property-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Property } from "@/types/property";
import { SearchX } from "lucide-react";

export function PropertyGrid({
  properties,
  totalCount,
}: {
  properties: Property[];
  totalCount: number;
}) {
  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <SearchX className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-lg font-semibold text-foreground">No properties found</p>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Try adjusting your filters or search criteria to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-5 font-medium">
        Showing <span className="text-foreground font-semibold">{totalCount}</span>{" "}
        {totalCount === 1 ? "property" : "properties"}
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

export function PropertyGridSkeleton() {
  return (
    <div>
      <Skeleton className="h-4 w-40 mb-5" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/50 overflow-hidden bg-white">
            <Skeleton className="aspect-[4/3] w-full" />
            <div className="p-4 space-y-2.5">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-4 pt-1">
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-3 w-28 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
