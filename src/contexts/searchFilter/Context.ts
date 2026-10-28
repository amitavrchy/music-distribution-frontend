import { createContext } from "react";
export interface ContextType {
  data: {
    searchText: string;
    releaseRange:
      | "last_7_days"
      | "last_30_days"
      | "last_6_months"
      | "last_1_year"
      | "this_year"
      | null;

    status: "all" | "active" | "inactive";
  };

  functions: {
    setSearchText: (value: string) => void;
    setReleaseRange: (
      value:
        | "last_7_days"
        | "last_30_days"
        | "last_6_months"
        | "last_1_year"
        | "this_year"
        | null,
    ) => void;
    setStatus: (value: "all" | "active" | "inactive") => void;

    resetFilters: () => void;
  };
}
const Context = createContext<ContextType | null>(null);
export default Context;
