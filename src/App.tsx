import { Header } from "./components/Header";
import { ToastManager } from "./components/Toast";
import { Main } from "./components/Main";
import { StateProvider } from "./providers/StateProvider";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>checking session...</div>;
  }

  return (
    <StateProvider>
      <div className="min-h-screen bg-background overflow-auto">
        <Header />
        <Main />
        <ToastManager />
      </div>
    </StateProvider>
  );
}
