import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaMusic } from "react-icons/fa";
import { GiVanDammeSplit } from "react-icons/gi";
import { useState, useEffect } from "react";
import { exportToExcel } from "@/utils/exportUtils";
import { useGetSingleAdminSplitSheetQuery } from "@/redux/features/admin/adminApi";
import { useAppSelector } from "@/redux/hooks/redux-hook";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";
import ComponentError from "@/components/Reuseable/ComponentError";

const SplitSheetDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  const role = useAppSelector((state) => state.auth.user?.role);
  const isAdmin =
    role === "ADMIN" || role === "SUPER_ADMIN" || role === "DISTRIBUTOR";

  const {
    data: adminResponse,
    isLoading,
    isError,
  } = useGetSingleAdminSplitSheetQuery(id as string, {
    skip: !isAdmin || !id,
  });

  const [contributors, setContributors] = useState([
    {
      fullName: "",
      contribution: "",
      email: "",
      phone: "",
      address: "",
      publisher: "",
      affiliation: "",
      ipiNumber: "",
      percentage: "",
    },
  ]);

  useEffect(() => {
    if (adminResponse?.data?.contributors) {
      setContributors(
        adminResponse.data.contributors.map((c) => ({
          fullName: c.fullName || "",
          contribution: c.contribution || "",
          email: c.email || "",
          phone: c.phone || "",
          address: c.address || "",
          publisher: c.publisher || "",
          affiliation: c.affiliation || "",
          ipiNumber: c.ipiCaeNumber || "",
          percentage: c.percentageSplit || "",
        })),
      );
    }
  }, [adminResponse]);

  if (isLoading) return <ComponentLoader />;
  if (isError) return <ComponentError />;

  const displayData = adminResponse?.data
    ? {
        songTitle: adminResponse.data.songTitle,
        iswc: adminResponse.data.isrc,
        releaseDate: new Date(
          adminResponse.data.releaseDate,
        ).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        recordingArtists:
          adminResponse.data.release.albumLevelArtistName || "Unknown Artist",
        label: adminResponse.data.release.labelName || "Marlow",
        recordLabelFull: adminResponse.data.release.labelName || "Marlow",
        upc: adminResponse.data.isrc,
        type: adminResponse.data.release.typeOfRelease || "Single",
        genre: adminResponse.data.release.genre || "N/A",
        duration: "N/A",
        producers: adminResponse.data.release.producerCredits
          ? [adminResponse.data.release.producerCredits]
          : [],
        writers: adminResponse.data.release.lyricistCredits
          ? [adminResponse.data.release.lyricistCredits]
          : [],
        description:
          adminResponse.data.release.additionalDetails ||
          "No description available.",
        imageUrl: state?.imageUrl || "", // Keeping image from state if available
      }
    : state;

  if (!displayData && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#0C1F21]">
        <p className="text-gray-400 text-lg mb-6">Song not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-[#3A5CFF] hover:bg-blue-600 transition-colors text-white px-6 py-2 rounded-lg shadow-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    songTitle,
    label,
    upc,
    releaseDate,
    type,
    imageUrl,
    genre,
    duration,
    producers,
    writers,
    description,
    recordingArtists,
    recordLabelFull,
    iswc,
  } = displayData;

  const handleContributorChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const updated = [...contributors];
    updated[index] = { ...updated[index], [field]: value };
    setContributors(updated);
  };

  const handleDownload = () => {
    const songInfo = {
      "Song Title": songTitle,
      "ISWC No": iswc,
      "Release Date": releaseDate,
      "Recording Artist(s)": recordingArtists,
      "Record Label": recordLabelFull || label,
      UPC: upc,
      Type: type,
      Genre: genre,
      Duration: duration,
      Producers: producers.join(", "),
      Writers: writers.join(", "),
      Description: description,
    };

    const contributorData = contributors.map((c, i) => ({
      "Contributor #": i + 1,
      "Full Name": c.fullName,
      Contribution: c.contribution,
      Email: c.email,
      Phone: c.phone,
      Address: c.address,
      Publisher: c.publisher,
      Affiliation: c.affiliation,
      "IPI/CAE Number": c.ipiNumber,
      "Percentage Split": c.percentage + "%",
    }));

    // Combine song info and contributors for export
    // We can put them in separate rows or different sheets if the utility supports it.
    // Assuming simple flat array for now or two separate exports if needed.
    // Let's create a combined list where song info is repeated or leading.
    const exportData = contributorData.map((c) => ({
      ...songInfo,
      ...c,
    }));

    exportToExcel(
      exportData,
      `Split_Sheet_${songTitle || "Export"}_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };

  return (
    <div className="mx-auto bg-[#0C1F21] rounded-xl border border-[#2C403E] p-6 shadow-xl text-white ">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 bg-[#3A5CFF] hover:bg-blue-600 transition-colors px-5 py-2 rounded-lg shadow-md cursor-pointer"
      >
        ← Back
      </button>

      {/* Song Image */}
      <div className="flex justify-center mb-8">
        <img
          src={imageUrl}
          alt={songTitle}
          className="rounded-2xl shadow-lg border border-gray-700 object-cover w-full max-h-[400px]"
        />
      </div>

      {/* Song Details */}
      <div className="bg-[#0D1F21] text-white ">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <FaMusic /> Song Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 font-sans">Song Title</label>
            <input
              type="text"
              value={songTitle}
              readOnly
              className="p-3 rounded-xl bg-[#20362F] w-full text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-sans">ISWC No</label>
            <input
              type="text"
              value={iswc}
              readOnly
              className="p-3 rounded-xl bg-[#20362F] w-full text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-sans">Release Date</label>
            <input
              type="text"
              value={releaseDate}
              readOnly
              className="p-3 rounded-xl bg-[#20362F] w-full text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-sans">
              Recording Artist(s)
            </label>
            <input
              type="text"
              value={recordingArtists}
              readOnly
              className="p-3 rounded-xl bg-[#20362F] w-full text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-sans">Record Label</label>
            <input
              type="text"
              value={recordLabelFull || label}
              readOnly
              className="p-3 rounded-xl bg-[#20362F] w-full text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-sans">UPC</label>
            <input
              type="text"
              value={upc}
              readOnly
              className="p-3 rounded-xl bg-[#20362F] w-full text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-sans">Type</label>
            <input
              type="text"
              value={type}
              readOnly
              className="p-3 rounded-xl bg-[#20362F] w-full text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-sans">Genre</label>
            <input
              type="text"
              value={genre}
              readOnly
              className="p-3 rounded-xl bg-[#20362F] w-full text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-sans">Duration</label>
            <input
              type="text"
              value={duration}
              readOnly
              className="p-3 rounded-xl bg-[#20362F] w-full text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-sans">Producers</label>
            <input
              type="text"
              value={producers.join(", ")}
              readOnly
              className="p-3 rounded-xl bg-[#20362F] w-full text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-sans">Writers</label>
            <input
              type="text"
              value={writers.join(", ")}
              readOnly
              className="p-3 rounded-xl bg-[#20362F] w-full text-white"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-2 font-sans">Description</label>
            <textarea
              value={description}
              readOnly
              rows={4}
              className="p-3 rounded-xl bg-[#20362F] w-full text-white resize-none"
            />
          </div>
        </div>

        {/* Static Contributors Section */}
        <div className=" text-white mt-5">
          <h2 className="text-2xl font-sans mb-6"></h2>
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <GiVanDammeSplit /> Contributors & Splits
          </h2>
          {/* Contributor 1 */}
          {contributors.map((contributor, idx) => (
            <div
              key={idx}
              className=" rounded-lg space-y-4 mb-8 pb-8 border-b border-gray-800 last:border-0 last:pb-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 font-sans">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="p-3 rounded-xl bg-[#20362F] w-full"
                    value={contributor.fullName}
                    onChange={(e) =>
                      handleContributorChange(idx, "fullName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-sans">
                    Contribution
                  </label>
                  <input
                    type="text"
                    placeholder="Enter contribution"
                    className="p-3 rounded-xl bg-[#20362F] w-full"
                    value={contributor.contribution}
                    onChange={(e) =>
                      handleContributorChange(
                        idx,
                        "contribution",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-sans">Email</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="p-3 rounded-xl bg-[#20362F] w-full"
                    value={contributor.email}
                    onChange={(e) =>
                      handleContributorChange(idx, "email", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-sans">Phone</label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    className="p-3 rounded-xl bg-[#20362F] w-full"
                    value={contributor.phone}
                    onChange={(e) =>
                      handleContributorChange(idx, "phone", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm mb-2 font-sans">
                  Address (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Street address, city, zip code"
                  className="p-3 rounded-xl bg-[#20362F] w-full"
                  value={contributor.address}
                  onChange={(e) =>
                    handleContributorChange(idx, "address", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm mb-2 font-sans">
                    Publisher
                  </label>
                  <input
                    type="text"
                    placeholder="Enter publisher name"
                    className="p-3 rounded-xl bg-[#20362F] w-full"
                    value={contributor.publisher}
                    onChange={(e) =>
                      handleContributorChange(idx, "publisher", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-sans">
                    Affiliation
                  </label>
                  <input
                    type="text"
                    placeholder="Affiliation"
                    className="p-3 rounded-xl bg-[#20362F] w-full"
                    value={contributor.affiliation}
                    onChange={(e) =>
                      handleContributorChange(
                        idx,
                        "affiliation",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-sans">
                    IPI/CAE Number
                  </label>
                  <input
                    type="number"
                    placeholder="Enter IPI/CAE number"
                    className="p-3 rounded-xl bg-[#20362F] w-full"
                    value={contributor.ipiNumber}
                    onChange={(e) =>
                      handleContributorChange(idx, "ipiNumber", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-sans">
                    Percentage Split
                  </label>
                  <input
                    type="number"
                    placeholder="00"
                    className="p-3 rounded-xl bg-[#20362F] w-full"
                    value={contributor.percentage}
                    onChange={(e) =>
                      handleContributorChange(idx, "percentage", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 flex justify-start">
            <button
              onClick={() =>
                setContributors([
                  ...contributors,
                  {
                    fullName: "",
                    contribution: "",
                    email: "",
                    phone: "",
                    address: "",
                    publisher: "",
                    affiliation: "",
                    ipiNumber: "",
                    percentage: "",
                  },
                ])
              }
              className="bg-[#1b2b2e] border border-gray-700 hover:bg-[#25393d] transition-colors text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
            >
              + Add Contributor
            </button>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleDownload}
            className="bg-[#3A5CFF] hover:bg-blue-600 transition-colors text-white px-8 py-3 rounded-xl shadow-lg font-semibold cursor-pointer"
          >
            Download Split Sheet
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplitSheetDetail;
