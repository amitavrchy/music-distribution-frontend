/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { toast } from "sonner";
import {
  ReleaseData,
  TrackData,
  SplitSheetData,
  Territory,
  SplitContributor,
} from "./data";
import {
  useCreateNewReleaseMutation,
  useCreateTrackMutation,
  useCreateSplitSheetMutation,
  useUploadTrackAudioMutation,
  useCreateBackCatalogueMutation,
} from "@/redux/features/newRelease/newReleaseApi";
// import { v4 as uuidv4 } from "uuid";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  // 1. Release Data (POST /releases)
  const [releaseData, setReleaseData] = useState<ReleaseData>({
    releaseDate: "",
    preOrderDate: "",
    releaseTitle: "",
    producerCredits: "",
    lyricistCredits: "",
    masterSplits: "",
    copyrightHolder: "",
    labelName: "",
    albumLevelArtistName: "",
    musicFileLink: "",
    typeOfRelease: "Single",
    genre: "",
    language: "English",
    isExplicitContent: false,
    hasExternalRightsHolder: false,
    hasDolbyAtmosVersion: false,
    hasExtendedMixForDjStores: false,
    additionalDetails: "",
    hasArtistOnSpotify: false,
    hasMusicVideo: false,
    artists: [
      {
        name: "",
        email: "",
        phone: "",
        address: "",
        stageName: "",
        role: "Primary Artist",
      },
    ],
    territories: [{ territory: "WW" }],
    status: "Draft",
    artwork: null,
    distributor: "",
    upc: "",
    catalogueNumber: "",
    releasePLine: "",
    releaseCLine: "",
  });

  // 2. Track Data (POST /tracks)
  const [trackData, setTrackData] = useState<TrackData>({
    releaseId: "",
    trackNumber: 1,
    trackTitle: "",
    trackGenre: "",
    trackMix: "Original Mix",
    explicitContent: false,
    trackLanguage: "English",
    trackPublisher: "",
    originalReleaseDate: "",
    trackIsrc: "",
    territoryRestrictions: "None",
    audioFileUrl: "",
    trackArtists: [],
  });

  // 3. Split Sheet Data (POST /split-sheets)
  const [splitSheetData, setSplitSheetData] = useState<SplitSheetData>({
    releaseId: "",
    songTitle: "",
    isrc: "",
    releaseDate: "",
    // recordLabelId: uuidv4(),
    contributors: [],
  });

  // API Mutations
  const [createRelease, { isLoading: isReleaseLoading }] =
    useCreateNewReleaseMutation();
  const [createTrack, { isLoading: isTrackLoading }] = useCreateTrackMutation();
  const [uploadAudio, { isLoading: isAudioLoading }] =
    useUploadTrackAudioMutation();
  const [createSplitSheet, { isLoading: isSplitLoading }] =
    useCreateSplitSheetMutation();
  const [createBackCatalogue, { isLoading: isBackCatalogueLoading }] =
    useCreateBackCatalogueMutation();

  const isSubmitting =
    isReleaseLoading ||
    isTrackLoading ||
    isAudioLoading ||
    isSplitLoading ||
    isBackCatalogueLoading;

  // Handlers
  const handleReleaseChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { name, value, type } = e.target as HTMLInputElement;
      const files = (e.target as HTMLInputElement).files;

      if (files && files.length > 0) {
        setReleaseData((prev) => ({ ...prev, [name]: files[0] }));
      } else if (type === "radio") {
        const booleanValue = value === "true";
        setReleaseData((prev) => ({ ...prev, [name]: booleanValue }));
      } else {
        setReleaseData((prev) => ({ ...prev, [name]: value }));
      }
    },
    [],
  );

  const handleArtistChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setReleaseData((prev) => {
        const updatedArtists = [...prev.artists];
        updatedArtists[0] = { ...updatedArtists[0], [name]: value };
        return { ...prev, artists: updatedArtists };
      });
    },
    [],
  );

  const handleTrackChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { name, value, type } = e.target as HTMLInputElement;
      const files = (e.target as HTMLInputElement).files;

      if (files && files.length > 0) {
        setTrackData((prev) => ({ ...prev, [name]: files[0] }));
      } else if (type === "radio") {
        const booleanValue = value === "true";
        setTrackData((prev) => ({ ...prev, [name]: booleanValue }));
      } else {
        setTrackData((prev) => ({ ...prev, [name]: value }));
      }
    },
    [],
  );

  const handleTerritoryChange = useCallback((territories: Territory[]) => {
    setReleaseData((prev) => ({ ...prev, territories }));
  }, []);

  const handleSplitChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { name, value } = e.target;
      setSplitSheetData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleContributorsChange = useCallback(
    (contributors: SplitContributor[]) => {
      setSplitSheetData((prev) => ({ ...prev, contributors }));
    },
    [],
  );

  // Navigation
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Create Release
      toast.loading("Creating release...", { id: "submit-form" });

      const { artwork, ...releaseMetadata } = releaseData;
      const releasePayload = {
        ...releaseMetadata,
        releaseDate: releaseData.releaseDate
          ? new Date(releaseData.releaseDate).toISOString()
          : "",
        preOrderDate: releaseData.preOrderDate
          ? new Date(releaseData.preOrderDate).toISOString()
          : "",
      };

      if (artwork) {
        console.log("Artwork file found:", artwork.name);
      }
      console.log(
        "Submitting Release JSON (Artwork removed from JSON but kept in state):",
        releasePayload,
      );
      const releaseResult = await createRelease(releasePayload).unwrap();
      console.log("Full Release Response:", releaseResult);
      const releaseId = releaseResult.data?.releaseId;
      console.log("Extracted releaseId:", releaseId);

      if (!releaseId)
        throw new Error("Failed to get release ID from server response");

      // 2. Create Track
      toast.loading("Creating track...", { id: "submit-form" });

      const { audioFile, ...trackMetadata } = trackData;
      const trackPayload = {
        ...trackMetadata,
        releaseId,
        originalReleaseDate: trackData.originalReleaseDate
          ? new Date(trackData.originalReleaseDate).toISOString()
          : releasePayload.releaseDate || new Date().toISOString(),
      };

      console.log("Step 2a: Submitting Track Metadata (JSON):", trackPayload);
      const trackResult = await createTrack(trackPayload).unwrap();
      console.log("Track Metadata Response:", trackResult);
      const trackId = trackResult.data?.trackId || trackResult.data?.id;
      console.log("Extracted trackId for audio upload:", trackId);

      // 3. Upload Audio if present
      if (trackId && audioFile) {
        console.log(
          "Step 3: Audio File detected, starting upload for:",
          audioFile.name,
        );
        toast.loading("Uploading audio file...", { id: "submit-form" });
        const uploadResult = await uploadAudio({ trackId, audioFile }).unwrap();
        console.log("Audio Upload Response:", uploadResult);
      } else {
        console.warn(
          "Skipping Step 3 (Audio Upload): trackId missing or no audioFile selected",
          { trackId, hasFile: !!audioFile },
        );
      }

      // 4. Create Split Sheet
      toast.loading("Creating split sheet...", { id: "submit-form" });
      const splitPayload = {
        ...splitSheetData,
        releaseId,
        releaseDate: releasePayload.releaseDate,
        contributors: splitSheetData.contributors.map((c) => ({
          ...c,
          percentageSplit: Number(c.percentageSplit) || 0,
        })),
      };
      console.log(
        "Step 4: Submitting Split Sheet Metadata (JSON):",
        splitPayload,
      );
      await createSplitSheet(splitPayload).unwrap();

      // 5. Create Back Catalogue
      toast.loading("Adding to back catalogue...", { id: "submit-form" });
      const backCataloguePayload = {
        releaseId,
        labelName: releaseData.labelName,
        distributor: releaseData.distributor,
        upc: releaseData.upc,
        catalogueNumber: releaseData.catalogueNumber,
        releaseArtist: releaseData.albumLevelArtistName,
        releaseTitle: releaseData.releaseTitle,
        releaseType: releaseData.typeOfRelease,
        releaseDate: releasePayload.releaseDate,
        releasePLine: releaseData.releasePLine,
        releaseCLine: releaseData.releaseCLine,
      };
      console.log("Step 5: Submitting Back Catalogue:", backCataloguePayload);
      await createBackCatalogue(backCataloguePayload).unwrap();

      toast.success("Release submitted successfully!", { id: "submit-form" });
      // Redirect or reset form if needed
    } catch (error) {
      console.error("Submission failed:", error);
      const errorMessage =
        (error as any)?.data?.message ||
        "Something went wrong during submission";
      toast.error(errorMessage, { id: "submit-form" });
    }
  };

  return (
    <div className="w-full mt-4">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8">
        <div
          className={`h-2 flex-1 rounded-full mr-2 ${
            step >= 1
              ? "bg-linear-to-r from-[#04A245] via-[#167F7E] to-[#2E4ACA]"
              : "bg-gray-600"
          }`}
        />
        <div
          className={`h-2 flex-1 rounded-full mr-2 ${
            step >= 2
              ? "bg-linear-to-r from-[#04A245] via-[#167F7E] to-[#2E4ACA]"
              : "bg-gray-600"
          }`}
        />
        <div
          className={`h-2 flex-1 rounded-full mr-2 ${
            step >= 3
              ? "bg-linear-to-r from-[#04A245] via-[#167F7E] to-[#2E4ACA]"
              : "bg-gray-600"
          }`}
        />
        <div
          className={`h-2 flex-1 rounded-full ${
            step >= 4
              ? "bg-linear-to-r from-[#04A245] via-[#167F7E] to-[#2E4ACA]"
              : "bg-gray-600"
          }`}
        />
        {/* <div
      className={`h-2 flex-1 rounded-full ${
        step >= 4 ? "bg-gradient-to-r from-[#04A245] via-[#167F7E] to-[#2E4ACA]" : "bg-gray-600"
      }`}
    /> */}
      </div>

      {/* Steps */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <StepOne
            releaseData={releaseData}
            handleReleaseChange={handleReleaseChange}
            handleArtistChange={handleArtistChange}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <StepTwo
            releaseData={releaseData}
            trackData={trackData}
            handleReleaseChange={handleReleaseChange}
            handleTrackChange={handleTrackChange}
            handleTerritoryChange={handleTerritoryChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 3 && (
          <StepThree
            releaseData={releaseData}
            handleReleaseChange={handleReleaseChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 4 && (
          <StepFour
            releaseData={releaseData}
            splitSheetData={splitSheetData}
            handleSplitChange={handleSplitChange}
            handleContributorsChange={handleContributorsChange}
            prevStep={prevStep}
            isSubmitting={isSubmitting}
          />
        )}
      </form>
    </div>
  );
};

export default MultiStepForm;
