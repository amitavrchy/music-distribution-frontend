import { FaAngleDoubleRight } from "react-icons/fa";
import { FormDataType } from "./MultiStepForm";

type StepOneProps = {
  formData: FormDataType;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  nextStep: () => void;
};

const StepOne = ({ formData, handleChange, nextStep }: StepOneProps) => {
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
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.phone}
                onChange={handleChange}
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
                name="artistName"
                placeholder="Artist Name"
                value={formData.artistName}
                onChange={handleChange}
                className="p-3 rounded-xl bg-[#20362F] w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 font-sans">
                {" "}
                Where are you from?
              </label>
              <input
                type="text"
                name="location"
                placeholder="Where are you from?"
                value={formData.location}
                onChange={handleChange}
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
                  value={formData.releaseDate}
                  onChange={handleChange}
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
                  value={formData.preOrderDate}
                  onChange={handleChange}
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
                  name="label"
                  placeholder="Label Name"
                  value={formData.label}
                  onChange={handleChange}
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
                  name="albumArtist"
                  placeholder="Album Level Artist"
                  value={formData.albumArtist}
                  onChange={handleChange}
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
                  value={formData.releaseTitle}
                  onChange={handleChange}
                  className="p-3 rounded-xl bg-[#20362F] w-full"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 font-sans">
                  {" "}
                  Type Of Release
                </label>
                <select
                  name="releaseType"
                  value={formData.releaseType}
                  onChange={handleChange}
                  className="p-3 rounded-xl bg-[#20362F] w-full"
                >
                  <option>Single</option>
                  <option>Album</option>
                  <option>EP</option>
                </select>
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
                  onChange={handleChange}
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
                  name="musicFile"
                  placeholder="Music File Link (http://...)"
                  value={formData.musicFile}
                  onChange={handleChange}
                  className="p-3 rounded-xl bg-[#20362F] w-full"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 font-sans"> Genre </label>
                <input
                  type="text"
                  name="genre"
                  placeholder="Genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="p-3 rounded-xl bg-[#20362F] w-full"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 font-sans">
                  Please provide a 60 sec time stamp you want to use for TikTok
                </label>

                <input
                  type="file"
                  name="tiktokClip"
                  onChange={handleChange}
                  className="p-3 rounded-xl bg-[#20362F] w-full cursor-pointer"
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
