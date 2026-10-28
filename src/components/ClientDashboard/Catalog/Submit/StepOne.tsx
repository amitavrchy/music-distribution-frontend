import { FaAngleDoubleRight } from "react-icons/fa";

import { ReleaseData } from "./data";

type StepOneProps = {
  releaseData: ReleaseData;
  handleReleaseChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  handleArtistChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  nextStep: () => void;
};

const StepOne = ({
  releaseData,
  handleReleaseChange,
  nextStep,
  handleArtistChange,
}: StepOneProps) => {
  const primaryArtist = releaseData.artists[0];
  return (
    <div className="space-y-9">
      <div>
        <h1 className="text-3xl font-sans">Basic Release Information</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Please provide the essential details about the artist and the release.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-sans mb-4">Artist Information</h2>
        <div className="space-y-8">
          {/* part-1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2 font-sans">
                What is your name?
              </label>
              <input
                type="text"
                name="name"
                placeholder="Artist or Brand Name"
                value={primaryArtist.name}
                onChange={handleArtistChange}
                className="p-3 rounded-xl bg-[#20362F] w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 font-sans">
                What is your email?
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={primaryArtist.email}
                onChange={handleArtistChange}
                className="p-3 rounded-xl bg-[#20362F] w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 font-sans">
                {" "}
                What is your phone number?
              </label>{" "}
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={primaryArtist.phone}
                onChange={handleArtistChange}
                className="p-3 rounded-xl bg-[#20362F] w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 font-sans">
                {" "}
                What is your Artist name?
              </label>

              <input
                type="text"
                name="stageName"
                placeholder="Artist Name"
                value={primaryArtist.stageName}
                onChange={handleArtistChange}
                className="p-3 rounded-xl bg-[#20362F] w-full"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm mb-2 font-sans">
                {" "}
                Where are you from? (Address)
              </label>
              <input
                type="text"
                name="address"
                placeholder="Artist Location / Address"
                value={primaryArtist.address}
                onChange={handleArtistChange}
                className="p-3 rounded-xl bg-[#20362F] w-full col-span-2"
              />
            </div>
          </div>
          {/* part-2 */}
          <div>
            <h2 className="text-2xl font-sans mb-4">Release Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 font-sans">
                  {" "}
                  What is the release date?
                </label>
                <input
                  type="date"
                  name="releaseDate"
                  value={releaseData.releaseDate}
                  onChange={handleReleaseChange}
                  className="p-3 rounded-xl bg-[#20362F] w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 font-sans">
                  Pre-order Date
                </label>
                <input
                  type="date"
                  name="preOrderDate"
                  value={releaseData.preOrderDate}
                  onChange={handleReleaseChange}
                  className="p-3 rounded-xl bg-[#20362F] w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 font-sans">
                  {" "}
                  Label Name
                </label>
                <input
                  type="text"
                  name="labelName"
                  placeholder="Label Name"
                  value={releaseData.labelName}
                  onChange={handleReleaseChange}
                  className="p-3 rounded-xl bg-[#20362F] w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 font-sans">
                  {" "}
                  Album Level Artist Name
                </label>
                <input
                  type="text"
                  name="albumLevelArtistName"
                  placeholder="Album Level Artist"
                  value={releaseData.albumLevelArtistName}
                  onChange={handleReleaseChange}
                  className="p-3 rounded-xl bg-[#20362F] w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 font-sans">
                  {" "}
                  Release Title
                </label>
                <input
                  type="text"
                  name="releaseTitle"
                  placeholder="Release Title"
                  value={releaseData.releaseTitle}
                  onChange={handleReleaseChange}
                  className="p-3 rounded-xl bg-[#20362F] w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 font-sans">
                  {" "}
                  Type Of Release
                </label>
                <select
                  name="typeOfRelease"
                  value={releaseData.typeOfRelease}
                  onChange={handleReleaseChange}
                  className="p-3 rounded-xl bg-[#20362F] w-full text-white"
                >
                  <option value="Single">Single</option>
                  <option value="Album">Album</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2 font-sans">
                  Distributor
                </label>
                <input
                  type="text"
                  name="distributor"
                  placeholder="e.g. Distrokid"
                  value={releaseData.distributor || ""}
                  onChange={handleReleaseChange}
                  className="p-3 rounded-xl bg-[#20362F] w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 font-sans">UPC</label>
                <input
                  type="text"
                  name="upc"
                  placeholder="Enter UPC"
                  value={releaseData.upc || ""}
                  onChange={handleReleaseChange}
                  className="p-3 rounded-xl bg-[#20362F] w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 font-sans">
                  Catalogue Number
                </label>
                <input
                  type="text"
                  name="catalogueNumber"
                  placeholder="Enter Catalogue Number"
                  value={releaseData.catalogueNumber || ""}
                  onChange={handleReleaseChange}
                  className="p-3 rounded-xl bg-[#20362F] w-full"
                />
              </div>
            </div>
          </div>
          {/* part-3 */}
          <div>
            <h2 className="text-2xl font-sans mb-4">Content & Promotion</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 font-sans">
                  {" "}
                  Upload your Single Artwork here
                </label>
                <input
                  type="file"
                  name="artwork"
                  onChange={handleReleaseChange}
                  className="p-3 rounded-xl bg-[#20362F] w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 font-sans">
                  {" "}
                  Link to the Music file
                </label>
                <input
                  type="url"
                  name="musicFileLink"
                  placeholder="Music File Link (http://...)"
                  value={releaseData.musicFileLink}
                  onChange={handleReleaseChange}
                  className="p-3 rounded-xl bg-[#20362F] w-full"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-2 font-sans"> Genre </label>
                <input
                  type="text"
                  name="genre"
                  placeholder="Genre"
                  value={releaseData.genre}
                  onChange={handleReleaseChange}
                  className="p-3 rounded-xl bg-[#20362F] w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          >
            Next
            <FaAngleDoubleRight className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
