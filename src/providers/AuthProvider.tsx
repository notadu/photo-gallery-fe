import { useEffect, useState, type PropsWithChildren } from "react";
import { AuthContext } from "../context/AuthContext";
import { type User } from "../models/User";
import type { AuthService } from "../services/AuthService";

interface AuthProviderProps {
  authService: AuthService;
}

export const AuthProvider = ({
  children,
  authService,
}: PropsWithChildren<AuthProviderProps>) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const init = async () => {
    const token = await authService.getIdToken();
    setIsLoggedIn(Boolean(token));
    const userInfo = await authService.getUserInfo();
    setUser(userInfo);
  };

  useEffect(() => {
    init();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const result = await authService.login(username, password);
      if (result.success) {
        init();
      }
      return {
        success: result.success,
      };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        errorMessage: "Login failed:",
        error,
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
