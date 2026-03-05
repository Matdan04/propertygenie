import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Property } from "@/types/property";
import { BedDouble, Bath, Maximize, User } from "lucide-react";

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
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50 bg-white">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <Badge className="absolute top-3 left-3 bg-white/90 text-foreground backdrop-blur-sm border-0 shadow-sm font-medium">
          {capitalizeType(property.type)}
        </Badge>
        <div className="absolute bottom-3 left-3">
          <p className="text-lg font-bold text-white drop-shadow-md">
            {formatPrice(property.price, property.section)}
          </p>
        </div>
      </div>
      <CardContent className="p-4 space-y-2.5">
        <h3 className="font-semibold text-[15px] line-clamp-1 text-foreground">
          {property.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {property.address}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1">
          {property.bedRooms > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 text-primary/70" />
              <span className="font-medium text-foreground">{property.bedRooms}</span>
            </span>
          )}
          {property.bathRooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-primary/70" />
              <span className="font-medium text-foreground">{property.bathRooms}</span>
            </span>
          )}
          {property.floorSize && (
            <span className="flex items-center gap-1.5">
              <Maximize className="h-4 w-4 text-primary/70" />
              <span className="font-medium text-foreground">
                {parseFloat(property.floorSize).toLocaleString()}
              </span>
              <span className="text-xs">sqft</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 pt-1 border-t border-border/40">
          <User className="h-3.5 w-3.5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground truncate">
            {property.account.name}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
