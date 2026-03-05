import { Skeleton } from "@/components/ui/skeleton";
import { PropertyGridSkeleton } from "@/components/property/property-grid";

export default function Loading() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <PropertyGridSkeleton />
      </main>
    </div>
  );
}
