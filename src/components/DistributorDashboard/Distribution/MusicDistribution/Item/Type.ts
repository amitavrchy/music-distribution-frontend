export default interface SubmissionItemType {
  artist: string;
  genre: string | null;
  language: string | null;
  releaseDate: string;
  releaseId: string;
  status: "Approved" | "Pending Review" | "Failed";
  submittedAt: string;
  title: string;
  trackCount: number;
  type: string;
}
