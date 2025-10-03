import { useState } from "react";
import { Header } from "./components/Header";
import { UploadModal } from "./components/UploadModal";
import { LoginModal } from "./components/LoginModal";
import { ToastManager } from "./components/Toast";
import { AuthProvider } from "./providers/AuthProvider";
import { DataService } from "./services/DataService";
import { AuthService } from "./services/AuthService";
import { Main } from "./components/Main";

export const authService = new AuthService();
export const dataService = new DataService(authService);

export default function App() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [toasts, setToasts] = useState<
    Array<{ id: string; message: string; type: "success" | "error" | "info" }>
  >([]);

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

  const handleUpload = async () => {
    setIsUploadModalOpen(false);
    addToast("Item uploaded successfully!", "success");
  };

  return (
    <AuthProvider authService={authService}>
      <div className="min-h-screen bg-background overflow-auto">
        <Header
          onUploadClick={() => setIsUploadModalOpen(true)}
          onLoginClick={() => setIsLoginModalOpen(true)}
          onLogout={() => addToast("Successfully logged out!", "success")}
        />

        <Main dataService={dataService} />

        <UploadModal
          dataService={dataService}
          open={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onSuccess={handleUpload}
          onError={(error) =>
            addToast(error ?? "Fail to create portfolio item")
          }
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
