import { useContext } from "react";
import Context from "./Context";
import type { ContextType } from "./Context";

export default function useControlContext(): ContextType {
  const context = useContext(Context);
  if (!context) throw new Error("useProvider must be used within a Provider");
  return context;
}
