import { useState } from "react";
import { Menu, X, Upload, LogIn } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Avatar } from "./Avatar";
import { useAppState } from "../hooks/useAppState";
import { UploadModal } from "./UploadModal";
import { LoginModal } from "./LoginModal";
import { AuthService } from "../services/AuthService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, NavLink } from "react-router";

const authService = AuthService.getInstance();

export function Header() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: async () => authService.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["session"] });
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });

  const { user, isAuthenticated } = useAuth();
  const { addToast } = useAppState();

  const handleLogout = async () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        addToast("Successfully logged out!", "success");
      },
      onError: () => {
        addToast("Failed to logout", "error");
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link className="tracking-tight cursor-pointer" to="/">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Gallery
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              About
            </NavLink>

            <div className="flex items-center space-x-2 ml-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="btn btn-primary btn-sm flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload
                  </button>
                  <div className="flex items-center gap-2">
                    <Avatar user={user} />
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline btn-sm"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="btn btn-outline btn-sm flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Gallery
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                About
              </NavLink>

              <div className="flex flex-col space-y-2 pt-2">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setIsUploadModalOpen(true)}
                      className="btn btn-primary btn-sm flex items-center gap-2 justify-start"
                    >
                      <Upload className="w-4 h-4" />
                      Upload
                    </button>
                    <div className="flex items-center gap-2">
                      <Avatar user={user} />
                      <button
                        onClick={handleLogout}
                        className="btn btn-outline btn-sm justify-start"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="btn btn-outline btn-sm flex items-center gap-2 justify-start"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </button>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
      <UploadModal
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
  );
}
