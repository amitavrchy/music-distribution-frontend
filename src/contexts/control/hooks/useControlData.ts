import useControlContext from "../useControlContext";

export default function useControlData() {
  const { data } = useControlContext();

  return {
    isOpen: data.isSubmissionsModalOpen,
    submissionData: data.submissionModalData,
    releaseId: data.releaseId,
  };
}
