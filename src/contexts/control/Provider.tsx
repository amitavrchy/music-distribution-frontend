/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SubmissionItem } from "@/redux/features/distribution/distribution.type";
import type { JSX, ReactNode } from "react";
import Context from "./Context";
import type { ContextType } from "./Context";

interface ProviderProps {
  children: ReactNode;
}

export default function Provider({ children }: ProviderProps): JSX.Element {
  const [isSubmissionsModalOpen, setIsSubmissionsModalOpen] =
    useState<boolean>(false);
  const [releaseId, setReleaseId] = useState<string | null>(null);
  const [submissionModalData, setSubmissionData] = useState<
    SubmissionItem | Record<string, any>
  >({});

  const contextValue: ContextType = {
    data: { isSubmissionsModalOpen, submissionModalData, releaseId },
    functions: { setIsSubmissionsModalOpen, setSubmissionData, setReleaseId },
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
