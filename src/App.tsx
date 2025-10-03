import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Gallery } from "./components/Gallery";
import { About } from "./components/About";
import { UploadModal } from "./components/UploadModal";
import { LoginModal } from "./components/LoginModal";
import { ToastManager } from "./components/Toast";
import { AuthProvider } from "./providers/AuthProvider";
import { DataService } from "./services/DataService";
import { AuthService } from "./services/AuthService";
import { type PortfolioItemData } from "./models/PortfolioItemData";

export const authService = new AuthService();
export const dataService = new DataService();

export default function App() {
  const [items, setItems] = useState<PortfolioItemData[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [toasts, setToasts] = useState<
    Array<{ id: string; message: string; type: "success" | "error" | "info" }>
  >([]);

  const fetchPortfolioItems = async () => {
    const result = await dataService.fetchItems();
    setItems(result);
  };

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const addToast = (
    message: string,
    type: "success" | "error" | "info" = "success",
  ) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleUpload = async (newItem: Omit<PortfolioItemData, "id">) => {
    const result = await dataService.createPortfolioItem(newItem);
    if (result.success) {
      addToast("Item uploaded successfully!", "success");
      await fetchPortfolioItems();
    }
  };

  return (
    <AuthProvider authService={authService}>
      <div className="min-h-screen bg-background overflow-auto">
        <Header
          onUploadClick={() => setIsUploadModalOpen(true)}
          onLoginClick={() => setIsLoginModalOpen(true)}
          onLogout={() => addToast("Successfully logged out!", "success")}
        />

        <main>
          <Hero />
          <Gallery items={items} />
          <About />
        </main>

        <UploadModal
          open={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onSubmit={handleUpload}
        />

        <LoginModal
          open={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={() => addToast("Successfully logged in!", "success")}
        />

        <ToastManager toasts={toasts} removeToast={removeToast} />
      </div>
    </AuthProvider>
  );
}
