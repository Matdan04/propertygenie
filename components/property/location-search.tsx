"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { LocationResult } from "@/types/property";

export function LocationSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const selectedLocation = searchParams.get("location");
  const selectedType = searchParams.get("locationType");

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/locations?keyword=${encodeURIComponent(query.trim())}`
        );
        if (res.ok) {
          const data: LocationResult[] = await res.json();
          setResults(data);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  function handleSelect(location: LocationResult) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("location", location.title);
    params.set("locationType", location.type);
    params.delete("page");
    router.push(`/for-sale?${params.toString()}`);
    setOpen(false);
    setQuery("");
    setResults([]);
  }

  function handleClear() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("location");
    params.delete("locationType");
    params.delete("page");
    router.push(`/for-sale?${params.toString()}`);
  }

  const cities = results.filter((r) => r.type.toLowerCase() === "city");
  const states = results.filter((r) => r.type.toLowerCase() === "state");

  if (selectedLocation) {
    return (
      <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 text-sm bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15">
        <MapPin className="h-3 w-3" />
        {selectedLocation}
        <button
          onClick={handleClear}
          className="ml-1 hover:text-primary/80 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      </Badge>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 bg-white">
          <MapPin className="h-4 w-4 text-primary/70" />
          Location
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search city or state..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {loading && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Searching...
              </div>
            )}
            {!loading && query.trim() && results.length === 0 && (
              <CommandEmpty>No locations found.</CommandEmpty>
            )}
            {cities.length > 0 && (
              <CommandGroup heading="Cities">
                {cities.map((loc) => (
                  <CommandItem
                    key={`city-${loc.slug}`}
                    value={loc.slug}
                    onSelect={() => handleSelect(loc)}
                  >
                    <MapPin className="h-4 w-4 mr-2 text-primary/60" />
                    {loc.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {states.length > 0 && (
              <CommandGroup heading="States">
                {states.map((loc) => (
                  <CommandItem
                    key={`state-${loc.slug}`}
                    value={loc.slug}
                    onSelect={() => handleSelect(loc)}
                  >
                    <MapPin className="h-4 w-4 mr-2 text-primary/60" />
                    {loc.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
