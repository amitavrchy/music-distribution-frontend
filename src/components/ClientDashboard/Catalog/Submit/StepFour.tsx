import { useState, useEffect } from "react";
import { FaMusic } from "react-icons/fa";
import { ReleaseData, SplitSheetData, SplitContributor } from "./data";

type StepFourProps = {
  releaseData: ReleaseData;
  splitSheetData: SplitSheetData;
  handleSplitChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  handleContributorsChange: (contributors: SplitContributor[]) => void;
  prevStep: () => void;
  isSubmitting: boolean;
};

function StepFour({
  releaseData,
  splitSheetData,
  handleSplitChange,
  handleContributorsChange,
  prevStep,
  isSubmitting,
}: StepFourProps) {
  // Local state for contributors to preserve UI feel, but synced to splitSheetData
  const [contributors, setContributors] = useState<SplitContributor[]>(
    splitSheetData.contributors.length > 0
      ? splitSheetData.contributors
      : [
          {
            fullName: "",
            contribution: "Composer",
            email: "",
            phone: "",
            address: "",
            publisher: "",
            affiliation: "",
            percentageSplit: 0,
            ipiCaeNumber: "",
          },
        ],
  );

  useEffect(() => {
    handleContributorsChange(contributors);
  }, [contributors, handleContributorsChange]);

  const handleAddContributor = () => {
    if (contributors.length >= 5) return;
    setContributors([
      ...contributors,
      {
        fullName: "",
        contribution: "Composer",
        email: "",
        phone: "",
        address: "",
        publisher: "",
        affiliation: "",
        percentageSplit: 0,
        ipiCaeNumber: "",
      },
    ]);
  };

  const handleContributorChangeLocal = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    const values = [...contributors];
    const key = name as keyof SplitContributor;

    if (key === "percentageSplit") {
      const numValue = value === "" ? 0 : Number(value);
      values[index].percentageSplit = isNaN(numValue) ? 0 : numValue;
    } else {
      values[index][key] = value;
    }
    setContributors(values);
  };

  const handleRemoveContributor = (index: number) => {
    const values = [...contributors];
    values.splice(index, 1);
    setContributors(values);
  };

  return (
    <div>
      <h1 className="text-2xl font-sans mb-6">Split Sheet Agreement</h1>
      <div className="space-y-9">
        <div className="bg-[#0D1F21] text-white p-6 rounded-xl">
          {/* Song Information Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <FaMusic />
              Song Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 font-sans">
                  Song Title
                </label>
                <input
                  className="p-3 rounded-xl bg-[#20362F] w-full"
                  type="text"
                  placeholder="Enter song title"
                  name="songTitle"
                  value={splitSheetData.songTitle}
                  onChange={handleSplitChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 font-sans">
                    ISWC No
                  </label>
                  <input
                    className="p-3 rounded-xl bg-[#20362F] w-full"
                    type="text"
                    placeholder="Enter ISWC Code"
                    name="isrc"
                    value={splitSheetData.isrc}
                    onChange={handleSplitChange}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-sans">
                    Release Date
                  </label>
                  <input
                    className="p-3 rounded-xl bg-[#20362F] w-full"
                    type="date"
                    name="releaseDate"
                    value={splitSheetData.releaseDate}
                    onChange={handleSplitChange}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-sans">
                    Recording Artist(s)
                  </label>
                  <input
                    type="text"
                    placeholder="Artist or Brand Name"
                    name="albumLevelArtistName"
                    value={releaseData.albumLevelArtistName}
                    readOnly
                    className="p-3 rounded-xl bg-[#20362F] w-full opacity-60 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-sans">
                    Record Label
                  </label>
                  <input
                    type="text"
                    placeholder="Record Label"
                    name="labelName"
                    value={releaseData.labelName}
                    readOnly
                    className="p-3 rounded-xl bg-[#20362F] w-full opacity-60 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#0D1F21] text-white p-6 rounded-xl">
          {/* Contributors & Splits Section */}
          <div>
            <h2 className="text-2xl font-sans mb-4">Contributors & Splits</h2>

            {contributors.map((contributor, index) => (
              <div key={index} className="mb-4 p-4 bg-[#1a2d2f] rounded-lg">
                <h3 className="font-sans text-xl mb-4">
                  Contributor {index + 1}
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2 font-sans">
                        Full Name
                      </label>
                      <input
                        name="fullName"
                        className="p-3 rounded-xl bg-[#20362F] w-full"
                        value={contributor.fullName}
                        onChange={(e) => handleContributorChangeLocal(index, e)}
                        type="text"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 font-sans">
                        Contribution
                      </label>
                      <select
                        name="contribution"
                        className="p-3 rounded-xl bg-[#20362F] w-full"
                        value={contributor.contribution}
                        onChange={(e) => handleContributorChangeLocal(index, e)}
                      >
                        <option value="Composer">Composer</option>
                        <option value="Lyricist">Lyricist</option>
                        <option value="Producer">Producer</option>
                        <option value="Publisher">Publisher</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm mb-2 font-sans">
                        Email
                      </label>
                      <input
                        name="email"
                        className="p-3 rounded-xl bg-[#20362F] w-full"
                        value={contributor.email}
                        onChange={(e) => handleContributorChangeLocal(index, e)}
                        type="email"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 font-sans">
                        Phone
                      </label>
                      <input
                        name="phone"
                        className="p-3 rounded-xl bg-[#20362F] w-full"
                        value={contributor.phone}
                        onChange={(e) => handleContributorChangeLocal(index, e)}
                        type="text"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2 font-sans">
                        Publisher
                      </label>
                      <input
                        name="publisher"
                        className="p-3 rounded-xl bg-[#20362F] w-full"
                        value={contributor.publisher}
                        onChange={(e) => handleContributorChangeLocal(index, e)}
                        type="text"
                        placeholder="Enter publisher name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 font-sans">
                        Affiliation
                      </label>
                      <input
                        name="affiliation"
                        className="p-3 rounded-xl bg-[#20362F] w-full"
                        value={contributor.affiliation}
                        onChange={(e) => handleContributorChangeLocal(index, e)}
                        type="text"
                        placeholder="Affiliation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 font-sans">
                        IPI/CAE Number
                      </label>
                      <input
                        name="ipiCaeNumber"
                        className="p-3 rounded-xl bg-[#20362F] w-full"
                        value={contributor.ipiCaeNumber}
                        onChange={(e) => handleContributorChangeLocal(index, e)}
                        type="text"
                        placeholder="Enter IPI/CAE number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 font-sans">
                        Percentage Split
                      </label>
                      <input
                        name="percentageSplit"
                        className="p-3 rounded-xl bg-[#20362F] w-full"
                        value={contributor.percentageSplit}
                        onChange={(e) => handleContributorChangeLocal(index, e)}
                        type="number"
                        placeholder="00"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveContributor(index)}
                  className="mt-4 text-red-500 hover:text-red-700 cursor-pointer"
                >
                  Remove Contributor
                </button>
              </div>
            ))}

            <div className="flex justify-center items-center mt-6">
              <button
                type="button"
                onClick={handleAddContributor}
                className="bg-[#132539] p-2 rounded-xl text-white hover:bg-[#1E3A59] transition duration-300 ease-in-out cursor-pointer"
              >
                + Add Contributor ({contributors.length}/5)
              </button>
            </div>
          </div>

          <div className="bg-[#0D2022] p-4 sm:p-6 rounded-xl border border-[#324143] mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <div className="w-full sm:w-auto">
              <h2 className="font-semibold text-lg sm:text-xl">
                Total Split:{" "}
                <span className="text-[#01D449]">
                  {contributors.reduce(
                    (sum, contributor) => sum + contributor.percentageSplit,
                    0,
                  )}
                  %
                </span>
              </h2>
            </div>

            {/* Generate Button */}
            <div className="w-full sm:w-auto flex justify-start sm:justify-end">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 w-full sm:w-auto cursor-pointer">
                Generate Split Sheet & Send For Signature
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-2 px-6 py-2 rounded-xl 
             bg-gray-600 text-white font-medium shadow-md 
             hover:bg-gray-700 hover:shadow-lg 
             focus:outline-none focus:ring-2 focus:ring-gray-400 
             transition-all duration-200 cursor-pointer"
          >
            Previous
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
              isSubmitting
                ? "bg-green-800 opacity-70 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StepFour;
