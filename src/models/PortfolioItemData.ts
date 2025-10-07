export interface PortfolioItemEntry {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: "city" | "nature";
  date?: string;
  location?: string;
}

export type PortfolioItemData = Omit<
  PortfolioItemEntry,
  "imageUrl" | "date" | "id"
> & { file: File };
