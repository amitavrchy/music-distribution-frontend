import { FaAnglesLeft } from "react-icons/fa6";

import { FaAngleDoubleRight } from "react-icons/fa";
import { ReleaseData, TrackData, Territory } from "./data";

type StepTwoProps = {
  releaseData: ReleaseData;
  trackData: TrackData;
  handleReleaseChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  handleTrackChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  handleTerritoryChange: (territories: Territory[]) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const StepTwo = ({
  releaseData,
  trackData,
  handleReleaseChange,
  handleTrackChange,
  handleTerritoryChange,
  nextStep,
  prevStep,
}: StepTwoProps) => {
  return (
    <div className="space-y-9">
      <div>
        <h1 className="text-3xl font-sans">
          Music-Specific & Legal Information
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          This section covers the copyright, credits, and legal details of your
          release.
        </p>
      </div>
      <div className=" flex items-center justify-center px-4">
        <div className="w-full  text-gray-200">
          <h2 className="text-2xl font-bold mb-6">Release Information</h2>
          <form className="space-y-6">
            {/* Publisher */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Publisher</label>
                <input
                  type="text"
                  name="trackPublisher"
                  value={trackData.trackPublisher || ""}
                  onChange={handleTrackChange}
                  placeholder="Enter publisher name"
                  className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">
                  Original Release Date
                </label>
                <input
                  type="date"
                  name="originalReleaseDate"
                  value={trackData.originalReleaseDate || ""}
                  onChange={handleTrackChange}
                  className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
            </div>

            {/* Copyright Holder */}
            <div>
              <label className="block text-sm mb-2">Copyright Holder</label>
              <input
                type="text"
                name="copyrightHolder"
                value={releaseData.copyrightHolder || ""}
                onChange={handleReleaseChange}
                placeholder="Enter copyright holder"
                className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* P Line & C Line */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">P Line</label>
                <input
                  type="text"
                  name="releasePLine"
                  value={releaseData.releasePLine || ""}
                  onChange={handleReleaseChange}
                  placeholder="e.g. (P) 2024 Marlow"
                  className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">C Line</label>
                <input
                  type="text"
                  name="releaseCLine"
                  value={releaseData.releaseCLine || ""}
                  onChange={handleReleaseChange}
                  placeholder="e.g. (c) 2024 Marlow"
                  className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm mb-2">Language</label>
              <select
                name="language"
                value={releaseData.language || ""}
                onChange={handleReleaseChange}
                className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                <option value="">Select language</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>

            {/* Explicit Content */}
            <div>
              <label className="block text-sm mb-2">
                Does this track contain explicit content?
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="isExplicitContent"
                    value="true"
                    checked={releaseData.isExplicitContent === true}
                    onChange={handleReleaseChange}
                    className="text-blue-500 focus:ring-0 cursor-pointer"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="isExplicitContent"
                    value="false"
                    checked={releaseData.isExplicitContent === false}
                    onChange={handleReleaseChange}
                    className="text-blue-500 focus:ring-0 cursor-pointer"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Producer Credits */}
            <div>
              <label className="block text-sm mb-2">Producer Credits</label>
              <input
                type="text"
                name="producerCredits"
                value={releaseData.producerCredits || ""}
                onChange={handleReleaseChange}
                placeholder="Producer Credits"
                className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Lyricist Credits */}
            <div>
              <label className="block text-sm mb-2">Lyricist Credits</label>
              <input
                type="text"
                name="lyricistCredits"
                value={releaseData.lyricistCredits || ""}
                onChange={handleReleaseChange}
                placeholder="Lyricist Credits"
                className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Master Splits */}
            <div>
              <label className="block text-sm mb-2">Master Splits</label>
              <input
                type="text"
                name="masterSplits"
                value={releaseData.masterSplits || ""}
                onChange={handleReleaseChange}
                placeholder="Master Splits"
                className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Audio File Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm mb-2">
                Upload Audio File (MP3, WAV, FLAC, AAC, M4A - Max 100MB)
              </label>
              <input
                type="file"
                name="audioFile"
                accept=".mp3,.wav,.flac,.aac,.m4a"
                onChange={handleTrackChange}
                className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Territory */}
            <div>
              <label className="block text-sm mb-2">
                Please list territory of where the release was recorded
              </label>
              <input
                type="text"
                name="territories"
                value={
                  releaseData.territories.map((t) => t.territory).join(", ") ||
                  ""
                }
                onChange={(e) => {
                  const val = e.target.value;
                  const territories = val
                    .split(",")
                    .map((t) => ({ territory: t.trim() }));
                  handleTerritoryChange(territories);
                }}
                placeholder="e.g. US, UK, WW"
                className="w-full bg-[#203530] border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* External Splits */}
            <div>
              <label className="block text-sm mb-2">
                Did your master splits include a split to an artist or company
                not signed to Create?
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="hasExternalRightsHolder"
                    value="true"
                    checked={releaseData.hasExternalRightsHolder === true}
                    onChange={handleReleaseChange}
                    className="text-blue-500 focus:ring-0 cursor-pointer"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="hasExternalRightsHolder"
                    value="false"
                    checked={releaseData.hasExternalRightsHolder === false}
                    onChange={handleReleaseChange}
                    className="text-blue-500 focus:ring-0 cursor-pointer"
                  />
                  No
                </label>
              </div>
            </div>
          </form>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-2 px-6 py-2 rounded-xl 
                       bg-gray-600 text-white font-medium shadow-md 
                       hover:bg-gray-700 hover:shadow-lg 
                       focus:outline-none focus:ring-2 focus:ring-gray-400 
                       transition-all duration-200 cursor-pointer"
            >
              <FaAnglesLeft className="text-lg" />
              Previous
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-2 text-white font-medium bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 cursor-pointer"
            >
              Next
              <FaAngleDoubleRight className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
