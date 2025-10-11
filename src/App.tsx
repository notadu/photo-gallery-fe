import { Header } from "./components/Header";
import { ToastManager } from "./components/Toast";
import { StateProvider } from "./providers/StateProvider";
import { useAuth } from "./hooks/useAuth";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { GalleryPage } from "./pages/GalleryPage";
import { AboutPage } from "./pages/AboutPage";

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Checking session...</div>; // TODO: add a skeleton
  }

  return (
    <BrowserRouter>
      <StateProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastManager />
        </div>
      </StateProvider>
    </BrowserRouter>
  );
}
