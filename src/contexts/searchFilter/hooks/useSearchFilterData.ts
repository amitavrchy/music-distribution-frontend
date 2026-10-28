import useSearchFilterContext from "../useSearchFilterContext";

export default function useSearchFilterData() {
  const { data } = useSearchFilterContext();
  return {
    searchText: data.searchText,
    releaseRange: data.releaseRange,
    status: data.status,
  };
}
