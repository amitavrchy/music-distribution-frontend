import useSearchFilterContext from "../useSearchFilterContext";

type ReleaseRange =
  | "last_7_days"
  | "last_30_days"
  | "last_6_months"
  | "last_1_year"
  | "this_year"
  | null;

type Status = "all" | "active" | "inactive";

interface SearchFilterDispatch {
  setSearchText: (searchText: string) => void;
  setReleaseRange: (range: ReleaseRange) => void;
  setStatus: (status: Status) => void;
  resetFilters: () => void;
}

export default function useSearchFilterDispatch(): SearchFilterDispatch {
  const { functions } = useSearchFilterContext();

  function setSearchText(searchText: string): void {
    functions.setSearchText(searchText);
  }

  function setReleaseRange(range: ReleaseRange): void {
    functions.setReleaseRange(range);
  }

  function setStatus(status: Status): void {
    functions.setStatus(status);
  }

  function resetFilters(): void {
    functions.resetFilters();
  }

  return {
    setSearchText,
    setReleaseRange,
    setStatus,
    resetFilters,
  };
}
