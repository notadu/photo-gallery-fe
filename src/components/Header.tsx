import { useState } from "react";
import { Menu, X, Upload, LogIn } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Avatar } from "./Avatar";

interface HeaderProps {
  onUploadClick: () => void;
  onLoginClick: () => void;
  onLogout: () => void;
}

export function Header({ onUploadClick, onLoginClick, onLogout }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout, user } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1
            className="tracking-tight cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            Portfolio
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {isLoggedIn && (
              <>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="hover:text-primary transition-colors"
                >
                  Gallery
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:text-primary transition-colors"
                >
                  About
                </button>
              </>
            )}

            <div className="flex items-center space-x-2 ml-4">
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <button
                    onClick={onUploadClick}
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
                  onClick={onLoginClick}
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
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-left hover:text-primary transition-colors"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left hover:text-primary transition-colors"
              >
                About
              </button>

              <div className="flex flex-col space-y-2 pt-2">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={onUploadClick}
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
                    onClick={onLoginClick}
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
    </header>
  );
}
