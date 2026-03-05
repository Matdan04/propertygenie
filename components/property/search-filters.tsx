"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

const PROPERTY_TYPES = [
  "apartment",
  "condo",
  "flat",
  "room",
  "terrace",
  "semi-detached",
  "bungalow",
  "penthouse",
  "townhouse",
  "villa",
  "shophouse",
  "studio",
];

const BEDROOMS = ["0", "1", "2", "3", "4", "5"];
const BATHROOMS = ["1", "2", "3", "4", "5"];

function FilterContent({
  selectedTypes,
  setSelectedTypes,
  selectedBedrooms,
  setSelectedBedrooms,
  selectedBathrooms,
  setSelectedBathrooms,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onApply,
  onReset,
}: {
  selectedTypes: string[];
  setSelectedTypes: (v: string[]) => void;
  selectedBedrooms: string[];
  setSelectedBedrooms: (v: string[]) => void;
  selectedBathrooms: string[];
  setSelectedBathrooms: (v: string[]) => void;
  minPrice: string;
  setMinPrice: (v: string) => void;
  maxPrice: string;
  setMaxPrice: (v: string) => void;
  onApply: () => void;
  onReset: () => void;
}) {
  function toggleItem(list: string[], item: string, setter: (v: string[]) => void) {
    setter(
      list.includes(item)
        ? list.filter((i) => i !== item)
        : [...list, item]
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">Property Type</h4>
        <div className="space-y-2">
          {PROPERTY_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => toggleItem(selectedTypes, type, setSelectedTypes)}
              />
              <span className="text-sm capitalize">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-medium mb-3">Bedrooms</h4>
        <div className="flex flex-wrap gap-2">
          {BEDROOMS.map((bed) => (
            <Button
              key={bed}
              variant={selectedBedrooms.includes(bed) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleItem(selectedBedrooms, bed, setSelectedBedrooms)}
            >
              {bed}+
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-medium mb-3">Bathrooms</h4>
        <div className="flex flex-wrap gap-2">
          {BATHROOMS.map((bath) => (
            <Button
              key={bath}
              variant={selectedBathrooms.includes(bath) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleItem(selectedBathrooms, bath, setSelectedBathrooms)}
            >
              {bath}+
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex gap-2">
        <Button onClick={onApply} className="flex-1">
          Apply Filters
        </Button>
        <Button onClick={onReset} variant="outline" className="flex-1">
          Reset
        </Button>
      </div>
    </div>
  );
}

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    searchParams.get("types")?.split(",").filter(Boolean) || []
  );
  const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>(
    searchParams.get("bedRooms")?.split(",").filter(Boolean) || []
  );
  const [selectedBathrooms, setSelectedBathrooms] = useState<string[]>(
    searchParams.get("bathRooms")?.split(",").filter(Boolean) || []
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [open, setOpen] = useState(false);

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedTypes.length > 0) {
      params.set("types", selectedTypes.join(","));
    } else {
      params.delete("types");
    }

    if (selectedBedrooms.length > 0) {
      params.set("bedRooms", selectedBedrooms.join(","));
    } else {
      params.delete("bedRooms");
    }

    if (selectedBathrooms.length > 0) {
      params.set("bathRooms", selectedBathrooms.join(","));
    } else {
      params.delete("bathRooms");
    }

    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    params.delete("page");
    router.push(`/for-sale?${params.toString()}`);
    setOpen(false);
  }

  function resetFilters() {
    setSelectedTypes([]);
    setSelectedBedrooms([]);
    setSelectedBathrooms([]);
    setMinPrice("");
    setMaxPrice("");
    const params = new URLSearchParams();
    const sort = searchParams.get("sort");
    if (sort) params.set("sort", sort);
    router.push(`/for-sale?${params.toString()}`);
    setOpen(false);
  }

  const activeFilterCount =
    selectedTypes.length +
    (minPrice || maxPrice ? 1 : 0) +
    selectedBedrooms.length +
    selectedBathrooms.length;

  const filterProps = {
    selectedTypes,
    setSelectedTypes,
    selectedBedrooms,
    setSelectedBedrooms,
    selectedBathrooms,
    setSelectedBathrooms,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    onApply: applyFilters,
    onReset: resetFilters,
  };

  return (
    <>
      {/* Mobile: Sheet trigger */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 rounded-full bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <FilterContent {...filterProps} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-4 space-y-4">
          <h3 className="font-semibold text-lg">Filters</h3>
          <FilterContent {...filterProps} />
        </div>
      </aside>
    </>
  );
}
