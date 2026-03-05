# PropertyGenie

A property search and discovery platform for the Malaysian real estate market. Browse, filter, and save property searches with a clean, responsive interface.

## Features

- **Property Search** - Search properties by name with instant results
- **Location Filtering** - Filter by city or state with autocomplete suggestions
- **Advanced Filters** - Filter by property type, price range, bedrooms, and bathrooms
- **Sorting** - Sort results by price or listing date
- **Saved Searches** - Save and load your search criteria (stored in localStorage)
- **Pagination** - Navigate through paginated property listings
- **Responsive Design** - Fully responsive layout with mobile filter sheet and desktop sidebar

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com)
- **Icons**: [Lucide React](https://lucide.dev)

## Project Structure

```
app/
  layout.tsx              # Root layout with fonts and metadata
  page.tsx                # Redirects to /for-sale
  globals.css             # Theme variables and Tailwind config
  for-sale/
    page.tsx              # Main property listing page (Server Component)
    loading.tsx           # Loading skeleton UI
    error.tsx             # Error boundary
  api/
    properties/route.ts   # Proxy to PropertyGenie properties API
    locations/route.ts    # Proxy to PropertyGenie locations API
components/
  property/
    property-card.tsx     # Individual property card
    property-grid.tsx     # Property grid layout + skeleton
    search-bar.tsx        # Name search input
    search-filters.tsx    # Sidebar/sheet filters (type, price, beds, baths)
    location-search.tsx   # Location autocomplete popover
    sort-select.tsx       # Sort dropdown
    saved-searches.tsx    # Save/load search criteria
    pagination.tsx        # Page navigation
  ui/                     # shadcn/ui primitives
hooks/
  use-saved-searches.ts   # localStorage hook for saved searches
types/
  property.ts             # TypeScript interfaces for Property, API responses, etc.
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
API_BASE=https://agents.propertygenie.com.my/api
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## API Endpoints

The app proxies requests through Next.js API routes:

| Route | Method | Description |
|---|---|---|
| `/api/properties?page=1&sort=-createdAt` | POST | Search properties with filters in request body |
| `/api/locations?keyword=kuala` | GET | Search locations by keyword |

### Search Filters (POST body for `/api/properties`)

```json
{
  "section": "sale",
  "name": "optional search term",
  "types": ["condo", "apartment"],
  "bedRooms": [2, 3],
  "bathRooms": [1, 2],
  "minPrice": 100000,
  "maxPrice": 500000
}
```

## Deployment

Deploy on [Vercel](https://vercel.com) for the best experience with Next.js:

```bash
npx vercel
```

Or build and deploy to any Node.js hosting provider that supports Next.js.
