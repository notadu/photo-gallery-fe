import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { About } from "./About";
import { Gallery } from "./Gallery";
import { Hero } from "./Hero";
import type { DataService } from "../services/DataService";
import type { PortfolioItemData } from "../models/PortfolioItemData";

export const Main = ({ dataService }: { dataService: DataService }) => {
  const { isLoggedIn } = useAuth();
  const [items, setItems] = useState<PortfolioItemData[]>([]);
  const fetchPortfolioItems = async () => {
    const result = await dataService.fetchItems();
    setItems(result);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchPortfolioItems();
    }
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <main>
      <Hero />
      <Gallery items={items} />
      <About />
    </main>
  ) : (
    <div>Please login</div>
  );
};
