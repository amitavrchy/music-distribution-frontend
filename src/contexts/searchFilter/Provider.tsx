import { useState } from "react";
import type { JSX, ReactNode } from "react";
import Context from "./Context";
import type { ContextType } from "./Context";

interface ProviderProps {
  children: ReactNode;
}

export default function Provider({ children }: ProviderProps): JSX.Element {
  const [searchText, setSearchText] = useState<string>("");
  const [releaseRange, setReleaseRange] = useState<
    | "last_7_days"
    | "last_30_days"
    | "last_6_months"
    | "last_1_year"
    | "this_year"
    | null
  >(null);
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");

  function resetFilters(): void {
    setSearchText("");
    setReleaseRange(null);
    setStatus("all");
  }

  const contextValue: ContextType = {
    data: {
      searchText,
      releaseRange,
      status,
    },

    functions: {
      setSearchText,
      setReleaseRange,
      setStatus,
      resetFilters,
    },
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
