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

  const initUser = async () => {
    const result = await authService.getUserInfo();
    if (result) {
      setUser(result);
      await authService.getIdToken();
    }
  };

  useEffect(() => {
    initUser();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const result = await authService.login(username, password);
      if (result) {
        setUser(result);
        return result;
      }
      return null;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
