import type { InitialState } from "../models/State";

type Action = "ADD_TOAST" | "REMOVE_TOAST" | "SET_ITEMS";

export const reducer = (
  state: InitialState,
  action: { type: Action; payload?: any },
): InitialState => {
  switch (action.type) {
    case "ADD_TOAST":
      return { ...state, toasts: [...state.toasts, action.payload] };
    case "REMOVE_TOAST":
      const newToasts = state.toasts.filter(
        (toast) => toast.id !== action.payload,
      );
      return {
        ...state,
        toasts: newToasts,
      };
    default:
      return state;
  }
};
