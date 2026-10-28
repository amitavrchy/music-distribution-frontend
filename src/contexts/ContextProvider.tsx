import type { ReactNode, JSX } from "react";
import ControlProvider from "./control/Provider";
import SearchFilterProvider from "./searchFilter/Provider";

interface ProviderProps {
  children: ReactNode;
}

export default function ContextProvider({
  children,
}: ProviderProps): JSX.Element {
  return (
    <ControlProvider>
      <SearchFilterProvider>{children}</SearchFilterProvider>
    </ControlProvider>
  );
}
