import { useCallback, useEffect, useState } from "react";
import { type PortfolioItemEntry } from "../models/PortfolioItemData";
import { PortfolioModal } from "../components/PortfolioModal";
import { PortfolioItem } from "../components/PortfolioItem";
import { useAppState } from "../hooks/useAppState";
import { DataService } from "../services/DataService";
import { useQuery } from "@tanstack/react-query";

const dataService = DataService.getInstance();

export const Gallery = ({ preview }: { preview?: boolean }) => {
  const [filter, setFilter] = useState<"all" | "city" | "nature">("all");
  const selectFilteredData = useCallback(
    (data: PortfolioItemEntry[]) => {
      if (filter === "all") {
        return data;
      }
      return data.filter((item) => item.category === filter);
    },
    [filter],
  );
  const { data, error, isSuccess, isError, isLoading } = useQuery<
    PortfolioItemEntry[]
  >({
    queryKey: ["gallery", preview],
    queryFn: () => dataService.fetchItems(preview),
    select: selectFilteredData,
  });
  const { addToast } = useAppState();
  const [selectedItem, setSelectedItem] = useState<PortfolioItemEntry | null>(
    null,
  );
  useEffect(() => {
    if (isError) {
      addToast((error as { message: string; stack: string }).message, "error");
    }
  }, [isError, error]);

  return (
    <>
      {/* Filter Buttons */}
      {!preview && (
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
            City
          </button>
          <button
            className={`btn rounded-full ${filter === "nature" ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilter("nature")}
          >
            Nature
          </button>
        </div>
      )}

      {/* Gallery Grid */}
      {Boolean(isSuccess && data?.length) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((item) => (
            <PortfolioItem
              key={item.id}
              item={item}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      )}
      {isLoading && <div>Loading...</div>}
      {!data?.length && !isLoading && (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <div className="w-8 h-8 rounded bg-muted-foreground/20" />
            </div>
            <h3 className="mb-2">No items found</h3>
            <p className="text-muted-foreground">
              No portfolio items have been added yet.
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
    </>
  );
};
