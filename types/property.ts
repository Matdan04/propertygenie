export interface PropertyAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  slug: string;
}

export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface Property {
  id: string;
  name: string;
  slug: string;
  type: string;
  category: string;
  section: string;
  image: string;
  bedRooms: number;
  bathRooms: number;
  floorSize: string;
  landSize: string | null;
  address: string;
  price: number;
  account: PropertyAccount;
  country: string;
  state: string;
  city: string;
  postcode: string;
  furnishings: string;
  coordinates: Coordinates;
  createdAt: string;
}

export interface SearchFilters {
  section?: string;
  name?: string;
  categories?: string[];
  types?: string[];
  bedRooms?: number[];
  bathRooms?: number[];
  minPrice?: number;
  maxPrice?: number;
  furnishings?: string[];
}

export type SortOption =
  | "price"
  | "-price"
  | "createdAt"
  | "-createdAt";

export interface ApiMeta {
  totalCount: number;
  pageCount: number;
  currentPage: number;
  perPage: number;
}

export interface ApiLink {
  href: string;
  method: string;
  path: string;
}

export interface ApiResponse {
  items: Property[];
  _links: {
    self: ApiLink;
    first: ApiLink;
    last: ApiLink;
  };
  _meta: ApiMeta;
}

export interface LocationResult {
  type: string;
  title: string;
  slug: string;
}
