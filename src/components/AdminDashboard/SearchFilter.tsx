import { IoSearchSharp } from "react-icons/io5";
import { LuSlidersHorizontal } from "react-icons/lu";
import { CiExport } from "react-icons/ci";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFilterClick: () => void;
  onExportClick: () => void;
}

const SearchFilter = ({
  searchTerm,
  onSearchChange,
  onFilterClick,
  onExportClick,
}: SearchFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 md:gap-6 w-full">
      {/* Search Box */}
      <div className="w-full cursor-pointer">
        <div className="flex items-center gap-2 border border-[#B2DDFF] rounded-xl px-4 py-2 bg-white shadow-sm hover:shadow-md transition">
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            className="h-10 flex-grow text-base text-gray-700 placeholder:text-gray-400 bg-transparent outline-none"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <IoSearchSharp className="w-6 h-6 text-xl text-gray-500" />
        </div>
      </div>

      {/* Filter Button */}
      <div className="w-full md:w-auto cursor-pointer">
        <button
          onClick={onFilterClick}
          className="w-full flex justify-between md:justify-center items-center gap-4 border border-[#B2DDFF] px-4 md:px-6 py-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
        >
          <h2 className="text-[#717680] font-dm-sans text-[16px] md:text-[18px] font-medium leading-[24px] md:leading-[28.8px]">
            Filter
          </h2>
          <LuSlidersHorizontal className="text-lg" />
        </button>
      </div>

      {/* Export Button */}
      <div className="w-full md:w-auto">
        <button
          onClick={onExportClick}
          className="w-full flex justify-between md:justify-center items-center gap-4 border border-[#B2DDFF] px-4 md:px-6 py-3 rounded-lg hover:bg-gray-50 transition"
        >
          <h2 className="text-[#717680] font-dm-sans text-[16px] md:text-[18px] font-medium leading-[24px] md:leading-[28.8px]">
            Export
          </h2>
          <CiExport className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;

// import { IoSearchSharp } from "react-icons/io5";
// import { LuSlidersHorizontal } from "react-icons/lu";
// import { CiExport } from "react-icons/ci";

// const SearchFilter = () => {
//   return (
//     <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 md:gap-6 w-full">
//       {/* Search Box */}
//       <div className="w-full">
//         <div className="flex items-center gap-2 border border-[#B2DDFF] rounded-xl px-4 py-2 bg-white shadow-sm hover:shadow-md transition">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="h-10 flex-grow text-base text-gray-700 placeholder:text-gray-400 bg-transparent outline-none"
//             // value={searchTerm}
//             // onChange={handleSearchChange}
//           />
//           <IoSearchSharp className="w-6 h-6 text-xl text-gray-500" />
//         </div>
//       </div>

//       {/* Filter Button */}
//       <div className="w-full md:w-auto">
//         <div className="flex justify-between md:justify-center items-center gap-4 border border-[#B2DDFF] px-4 md:px-6 py-3 rounded-lg">
//           <h2 className="text-[#717680] font-dm-sans text-[16px] md:text-[18px] font-medium leading-[24px] md:leading-[28.8px]">
//             Filter
//           </h2>
//           <button className="p-2 hover:bg-gray-100 rounded-lg">
//             <LuSlidersHorizontal className="text-lg" />
//           </button>
//         </div>
//       </div>

//       {/* Export Button */}
//       <div className="w-full md:w-auto">
//         <div className="flex justify-between md:justify-center items-center gap-4 border border-[#B2DDFF] px-4 md:px-6 py-3 rounded-lg">
//           <h2 className="text-[#717680] font-dm-sans text-[16px] md:text-[18px] font-medium leading-[24px] md:leading-[28.8px]">
//             Export
//           </h2>
//           <button className="p-2 hover:bg-gray-100 rounded-lg">
//             <CiExport className="text-lg" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchFilter;
