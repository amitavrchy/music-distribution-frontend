import useControlContext from "../useControlContext";
import { SubmissionItem } from "@/redux/features/distribution/distribution.type";

interface ControlDispatch {
  openModal: (releaseId: string) => void;
  closeModal: () => void;
  setData: (submissionData: SubmissionItem | Record<string, unknown>) => void;
}

export default function useControlDispatch(): ControlDispatch {
  const { functions } = useControlContext();

  function openModal(releaseId: string): void {
    functions.setReleaseId(releaseId);
    functions.setIsSubmissionsModalOpen(true);
  }

  function closeModal(): void {
    functions.setIsSubmissionsModalOpen(false);
    functions.setSubmissionData({});
    functions.setReleaseId(null);
  }

  function setData(
    submissionData: SubmissionItem | Record<string, unknown>,
  ): void {
    functions.setSubmissionData(submissionData);
  }

  return {
    openModal,
    closeModal,
    setData,
  };
}
