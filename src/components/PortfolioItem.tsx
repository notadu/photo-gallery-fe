import { ImageWithFallback } from "./ImageWithFallback";
import { type PortfolioItemEntry } from "../models/PortfolioItemData";
import { useAuth } from "../hooks/useAuth";
import { Pencil, Trash2 } from "lucide-react";

interface PortfolioItemProps {
  item: PortfolioItemEntry;
  onClick: () => void;
  onEdit: (item: PortfolioItemEntry) => void;
  onDelete: (itemId: string) => void;
  preview?: boolean;
}

export function PortfolioItem({
  item,
  onClick,
  preview,
  onEdit,
  onDelete,
}: PortfolioItemProps) {
  const { isAuthenticated } = useAuth();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(item);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this item?")) {
      onDelete?.(item.id);
    }
  };

  return (
    <div
      className="card group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-t-xl">
        <ImageWithFallback
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-64 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`badge ${item.category === "city" ? "badge-default" : "badge-secondary"} capitalize`}
          >
            {item.category}
          </span>
        </div>

        {/* Admin Actions */}
        {isAuthenticated && !preview && (
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleEdit}
              className="p-2 bg-background/90 hover:bg-background rounded-lg shadow-lg transition-colors"
              title="Edit item"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 bg-destructive/90 hover:bg-destructive text-destructive-foreground rounded-lg shadow-lg transition-colors"
              title="Delete item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
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
