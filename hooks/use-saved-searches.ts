"use client";

import { useState, useEffect } from "react";

export interface SavedSearch {
  id: string;
  name: string;
  params: string;
  createdAt: string;
}

const STORAGE_KEY = "propertygenie-saved-searches";

export function useSavedSearches() {
  const [searches, setSearches] = useState<SavedSearch[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSearches(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  function persist(updated: SavedSearch[]) {
    setSearches(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function saveSearch(name: string, params: string) {
    const newSearch: SavedSearch = {
      id: crypto.randomUUID(),
      name,
      params,
      createdAt: new Date().toISOString(),
    };
    persist([newSearch, ...searches]);
  }

  function deleteSearch(id: string) {
    persist(searches.filter((s) => s.id !== id));
  }

  return { searches, saveSearch, deleteSearch };
}
