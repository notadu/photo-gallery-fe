export interface PortfolioItemData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: "city" | "nature";
  date?: string;
  location?: string;
}
