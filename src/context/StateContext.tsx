import { createContext } from "react";
import type { ToastItem, ToastSeverity } from "../models/Toast";

export type StateContextProps = {
  toasts: ToastItem[];
  addToast: (message: string, type?: ToastSeverity) => void;
  removeToast: (id: string) => void;
};

export const StateContext = createContext<StateContextProps | undefined>(
  undefined,
);
