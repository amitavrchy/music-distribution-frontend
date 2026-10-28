import useControlContext from "../useControlContext";
import { SubmissionItem } from "@/redux/features/distribution/distribution.type";

export default function useControl() {
  const { data, functions } = useControlContext();

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
    data: {
      isOpen: data.isSubmissionsModalOpen,
      submissionData: data.submissionModalData,
      releaseId: data.releaseId,
    },
    functions: {
      openModal,
      closeModal,
      setData,
    },
  };
}
