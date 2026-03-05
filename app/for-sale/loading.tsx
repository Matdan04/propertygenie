import { Skeleton } from "@/components/ui/skeleton";
import { PropertyGridSkeleton } from "@/components/property/property-grid";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav skeleton */}
      <nav className="bg-white border-b border-border/60 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <Skeleton className="h-6 w-36" />
          </div>
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </nav>

      {/* Search header skeleton */}
      <header className="bg-white border-b border-border/40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
        </div>
      </header>

      {/* Content skeleton */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <PropertyGridSkeleton />
      </main>
    </div>
  );
}
