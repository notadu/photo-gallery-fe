import { ImageWithFallback } from "./ImageWithFallback";
import { type PortfolioItemEntry } from "../models/PortfolioItemData";

interface PortfolioItemProps {
  item: PortfolioItemEntry;
  onClick: () => void;
}

export function PortfolioItem({ item, onClick }: PortfolioItemProps) {
  return (
    <div
      className="card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-t-xl">
        <ImageWithFallback
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`badge ${item.category === "city" ? "badge-default" : "badge-secondary"} capitalize`}
          >
            {item.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="mb-2">{item.title}</h3>
        <p className="text-muted-foreground mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          {item.location && <span>{item.location}</span>}
          {item.date && <span>{new Date(item.date).toLocaleDateString()}</span>}
        </div>
      </div>
    </div>
  );
}
