import { useContext } from "react";
import { StateContext } from "../context/StateContext";

export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useAppState must be used within an ItemsProvider");
  }
  return context;
};
