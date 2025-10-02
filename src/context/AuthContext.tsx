import { createContext } from "react";
import type { User } from "../models/User";

export type AuthContextType = {
    isLoggedIn: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<User | null>;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);