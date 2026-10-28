import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import StatementTable from "./StatementTable";
import { Statement } from "@/redux/features/accounting/accounting.type";

interface MiniComponentProps {
  statements: Statement[];
}

const MiniComponent = ({ statements }: MiniComponentProps) => {
  // Aggregate data by year
  const yearData = useMemo(() => {
    const aggregations: Record<number, number> = {};
    statements.forEach((s) => {
      const year = s.year;
      const amount = parseFloat(s.paymentAmount) || 0;
      aggregations[year] = (aggregations[year] || 0) + amount;
    });

    const sortedYears = Object.keys(aggregations)
      .map(Number)
      .sort((a, b) => b - a);

    return sortedYears.map((year) => ({
      year: year.toString(),
      amount: `$${aggregations[year].toLocaleString()} USD`,
    }));
  }, [statements]);

  const [selectedYear, setSelectedYear] = useState(
    yearData.length > 0
      ? yearData[0].year
      : new Date().getFullYear().toString(),
  );

  const pendingAmount = useMemo(() => {
    const total = statements
      .filter((s) => s.status.toLowerCase() === "pending")
      .reduce((acc, s) => acc + (parseFloat(s.paymentAmount) || 0), 0);
    return total;
  }, [statements]);

  const filteredStatements = useMemo(() => {
    return statements.filter((s) => s.year.toString() === selectedYear);
  }, [statements, selectedYear]);

  return (
    <div className="space-y-9">
      {/* Year Selector + Upload Button */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        {/* Year Selector */}
        <div className="w-full pb-2 grid grid-cols-2 gap-3 sm:flex sm:overflow-x-auto sm:gap-3">
          {yearData.length === 0 ? (
            <div className="text-gray-400 py-3 px-4">No data available</div>
          ) : (
            yearData.map((item) => (
              <div
                key={item.year}
                onClick={() => setSelectedYear(item.year)}
                className={`flex px-3 py-3 justify-center items-center rounded-[12px] 
            border cursor-pointer transition
            ${
              selectedYear === item.year
                ? "border-[#2941B5] bg-[#3A5CFF] text-white"
                : "border-[#636E6B] bg-[#0D2B24] text-white"
            }`}
              >
                <div className="text-center">
                  <h2 className="text-xl font-sans">{item.year}</h2>
                  <p className="text-sm">{item.amount}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right side */}
        <div className="flex flex-col sm:flex-row justify-start items-center gap-3 w-full lg:w-auto">
          <div className="flex flex-1  w-full sm:w-[239px] px-3 py-3 justify-center items-center rounded-[12px] border border-[#D31301] bg-[#211617] text-white">
            <div className="text-center">
              <h2 className="text-xl font-sans text-[#D31301]">
                ${pendingAmount.toLocaleString()}
              </h2>
              <p className="text-sm text-[#D31301]">Pending Payment</p>
            </div>
          </div>

          <Button
            disabled={pendingAmount <= 0}
            className="flex h-[52px] w-full sm:w-auto px-4 justify-center items-center gap-2 rounded-[15px] border border-[rgba(226,232,240,0.30)] bg-[#01D449] text-white text-base sm:text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Request Payment
          </Button>
        </div>
      </div>

      {/* Table (Filtered by Year) */}
      <StatementTable
        statements={filteredStatements}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default MiniComponent;

// import { Button } from "@/components/ui/button";

// const MiniComponent = () => {
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
//           <div className="flex flex-col sm:flex-row justify-start items-center gap-3 w-full lg:w-auto">
//             <div className="flex flex-1  w-full sm:w-[239px] px-3 py-3 justify-center items-center rounded-[12px] border border-[#D31301] bg-[#211617] text-white">
//               <div className="text-center">
//                 <h2 className="text-xl font-sans text-[#D31301]">$2,349</h2>
//                 <p className="text-sm text-[#D31301]">Pending Payment</p>
//               </div>
//             </div>

//             <Button className="flex h-[52px] w-full sm:w-auto px-4 justify-center items-center gap-2 rounded-[15px] border border-[rgba(226,232,240,0.30)] bg-[#01D449] text-white text-base sm:text-lg cursor-pointer">
//               Request Payment
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MiniComponent;
