import { useState, type ReactNode } from "react";
import { AuthService } from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import { type User } from "../models/User";

const authService = new AuthService();

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

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
    authService
      .logout()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
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
