import type { PortfolioItemData } from "../models/PortfolioItemData";

export class DataService {
  public async createPortfolioItem({}: Pick<
    PortfolioItemData,
    "category" | "description" | "imageUrl" | "title" | "location"
  >) {
    return Promise.resolve({
      success: true,
    });
  }

  public async fetchItems(): Promise<PortfolioItemData[]> {
    return Promise.resolve([
      {
        id: "1",
        title: "Mountain Sunrise",
        description:
          "Captured this breathtaking sunrise during a hiking trip in the Swiss Alps. The golden light breaking through the morning mist created a magical atmosphere that I'll never forget.",
        imageUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        category: "nature",
        location: "Swiss Alps, Switzerland",
        date: "2024-08-15",
      },
      {
        id: "3",
        title: "Venice Canal at Dusk",
        description:
          "The romantic canals of Venice during golden hour. The interplay of light reflecting on the water and the historic architecture creates a timeless scene.",
        imageUrl:
          "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
        category: "city",
        location: "Venice, Italy",
        date: "2024-07-20",
      },

      {
        id: "5",
        title: "Lavender Fields",
        description:
          "Endless rows of lavender stretching to the horizon in Provence. The purple hues and sweet fragrance made this one of my most memorable photography sessions.",
        imageUrl:
          "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=800&q=80",
        category: "nature",
        location: "Provence, France",
        date: "2024-06-28",
      },
    ]);
  }
}
