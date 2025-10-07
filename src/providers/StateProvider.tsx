import { useReducer, type PropsWithChildren } from "react";
import { StateContext } from "../context/StateContext";
import type { ToastSeverity } from "../models/Toast";
import type { InitialState } from "../models/State";
import { reducer } from "../reducers/appReducer";

const initialState: InitialState = {
  toasts: [],
};

export const StateProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToast = (message: string, type: ToastSeverity = "success") => {
    const id = Date.now().toString();
    dispatch({ type: "ADD_TOAST", payload: { id, message, type } });
  };

  const removeToast = (id: string) => {
    dispatch({ type: "REMOVE_TOAST", payload: id });
  };

  return (
    <StateContext.Provider
      value={{
        toasts: state.toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
