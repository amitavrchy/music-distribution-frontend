const StatementHeader = () => {
  return (
    <div className="space-y-9">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="space-y-2">
            <h1 className="text-base font-sans">Accounting</h1>
            <div className="flex justify-start items-center">
              <h1 className="text-2xl md:text-3xl font-sans">Statement</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatementHeader;

// import { FiUpload } from "react-icons/fi";

// const StatementHeader = () => {
//   return (
//     <div className="space-y-9 p-4 md:p-6">
//       {/* Header */}
//       <div className="space-y-6">
//         <div className="flex flex-col md:flex-row md:justify-between md:items-center">
//           <div className="space-y-2">
//             <h1 className="text-base font-sans">Accounting</h1>
//             <div className="flex justify-start items-center">
//               <h1 className="text-2xl md:text-3xl font-sans">Statement</h1>
//             </div>
//           </div>
//         </div>

//         {/* Cards + Right Side */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
//           {/* Left side - Scrollable Cards */}
//           <div className="flex w-full gap-3 overflow-x-auto md:overflow-visible pb-2">
//             <div className="flex min-w-[120px] px-3 py-3 justify-center items-center rounded-[12px] border border-[#2941B5] bg-[#3A5CFF] text-white">
//               <div className="text-center">
//                 <h2 className="text-xl font-sans">2025</h2>
//                 <p className="text-sm">$999.27 USD</p>
//               </div>
//             </div>
//             <div className="flex min-w-[120px] px-3 py-3 justify-center items-center rounded-[12px] border border-[#636E6B] bg-[#0D2B24] text-white">
//               <div className="text-center">
//                 <h2 className="text-xl font-sans">2024</h2>
//                 <p className="text-sm">$1,249.15 USD</p>
//               </div>
//             </div>
//             <div className="flex min-w-[120px] px-3 py-3 justify-center items-center rounded-[12px] border border-[#636E6B] bg-[#0D2B24] text-white">
//               <div className="text-center">
//                 <h2 className="text-xl font-sans">2023</h2>
//                 <p className="text-sm">$879.45 USD</p>
//               </div>
//             </div>
//             <div className="flex min-w-[120px] px-3 py-3 justify-center items-center rounded-[12px] border border-[#636E6B] bg-[#0D2B24] text-white">
//               <div className="text-center">
//                 <h2 className="text-xl font-sans">2022</h2>
//                 <p className="text-sm">$799.99 USD</p>
//               </div>
//             </div>
//           </div>

//           {/* Right side */}
//           <div>
//             <button
//               className="w-full sm:w-full md:w-[240px] h-12 flex items-center justify-center gap-2
//                rounded-[15px] border border-[rgba(226,232,240,0.30)]
//                bg-[#17171A] shadow-sm
//                hover:border-[#3A5CFF] hover:bg-[#1E1E22]
//                focus:border-[#3A5CFF] focus:ring-2 focus:ring-[#3A5CFF]/50 cursor-pointer"
//             >
//               <FiUpload className="" size={18} />
//               Upload Report
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatementHeader;
