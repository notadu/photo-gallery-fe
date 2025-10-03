import { useState } from "react";
import { type PortfolioItemData } from "../models/PortfolioItemData";
import { PortfolioModal } from "./PortfolioModal";
import { PortfolioItem } from "./PortfolioItem";

export function Gallery({ items }: { items: PortfolioItemData[] }) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItemData | null>(
    null,
  );
  const [filter, setFilter] = useState<"all" | "city" | "nature">("all");

  const filteredItems = items.filter(
    (item) => filter === "all" || item.category === filter,
  );

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4">Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of moments captured through my lens and creations born
            from my hands.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            className={`btn rounded-full ${filter === "all" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`btn rounded-full ${filter === "city" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilter("city")}
          >
            Travel
          </button>
          <button
            className={`btn rounded-full ${filter === "nature" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilter("nature")}
          >
            Handmade
          </button>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <PortfolioItem
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <div className="w-8 h-8 rounded bg-muted-foreground/20" />
              </div>
              <h3 className="mb-2">No items found</h3>
              <p className="text-muted-foreground">
                {filter === "all"
                  ? "No portfolio items have been added yet."
                  : `No ${filter} items found. Try selecting a different category.`}
              </p>
            </div>
          </div>
        )}

        {/* Portfolio Modal */}
        <PortfolioModal
          item={selectedItem}
          open={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </section>
  );
}
