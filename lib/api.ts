import type { ApiResponse, LocationResult, SearchFilters, SortOption } from "@/types/property";

const API_BASE = "https://agents.propertygenie.com.my/api";

export async function searchProperties(
  filters: SearchFilters = {},
  page: number = 1,
  sort?: SortOption
): Promise<ApiResponse> {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (sort) params.set("sort", sort);

  const res = await fetch(`${API_BASE}/properties-mock?${params}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch properties: ${res.status}`);
  }

  return res.json();
}

export async function searchLocations(keyword: string): Promise<LocationResult[]> {
  const params = new URLSearchParams({ keyword });
  const res = await fetch(`${API_BASE}/locations-mock?${params}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch locations: ${res.status}`);
  }

  return res.json();
}
