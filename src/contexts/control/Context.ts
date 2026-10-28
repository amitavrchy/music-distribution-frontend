/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { SubmissionItem } from "@/redux/features/distribution/distribution.type";
export interface ContextType {
  data: {
    isSubmissionsModalOpen: boolean;
    submissionModalData: SubmissionItem | Record<string, any>;
    releaseId: string | null;
  };
  functions: {
    setIsSubmissionsModalOpen: (value: boolean) => void;
    setSubmissionData: (data: SubmissionItem | Record<string, any>) => void;
    setReleaseId: (value: string | null) => void;
  };
}
const Context = createContext<ContextType | null>(null);
export default Context;
