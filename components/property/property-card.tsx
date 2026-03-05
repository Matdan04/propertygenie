import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Property } from "@/types/property";
import { BedDouble, Bath, Maximize } from "lucide-react";

function formatPrice(price: number, section: string): string {
  const formatted = new Intl.NumberFormat("en-MY").format(price);
  if (section === "rent") {
    return `RM ${formatted}/mo`;
  }
  return `RM ${formatted}`;
}

function capitalizeType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3]">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <Badge className="absolute top-3 left-3" variant="secondary">
          {capitalizeType(property.type)}
        </Badge>
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base line-clamp-1">{property.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1">{property.address}</p>
        <p className="text-lg font-bold text-primary">
          {formatPrice(property.price, property.section)}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {property.bedRooms > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble className="h-4 w-4" />
              {property.bedRooms}
            </span>
          )}
          {property.bathRooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              {property.bathRooms}
            </span>
          )}
          {property.floorSize && (
            <span className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              {parseFloat(property.floorSize).toLocaleString()} sqft
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground pt-1">
          {property.account.name}
        </p>
      </CardContent>
    </Card>
  );
}
