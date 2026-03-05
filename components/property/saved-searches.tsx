"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Bookmark, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useSavedSearches } from "@/hooks/use-saved-searches";

export function SavedSearches() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { searches, saveSearch, deleteSearch } = useSavedSearches();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  function handleSave() {
    if (!name.trim()) return;
    saveSearch(name.trim(), searchParams.toString());
    setName("");
  }

  function handleLoad(params: string) {
    router.push(`/for-sale?${params}`);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" title="Saved searches">
          <Bookmark className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Save Current Search</h4>
          <div className="flex gap-2">
            <Input
              placeholder="Search name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className="flex-1"
            />
            <Button onClick={handleSave} size="sm" disabled={!name.trim()}>
              Save
            </Button>
          </div>

          {searches.length > 0 && (
            <>
              <Separator />
              <h4 className="font-medium text-sm">Saved Searches</h4>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {searches.map((search) => (
                  <div
                    key={search.id}
                    className="flex items-center justify-between gap-2 rounded-md p-2 hover:bg-muted"
                  >
                    <button
                      onClick={() => handleLoad(search.params)}
                      className="text-sm text-left truncate flex-1"
                    >
                      {search.name}
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0"
                      onClick={() => deleteSearch(search.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
