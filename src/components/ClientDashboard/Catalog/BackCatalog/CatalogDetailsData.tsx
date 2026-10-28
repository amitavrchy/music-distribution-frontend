import catalogphoto1 from "@/assets/photo/catalogphoto1.png";
import MiniTitle from "../../Shared/MiniTitle";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleBackCatalogueQuery } from "@/redux/features/newRelease/newReleaseApi";
import { useGetSingleAdminBackCatalogueQuery } from "@/redux/features/admin/adminApi";
import { FaRegPlayCircle, FaAngleLeft } from "react-icons/fa";
import { useAppSelector } from "@/redux/hooks/redux-hook";
import { format } from "date-fns";
import { exportToExcel } from "@/utils/exportUtils";

const CatalogDetailsData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = useAppSelector((state) => state.auth.user?.role);
  const isAdmin =
    role === "ADMIN" || role === "SUPER_ADMIN" || role === "DISTRIBUTOR";

  const {
    data: clientResponse,
    isLoading: isLoadingClient,
    isError: isErrorClient,
  } = useGetSingleBackCatalogueQuery(id, { skip: isAdmin });

  const {
    data: adminResponse,
    isLoading: isLoadingAdmin,
    isError: isErrorAdmin,
  } = useGetSingleAdminBackCatalogueQuery(id, { skip: !isAdmin });

  const response = isAdmin ? adminResponse : clientResponse;
  const isLoading = isAdmin ? isLoadingAdmin : isLoadingClient;
  const isError = isAdmin ? isErrorAdmin : isErrorClient;

  if (isLoading) {
    return <div className="text-white text-center p-10">Loading...</div>;
  }

  if (isError || !response?.success) {
    return (
      <div className="text-white text-center p-10 font-bold">
        Error loading catalogue details.
      </div>
    );
  }

  const catalogue = response.data;
  const release = catalogue.release || {};

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch {
      return dateString;
    }
  };

  const handleExport = () => {
    if (!catalogue) return;

    const exportData = [
      {
        "Catalogue Number": catalogue.catalogueNumber,
        "Release Title": catalogue.releaseTitle || release.releaseTitle,
        "Release Artist":
          catalogue.releaseArtist || release.albumLevelArtistName,
        "Label Name": catalogue.labelName || release.labelName,
        "Release Type": catalogue.releaseType || release.typeOfRelease,
        "Release Date": formatDate(
          catalogue.releaseDate || release.releaseDate,
        ),
        Distributor: catalogue.distributor,
        UPC: catalogue.upc,
        "C Line": catalogue.releaseCLine,
        "P Line": catalogue.releasePLine,
        ISRC: release.isrc,
        "Copyright Holder": release.copyrightHolder,
        Language: release.language,
        Explicit: release.isExplicitContent ? "Yes" : "No",
        Genre: release.genre,
        "Producer Credits": release.producerCredits,
        "Lyricist Credits": release.lyricistCredits,
        "Master Splits": release.masterSplits,
        "Additional Details": release.additionalDetails,
      },
    ];

    exportToExcel(
      exportData,
      `Back_Catalog_${catalogue.releaseTitle || "Export"}_${new Date().toISOString().split("T")[0]}.xlsx`,
    );
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <div className="flex justify-start">
        <button
          onClick={() => {
            if (role === "DISTRIBUTOR") {
              navigate("/distributor-dashboard/back-catalog");
            } else if (role === "ADMIN") {
              navigate("/admin/catalog/back-catalog");
            } else if (role === "SUPER_ADMIN") {
              navigate("/super-admin-dashboard/back-catalog");
            } else {
              navigate("/client-dashboard/catalog/back-catalog");
            }
          }}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition cursor-pointer"
        >
          <FaAngleLeft size={18} />
          <span>Back To Catalog</span>
        </button>
      </div>

      {/* Header Section */}
      <div className="w-full text-white mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <img
            src={release.imageUrl || catalogphoto1}
            alt="Album Artwork"
            className="w-32 h-32 md:w-40 md:h-40 rounded-lg object-cover shadow-2xl"
          />

          <div className="text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-bold">
              {catalogue.releaseTitle}
            </h2>
            <p className="text-xl text-gray-400 mt-1">
              {catalogue.releaseArtist}
            </p>
            <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-4">
              <button
                onClick={handleExport}
                className="px-6 py-2 bg-green-600 rounded-lg text-white font-medium hover:bg-green-700 transition-colors cursor-pointer"
              >
                Export Data
              </button>
              {/* <button className="px-6 py-2 bg-[#1b2b2e] border border-gray-700 rounded-lg text-white font-medium hover:bg-[#25393d] transition-colors cursor-pointer">
                Edit Metadata
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Details */}
      <div className="space-y-8">
        {/* General Release Information */}
        <section className="space-y-4">
          <MiniTitle title="General Release Information" />
          <div className="p-8 rounded-2xl bg-[#0B1D21] border border-[#2F3B40]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
              <div className="space-y-4">
                <DetailRow
                  label="Label Name"
                  value={catalogue.labelName || release.labelName}
                />
                <DetailRow
                  label="Catalogue Number"
                  value={catalogue.catalogueNumber}
                />
                <DetailRow
                  label="Release Type"
                  value={catalogue.releaseType || release.typeOfRelease}
                />
                <DetailRow
                  label="Release Date"
                  value={formatDate(
                    catalogue.releaseDate || release.releaseDate,
                  )}
                />
              </div>

              <div className="space-y-4">
                <DetailRow label="Distributor" value={catalogue.distributor} />
                <DetailRow
                  label="Release Artist"
                  value={
                    catalogue.releaseArtist || release.albumLevelArtistName
                  }
                />
                <div className="flex justify-start gap-2">
                  <p className="text-[#E5E5E5] min-w-[120px]">Artwork Link:</p>
                  <a
                    href={release.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline text-blue-500 hover:text-blue-400"
                  >
                    View Artwork
                  </a>
                </div>
                <DetailRow label="UPC" value={catalogue.upc} />
              </div>

              <div className="space-y-4">
                <DetailRow
                  label="Release Title"
                  value={catalogue.releaseTitle || release.releaseTitle}
                />
                <DetailRow
                  label="Release C Line"
                  value={catalogue.releaseCLine}
                />
                <DetailRow
                  label="Release P Line"
                  value={catalogue.releasePLine}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Track Details */}
        <section className="space-y-4">
          <MiniTitle title="Track Details" />
          <div className="p-8 rounded-2xl bg-[#0B1D21] border border-[#2F3B40]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
              <div className="space-y-4">
                <DetailRow label="ISRC" value={release.isrc} />
                <DetailRow
                  label="Copyright Holder"
                  value={release.copyrightHolder}
                />
                <DetailRow label="Language" value={release.language} />
                <DetailRow label="TikTok Time" value="0:15" />
                <div className="pt-2">
                  {release.musicFileLink && (
                    <a
                      href={release.musicFileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-400 group"
                    >
                      <FaRegPlayCircle className="text-2xl group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Listen Track</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <DetailRow
                  label="Display Artist"
                  value={release.albumLevelArtistName}
                />
                <DetailRow label="Publisher" value="N/A" />
                <DetailRow
                  label="Explicit"
                  value={release.isExplicitContent ? "Yes" : "No"}
                />
                <DetailRow label="Territory" value="Worldwide" />
              </div>

              <div className="space-y-4">
                <DetailRow label="Mix/Version" value="Original Mix" />
                <DetailRow label="Genre" value={release.genre} />
                <DetailRow
                  label="Released"
                  value={formatDate(release.releaseDate)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Artist Credits / Metadata */}
        <section className="space-y-4">
          <MiniTitle title="Artist Credits & Metadata" />
          <div className="p-8 rounded-2xl bg-[#0B1D21] border border-[#2F3B40]">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DetailRow
                  label="Producer Credits"
                  value={release.producerCredits}
                />
                <DetailRow
                  label="Lyricist Credits"
                  value={release.lyricistCredits}
                />
                <DetailRow label="Master Splits" value={release.masterSplits} />
              </div>

              {release.additionalDetails && (
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-[#E5E5E5] mb-2">Additional Details:</p>
                  <p className="text-gray-300 bg-[#071315] p-4 rounded-lg">
                    {release.additionalDetails}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

interface DetailRowProps {
  label: string;
  value?: string | number | null;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
  <div className="flex justify-start gap-2">
    <p className="text-[#E5E5E5] min-w-[120px]">{label}:</p>
    <p className="font-medium text-white">{value || "N/A"}</p>
  </div>
);

export default CatalogDetailsData;
