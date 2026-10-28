import { FiDownload } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const StatementDetails = () => {
  return (
    <div className="space-y-9">
      {/* Responsive Container */}
      <Link to="/client-dashboard/accounting/statement">
        <div className="flex items-center gap-3 text-white text-lg font-sans cursor-pointer hover:text-blue-200">
          <IoIosArrowBack />
          <h2>Back To Statement</h2>
        </div>
      </Link>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-5">
        {/* Title & Icon */}
        <div className="space-y-2">
          <h1 className="text-base font-sans">Accounting </h1>
          <div className="flex justify-start items-center gap-2">
            <h1 className="text-2xl font-sans">Statement Details</h1>
          </div>
        </div>

        {/* Download Report  */}
        <button className="bg-[#17171A] text-white py-2 px-4 text-xl rounded-lg shadow-2xl h-12 flex items-center justify-center gap-2 hover:bg-black focus:outline-none transition-colors cursor-pointer">
          <FiDownload className="w-6 h-6" />
          Download Report
        </button>
      </div>
    </div>
  );
};

export default StatementDetails;
