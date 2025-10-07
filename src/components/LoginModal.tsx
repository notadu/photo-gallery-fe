import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { createPortal } from "react-dom";
import { useAppState } from "../hooks/useAppState";
import { AuthService } from "../services/AuthService";
import { useMutation, useQueryClient } from "react-query";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const authService = AuthService.getInstance();

export function LoginModal({ open, onClose }: LoginModalProps) {
  const queryClient = useQueryClient();
  const loginMutation = useMutation(
    (params: { username: string; password: string }) =>
      authService.login(params.username, params.password),
  );
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { addToast } = useAppState();

  const resetForm = () => {
    setFormData({ username: "", password: "" });
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loginMutation.isLoading) {
        resetForm();
        onClose();
        loginMutation.reset();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose, loginMutation.isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      {
        username: formData.username,
        password: formData.password,
      },
      {
        onSuccess: () => {
          addToast("Successfully logged in!", "success");
          resetForm();
          onClose();
          loginMutation.reset();
          queryClient.invalidateQueries({ queryKey: ["session"] });
          queryClient.invalidateQueries({ queryKey: ["user"] });
        },
      },
    );
  };

  const handleClose = () => {
    if (!loginMutation.isLoading) {
      resetForm();
      onClose();
      loginMutation.reset();
    }
  };

  if (!open) return null;

  return createPortal(
    <div className="dialog-overlay" onClick={handleClose}>
      <div
        className="dialog-content max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog-header">
          <h2 className="dialog-title">Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {loginMutation.isError && (
            <div className="alert alert-destructive">
              <AlertCircle className="w-4 h-4" />
              <div>{(loginMutation.error as { message: string }).message}</div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block">
              Username
            </label>
            <input
              id="email"
              className="input"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              placeholder="Enter your username..."
              required
              disabled={loginMutation.isLoading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="Enter your password..."
              required
              disabled={loginMutation.isLoading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={
              loginMutation.isLoading ||
              !formData.username ||
              !formData.password
            }
          >
            {loginMutation.isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>,
    document.getElementById("overlay")!,
  );
}
