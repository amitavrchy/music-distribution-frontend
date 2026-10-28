/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { FaPlus, FaTrashAlt, FaAngleLeft } from "react-icons/fa";
import { RiFileMusicFill } from "react-icons/ri";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateNewReleaseMutation,
  useCreateTrackMutation,
  useCreateSplitSheetMutation,
  useUploadTrackAudioMutation,
  useCreateBackCatalogueMutation,
  useGetSingleBackCatalogueQuery,
  useUpdateBackCatalogueMutation,
  useUpdateReleaseMutation,
  useUpdateTrackMutation,
  useUpdateSplitSheetMutation,
} from "@/redux/features/newRelease/newReleaseApi";
import { useAppSelector } from "@/redux/hooks/redux-hook";

type TrackDetail = {
  trackId?: string;
  trackTitle?: string;
  artistNameOnTrack?: string;
  trackGenre?: string;
  trackMix?: string;
  isRemix?: string;
  trackLanguage?: string;
  trackPublisher?: string;
  trackDate?: string;
  isrcCode?: string;
  territoryRestrictions?: string;
  trackPublisherInfo?: string;
};

export default function DataEntryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tracks, setTracks] = useState([{ id: 1 }]);
  const role = useAppSelector((state) => state.auth.user?.role);
  type FormDataType = {
    labelName: string;
    distributorName: string;
    upcCode: string;
    catalogueNumber: string;
    releaseArtist: string;
    releaseTitle: string;
    releaseType: string;
    releaseDate: string;
    pLine: string;
    cLine: string;
    artwork: File | null;
    trackDetails: TrackDetail[];
    clientName: string;
    nameOnTrack: string;
    artistType: string;
    songWriterRole: string;
    realName: string;
    spotifyId: string;
    appleId: string;
    producerCredits: string;
    lyricistCredits: string;
    masterSplits: string;
    copyrightHolder: string;
  };

  const [formData, setFormData] = useState<FormDataType>({
    labelName: "",
    distributorName: "",
    upcCode: "",
    catalogueNumber: "",
    releaseArtist: "",
    releaseTitle: "",
    releaseType: "",
    releaseDate: "",
    pLine: "",
    cLine: "",
    artwork: null,
    trackDetails: [{} as TrackDetail],
    clientName: "",
    nameOnTrack: "",
    artistType: "",
    songWriterRole: "",
    realName: "",
    spotifyId: "",
    appleId: "",
    producerCredits: "",
    lyricistCredits: "",
    masterSplits: "",
    copyrightHolder: "",
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);

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

  // Query for editing
  const { data: singleCatalogueData } = useGetSingleBackCatalogueQuery(id, {
    skip: !id,
  });

  const [updateBackCatalogue] = useUpdateBackCatalogueMutation();
  const [updateRelease] = useUpdateReleaseMutation();
  const [updateTrack] = useUpdateTrackMutation();
  const [updateSplitSheet] = useUpdateSplitSheetMutation();

  useEffect(() => {
    if (singleCatalogueData?.data) {
      const item = singleCatalogueData.data;
      const release = item.release || {};
      const tracksData = release.tracks || [];

      setFormData((prev) => ({
        ...prev,
        labelName: item.labelName || "",
        distributorName: item.distributor || "",
        upcCode: item.upc || "",
        catalogueNumber: item.catalogueNumber || "",
        releaseArtist: item.releaseArtist || "",
        releaseTitle: item.releaseTitle || "",
        releaseType: item.releaseType || "",
        releaseDate: item.releaseDate ? item.releaseDate.split("T")[0] : "",
        pLine: item.releasePLine || "",
        cLine: item.releaseCLine || "",
        producerCredits: release.producerCredits || "",
        lyricistCredits: release.lyricistCredits || "",
        masterSplits: release.masterSplits || "",
        copyrightHolder: release.copyrightHolder || "",
      }));

      if (tracksData.length > 0) {
        const mappedTracks: TrackDetail[] = tracksData.map(
          (t: Record<string, any>) => ({
            trackId: t.id || t.trackId,
            trackTitle: t.trackTitle,
            artistNameOnTrack: t.artistNameOnTrack,
            trackGenre: t.trackGenre,
            trackMix: t.trackMix,
            isRemix: t.isRemix ? "Yes" : "No",
            trackLanguage: t.trackLanguage,
            trackPublisher: t.trackPublisher,
            trackDate: t.originalReleaseDate
              ? t.originalReleaseDate.split("T")[0]
              : "",
            isrcCode: t.trackIsrc || t.isrc,
            territoryRestrictions: t.territoryRestrictions,
            trackPublisherInfo: t.trackPublisherInfo,
          }),
        );
        setFormData((prev) => ({ ...prev, trackDetails: mappedTracks }));
        setTracks(mappedTracks.map((_, i) => ({ id: i + 1 })));
      }
    }
  }, [singleCatalogueData]);

  const addTrack = () => {
    setTracks([...tracks, { id: Date.now() }]);
    setFormData((prevData) => ({
      ...prevData,
      trackDetails: [...prevData.trackDetails, {} as TrackDetail],
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prevData) => ({ ...prevData, artwork: file }));
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleTrackChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    idx: number,
  ) => {
    const { name, value } = e.target;
    // Strip possible index suffix if it exists, though we'll remove it from the JSX too
    const fieldName = name.split("-")[0];
    const updatedTracks = [...formData.trackDetails];
    updatedTracks[idx] = { ...updatedTracks[idx], [fieldName]: value };
    setFormData((prevData) => ({ ...prevData, trackDetails: updatedTracks }));
  };
  const handleRemoveTrack = (idx: number) => {
    const updatedTracks = [...formData.trackDetails];
    updatedTracks.splice(idx, 1);
    const updatedTrackIds = [...tracks];
    updatedTrackIds.splice(idx, 1);

    setFormData((prevData) => ({ ...prevData, trackDetails: updatedTracks }));
    setTracks(updatedTrackIds);
  };

  const handleSubmit = async () => {
    const toastId = "submit-form";
    try {
      const isEdit = !!id;
      toast.loading(isEdit ? "Updating..." : "Creating release...", {
        id: toastId,
      });

      const releasePayload = {
        labelName: formData.labelName,
        releaseTitle: formData.releaseTitle,
        releaseDate: formData.releaseDate
          ? new Date(formData.releaseDate).toISOString()
          : "",
        typeOfRelease: formData.releaseType,
        albumLevelArtistName: formData.releaseArtist,
        distributor: formData.distributorName,
        upc: formData.upcCode,
        catalogueNumber: formData.catalogueNumber,
        releasePLine: formData.pLine,
        releaseCLine: formData.cLine,
        producerCredits: formData.producerCredits,
        lyricistCredits: formData.lyricistCredits,
        masterSplits: formData.masterSplits,
        copyrightHolder: formData.copyrightHolder,
        status: "Draft",
      };

      let releaseId = "";
      if (isEdit && singleCatalogueData?.data?.releaseId) {
        releaseId = singleCatalogueData.data.releaseId;
        await updateRelease({ id: releaseId, data: releasePayload }).unwrap();
      } else {
        const releaseResult = await createRelease(releasePayload).unwrap();
        releaseId = releaseResult.data?.releaseId;
      }

      if (!releaseId) throw new Error("Failed to get release ID");

      // 2. Tracks - For simplicity in Edit mode, we might just update the first one or create new ones
      // In a real app, you'd fetch existing tracks and update them specifically.
      toast.loading(isEdit ? "Updating tracks..." : "Creating tracks...", {
        id: toastId,
      });

      let firstTrackId = null;

      for (const [idx, track] of formData.trackDetails.entries()) {
        const trackPayload = {
          releaseId,
          trackNumber: idx + 1,
          trackTitle: track.trackTitle || "Untitled Track",
          trackGenre: track.trackGenre,
          trackMix: track.trackMix || "Original Mix",
          explicitContent: false,
          trackLanguage: track.trackLanguage || "English",
          trackPublisher: track.trackPublisher,
          originalReleaseDate: track.trackDate
            ? new Date(track.trackDate).toISOString()
            : releasePayload.releaseDate || new Date().toISOString(),
          trackIsrc: track.isrcCode,
          territoryRestrictions: track.territoryRestrictions || "None",
        };

        let currentTrackId = "";
        if (isEdit && track.trackId) {
          currentTrackId = track.trackId;
          await updateTrack({
            id: currentTrackId,
            data: trackPayload,
          }).unwrap();
        } else {
          const trackResult = await createTrack(trackPayload).unwrap();
          currentTrackId = trackResult.data?.trackId || trackResult.data?.id;
        }

        if (idx === 0) firstTrackId = currentTrackId;
      }

      // 3. Audio
      if (firstTrackId && audioFile) {
        toast.loading("Uploading audio file...", { id: toastId });
        await uploadAudio({ trackId: firstTrackId, audioFile }).unwrap();
      }

      // 4. Split Sheet
      toast.loading(
        isEdit ? "Updating split sheet..." : "Creating split sheet...",
        { id: toastId },
      );
      const splitPayload = {
        releaseId,
        songTitle: formData.releaseTitle,
        isrc: formData.trackDetails[0]?.isrcCode || "",
        releaseDate: releasePayload.releaseDate,
        contributors: [
          {
            name:
              formData.realName ||
              formData.nameOnTrack ||
              "Unknown Contributor",
            role: formData.songWriterRole || "Composer",
            percentageSplit: 100,
          },
        ],
      };

      const existingSplitSheetId =
        singleCatalogueData?.data?.release?.splitSheets?.[0]?.id;
      if (isEdit && existingSplitSheetId) {
        await updateSplitSheet({
          id: existingSplitSheetId,
          data: splitPayload,
        }).unwrap();
      } else {
        await createSplitSheet(splitPayload).unwrap();
      }

      // 5. Back Catalogue
      toast.loading(
        isEdit ? "Updating back catalogue..." : "Adding to back catalogue...",
        { id: toastId },
      );
      const backCataloguePayload = {
        releaseId,
        labelName: formData.labelName,
        distributor: formData.distributorName,
        upc: formData.upcCode,
        catalogueNumber: formData.catalogueNumber,
        releaseArtist: formData.releaseArtist,
        releaseTitle: formData.releaseTitle,
        releaseType: formData.releaseType,
        releaseDate: releasePayload.releaseDate,
        releasePLine: formData.pLine,
        releaseCLine: formData.cLine,
      };

      if (isEdit) {
        await updateBackCatalogue({ id, data: backCataloguePayload }).unwrap();
      } else {
        await createBackCatalogue(backCataloguePayload).unwrap();
      }

      toast.success(
        isEdit
          ? "Catalogue updated successfully!"
          : "Back catalog release submitted successfully!",
        {
          id: toastId,
        },
      );
      navigate(
        role === "ADMIN"
          ? "/admin/catalog/back-catalog"
          : "/client-dashboard/catalog/back-catalog",
      );
    } catch (error: unknown) {
      console.error("Submission failed:", error);
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Something went wrong during submission";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className=" text-white  space-y-8">
      {/* Back Button */}
      <div className="flex justify-start">
        <button
          onClick={() =>
            navigate(
              role === "ADMIN"
                ? "/admin/catalog/back-catalog"
                : "/client-dashboard/catalog/back-catalog",
            )
          }
          className="flex items-center gap-2 text-gray-400 hover:text-white transition cursor-pointer"
        >
          <FaAngleLeft size={18} />
          <span>Back To Catalog</span>
        </button>
      </div>

      {/* General Release Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[#0D1F21] rounded-2xl p-6 shadow-lg space-y-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            🌸 General Release Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
              placeholder="Enter label name"
              name="labelName"
              value={formData.labelName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
              placeholder="Enter Distributor name"
              name="distributorName"
              value={formData.distributorName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
              placeholder="Enter UPC Code"
              name="upcCode"
              value={formData.upcCode}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
              placeholder="Enter catalogue number"
              name="catalogueNumber"
              value={formData.catalogueNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
              placeholder="Enter release artist"
              name="releaseArtist"
              value={formData.releaseArtist}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
              placeholder="Enter release title"
              name="releaseTitle"
              value={formData.releaseTitle}
              onChange={handleInputChange}
            />
            <select
              className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
              name="releaseType"
              value={formData.releaseType}
              onChange={handleInputChange}
            >
              <option>Select release type</option>
              <option>Single</option>
              <option>Album</option>
              <option>EP</option>
            </select>
            <input
              type="date"
              className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
              placeholder="Enter P line"
              name="pLine"
              value={formData.pLine}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
              placeholder="Enter C line"
              name="cLine"
              value={formData.cLine}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
              placeholder="Producer Credits"
              name="producerCredits"
              value={formData.producerCredits}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
              placeholder="Lyricist Credits"
              name="lyricistCredits"
              value={formData.lyricistCredits}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
              placeholder="Master Splits"
              name="masterSplits"
              value={formData.masterSplits}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
              placeholder="Copyright Holder"
              name="copyrightHolder"
              value={formData.copyrightHolder}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Artwork Upload */}
        <label className="cursor-pointer  border-gray-500 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-gray-800 bg-[#0D1F21] flex items-center justify-center border-2 border-dashed ">
          <div>
            <div className="cursor-pointer  border-gray-500 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-gray-800">
              <div className="text-green-400 text-3xl">⬆️</div>
              <div className="mt-2 text-gray-300">
                Drop artwork file here or browse
              </div>
              <input
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              <p className="text-xs text-gray-500 mt-2">
                JPEG or PNG, max 10MB
              </p>
            </div>
          </div>
        </label>
      </div>

      {/* Track Information */}
      <div className="bg-[#0D1F21] rounded-2xl p-6 shadow-lg space-y-4">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              🎵 Track Information
            </h2>
            <button
              onClick={addTrack}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition cursor-pointer"
            >
              <FaPlus /> Add Track
            </button>
          </div>

          {tracks.map((track, idx) => (
            <div
              key={track.id}
              className="border-t border-gray-700 pt-6 mt-6 space-y-4"
            >
              <div className="flex justify-between items-center bg-[#1A2E30] p-3 rounded-xl">
                <h3 className="font-medium text-gray-200">Track {idx + 1}</h3>
                {tracks.length > 1 && (
                  <button
                    onClick={() => handleRemoveTrack(idx)}
                    className="text-red-500 hover:text-red-400 transition-colors cursor-pointer p-1"
                    title="Remove Track"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
                  placeholder="Track Number"
                  value={idx + 1}
                  readOnly
                  name={`trackNumber-${idx}`}
                />
                <input
                  type="text"
                  className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
                  placeholder="Track Title"
                  name="trackTitle"
                  value={formData.trackDetails[idx]?.trackTitle || ""}
                  onChange={(e) => handleTrackChange(e, idx)}
                />
                <input
                  type="text"
                  className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
                  placeholder="Artist name on track"
                  name="artistNameOnTrack"
                  value={formData.trackDetails[idx]?.artistNameOnTrack || ""}
                  onChange={(e) => handleTrackChange(e, idx)}
                />
                <input
                  type="text"
                  className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
                  placeholder="Track Genre"
                  name="trackGenre"
                  value={formData.trackDetails[idx]?.trackGenre || ""}
                  onChange={(e) => handleTrackChange(e, idx)}
                />
                <input
                  type="text"
                  className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
                  placeholder="Track Mix/Version"
                  name="trackMix"
                  value={formData.trackDetails[idx]?.trackMix || ""}
                  onChange={(e) => handleTrackChange(e, idx)}
                />
                <select
                  className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
                  name="isRemix"
                  value={formData.trackDetails[idx]?.isRemix || "No"}
                  onChange={(e) => handleTrackChange(e, idx)}
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
                <input
                  type="text"
                  className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
                  placeholder="Track Language"
                  name="trackLanguage"
                  value={formData.trackDetails[idx]?.trackLanguage || ""}
                  onChange={(e) => handleTrackChange(e, idx)}
                />
                <input
                  type="text"
                  className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
                  placeholder="Track Publisher"
                  name="trackPublisher"
                  value={formData.trackDetails[idx]?.trackPublisher || ""}
                  onChange={(e) => handleTrackChange(e, idx)}
                />
                <input
                  type="date"
                  className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
                  name="trackDate"
                  value={formData.trackDetails[idx]?.trackDate || ""}
                  onChange={(e) => handleTrackChange(e, idx)}
                />
                <input
                  type="text"
                  className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
                  placeholder="Enter ISRC code"
                  name="isrcCode"
                  value={formData.trackDetails[idx]?.isrcCode || ""}
                  onChange={(e) => handleTrackChange(e, idx)}
                />
                <input
                  type="text"
                  className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
                  placeholder="Territory Restrictions"
                  name="territoryRestrictions"
                  value={
                    formData.trackDetails[idx]?.territoryRestrictions || ""
                  }
                  onChange={(e) => handleTrackChange(e, idx)}
                />
                <input
                  type="text"
                  className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
                  placeholder="Track Publisher"
                  name="trackPublisherInfo"
                  value={formData.trackDetails[idx]?.trackPublisherInfo || ""}
                  onChange={(e) => handleTrackChange(e, idx)}
                />
              </div>
            </div>
          ))}
        </div>
        {/* <div className="max-w-sm bg-[#0D1F21] rounded-2xl p-6 flex items-center justify-center text-center border-2 border-dashed border-gray-600">
          <div>
            <div className="text-[#3A5CFF] text-3xl">
              <RiFileMusicFill />
            </div>
            <p className="mt-2 text-gray-300">
              Upload audio file (.wav preferred)
            </p>
          </div>
        </div> */}
        <label className="cursor-pointer border-gray-600 rounded-2xl p-6 text-center hover:border-blue-400 hover:bg-gray-800 bg-[#0D1F21] flex items-center justify-center border-2 border-dashed max-w-sm">
          <div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-[#3A5CFF] text-3xl">
                <RiFileMusicFill />
              </div>
              <p className="mt-2 text-gray-300">
                Upload audio file (.wav preferred)
              </p>
              <input
                type="file"
                className="hidden"
                accept=".wav,.mp3,.ogg"
                onChange={handleAudioChange}
              />
              <p className="text-xs text-gray-500 mt-2">
                WAV, MP3, or OGG, max 20MB
              </p>
            </div>
          </div>
        </label>
      </div>

      {/* Artist Metadata (Per Track) */}
      <div className="bg-[#0D1F21] rounded-2xl p-6 shadow-lg space-y-4">
        <h2 className="text-lg font-semibold">
          🎤 Artist Metadata (Per Track)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
            placeholder="Client Name"
            name="clientName"
            value={formData.clientName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
            placeholder="Name On Track"
            name="nameOnTrack"
            value={formData.nameOnTrack}
            onChange={handleInputChange}
          />
          <select
            className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
            name="artistType"
            value={formData.artistType}
            onChange={handleInputChange}
          >
            <option>Select Artist Type</option>
            <option>Type 1</option>
            <option>Type 2</option>
          </select>
          <input
            type="text"
            className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
            placeholder="Song Writer Role"
            name="songWriterRole"
            value={formData.songWriterRole}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
            placeholder="Real Name"
            name="realName"
            value={formData.realName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
            placeholder="Spotify ID"
            name="spotifyId"
            value={formData.spotifyId}
            onChange={handleInputChange}
          />
          <input
            type="text"
            className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
            placeholder="Apple ID"
            name="appleId"
            value={formData.appleId}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-4">
        <button className="px-6 py-2 bg-gray-600 rounded-lg text-white cursor-pointer hover:bg-gray-700 transition">
          Save As Draft
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 rounded-lg text-white cursor-pointer hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Back Catalog Data"}
        </button>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { FaPlus } from "react-icons/fa";
// import { RiFileMusicFill } from "react-icons/ri";

// export default function DataEntryForm() {
//   const [tracks, setTracks] = useState([{ id: 1 }]);

//   const addTrack = () => {
//     setTracks([...tracks, { id: tracks.length + 1 }]);
//   };

//   return (
//     <div className="min-h-screen text-white p-8 space-y-8">
//       {/* General Release Information */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="md:col-span-2 bg-[#0D1F21] rounded-2xl p-6 shadow-lg space-y-6">
//           <h2 className="text-lg font-semibold flex items-center gap-2">
//             🌸 General Release Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//               placeholder="Enter label name"
//             />
//             <input
//               className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//               placeholder="Enter Distributor name"
//             />
//             <input
//               className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//               placeholder="Enter UPC Code"
//             />
//             <input
//               className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//               placeholder="Enter catalogue number"
//             />
//             <input
//               className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//               placeholder="Enter release artist"
//             />
//             <input
//               className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//               placeholder="Enter release title"
//             />
//             <select className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white">
//               <option>Select release type</option>
//               <option>Single</option>
//               <option>Album</option>
//               <option>EP</option>
//             </select>
//             <input
//               type="date"
//               className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//             />
//             <input
//               className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//               placeholder="Enter P line"
//             />
//             <input
//               className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//               placeholder="Enter C line"
//             />
//           </div>
//         </div>

//         {/* Artwork Upload */}
//         <div className="bg-[#0D1F21] rounded-2xl p-6 flex items-center justify-center text-center border-2 border-dashed border-gray-600">
//           <div>
//             <div className="text-green-400 text-3xl">⬆️</div>
//             <p className="mt-2 text-gray-300">
//               Drop artwork file here or{" "}
//               <span className="text-blue-400 cursor-pointer">browse</span>
//             </p>
//             <p className="text-xs text-gray-500">JPEG or PNG, max 10MB</p>
//           </div>
//         </div>
//       </div>

//       {/* Track Information */}
//       <div className="bg-[#0D1F21] rounded-2xl p-6 shadow-lg space-y-4">
//         <div>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-lg font-semibold flex items-center gap-2">
//               🎵 Track Information
//             </h2>
//             <button
//               onClick={addTrack}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition"
//             >
//               <FaPlus /> Add Track
//             </button>
//           </div>

//           {tracks.map((track, idx) => (
//             <div
//               key={track.id}
//               className="border-t border-gray-700 pt-6 mt-6 space-y-4"
//             >
//               <h3 className="font-medium text-gray-200">Track {idx + 1}</h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input
//                   className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//                   placeholder="Track Number"
//                   value={idx + 1}
//                   readOnly
//                 />
//                 <input
//                   className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//                   placeholder="Track Title"
//                 />
//                 <input
//                   className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//                   placeholder="Artist name on track"
//                 />
//                 <input
//                   className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//                   placeholder="Track Genre"
//                 />
//                 <input
//                   className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//                   placeholder="Track Mix/Version"
//                 />
//                 <select className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white">
//                   <option>No</option>
//                   <option>Yes</option>
//                 </select>
//                 <input
//                   className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//                   placeholder="Track Language"
//                 />
//                 <input
//                   className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//                   placeholder="Track Publisher"
//                 />
//                 <input
//                   type="date"
//                   className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//                 />
//                 <input
//                   className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//                   placeholder="Enter ISRC code"
//                 />
//                 <input
//                   className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//                   placeholder="Territory Restrictions"
//                 />
//                 <input
//                   className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//                   placeholder="Track Publisher"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="max-w-sm bg-[#0D1F21] rounded-2xl p-6 flex items-center justify-center text-center border-2 border-dashed border-gray-600">
//           <div>
//             <div className="text-[#3A5CFF] text-3xl">
//               <RiFileMusicFill />
//             </div>
//             <p className="mt-2 text-gray-300">
//               Upload audio file (.wav preferred)
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Artist Metadata (Per Track) */}
//       <div className="bg-[#0D1F21] rounded-2xl p-6 shadow-lg space-y-4">
//         <h2 className="text-lg font-semibold">
//           🎤 Artist Metadata (Per Track)
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//             placeholder="Client Name"
//           />
//           <input
//             className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//             placeholder="Name On Track"
//           />
//           <select className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white">
//             <option>Select Artist Type</option>
//             <option>Type 1</option>
//             <option>Type 2</option>
//           </select>
//           <input
//             className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//             placeholder="Song Writer Role"
//           />
//           <input
//             className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//             placeholder="Real Name"
//           />
//           <input
//             className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//             placeholder="Spotify ID"
//           />
//           <input
//             className="w-full p-3 mt-2 rounded-xl bg-[#253638] text-white"
//             placeholder="Apple ID"
//           />
//         </div>
//       </div>

//       <div className="flex justify-end mt-6 space-x-4">
//         <button className="px-6 py-2 bg-gray-600 rounded-lg text-white">
//           Save As Draft
//         </button>
//         <button className="px-6 py-2 bg-blue-600 rounded-lg text-white">
//           Submit Back Catalog Data
//         </button>
//       </div>
//     </div>
//   );
// }
