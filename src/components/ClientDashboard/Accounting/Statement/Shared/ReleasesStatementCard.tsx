import { StatementDetail } from "@/redux/features/accounting/accounting.type";
import { format } from "date-fns";

const ReleasesStatementCard = ({
  statement,
}: {
  statement: StatementDetail;
}) => {
  if (!statement) return null;

  const monthName = format(
    new Date(statement.statementYear, statement.statementMonth - 1),
    "MMMM",
  );
  const issuedOn = statement.issuedOn
    ? format(new Date(statement.issuedOn), "MMM dd, yyyy")
    : "N/A";
  const paidOn = statement.paidOn
    ? format(new Date(statement.paidOn), "MMM dd, yyyy")
    : "Pending";

  return (
    <div className="w-full mx-auto bg-[#0F1F23] p-6 rounded-lg shadow-lg text-white space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-1">
        {monthName} {statement.statementYear} Statement
      </h2>
      <p className="text-xs sm:text-sm text-gray-400">Issued On: {issuedOn}</p>
      <p className="text-xs sm:text-sm text-gray-400 mb-4">Paid On: {paidOn}</p>

      <p className="text-xs sm:text-sm text-gray-300 mb-6">
        There is typically a delay between when streams or activities occur and
        when payments are made. This statement may reflect your activity from 1
        to 4 months ago, depending on when DSPs send us their reports.
      </p>

      <div className="border-t border-gray-600 pt-4 space-y-3">
        <p className="flex justify-between items-center text-sm sm:text-base">
          <span className="font-sans text-[#BDBDBD]">Earnings:</span> +$
          {statement.totalEarnings}
        </p>
        <p className="flex justify-between items-center text-sm sm:text-base">
          <span className="font-sans text-[#BDBDBD]">Expenses:</span> $
          {statement.totalExpenses}
        </p>
        <p className="flex justify-between items-center text-sm sm:text-base mb-4">
          <span className="font-sans text-[#BDBDBD]">Your Payment:</span> $
          {statement.payment}
        </p>

        <div className="border-t border-gray-600 pt-4 space-y-3">
          <p className="flex justify-between items-center text-sm sm:text-base">
            <span className="font-sans text-[#BDBDBD]">Closing Balance:</span> $
            {statement.closingBalance}
          </p>
          <p className="flex justify-between items-center text-sm sm:text-base">
            <span className="font-sans text-[#BDBDBD]">Status:</span>
            <span
              className={`${
                statement.status === "Paid"
                  ? "text-green-500"
                  : "text-yellow-500"
              } font-medium`}
            >
              {statement.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReleasesStatementCard;

// const ReleasesStatementCard = () => {

//   return (
//     <div className=" w-full  mx-auto bg-dark-blue p-6 rounded-lg shadow-lg text-white bg-[#0F1F23] space-y-4">
//       <h2 className="text-xl font-semibold mb-2">July 2025 Statement</h2>
//       <p className="text-sm text-gray-400">Issued On: Jul 24, 2025</p>
//       <p className="text-sm text-gray-400 mb-4">Paid On: Aug 11, 2025</p>

//       <p className="text-sm text-gray-300 mb-6">
//         There is typically a delay between when streams or activities occur and
//         when payments are made. This statement may reflect your activity from 1
//         to 4 months ago, depending on when DSP’s send us their reports.
//       </p>

//       <div className="border-t border-gray-600 mt-4 pt-4 space-y-3">
//         <p className="text-base text-white flex justify-between items-center ">
//           <span className="font-sans text-[#BDBDBD]">Earnings:</span> +$382.19
//         </p>
//         <p className="text-sm text-white flex justify-between items-center">
//           <span className="font-sans text-[#BDBDBD]">Expenses:</span> $0.00
//         </p>
//         <p className="text-sm text-white flex justify-between items-center mb-4">
//           <span className="font-sans text-[#BDBDBD]">Your Payment:</span>{" "}
//           $382.19
//         </p>

//         <div className="border-t border-gray-600 pt-4 space-y-3">
//           <p className="text-sm text-white flex justify-between items-center">
//             <span className="font-sans text-[#BDBDBD]">Closing Balance:</span>{" "}
//             $0.00
//           </p>
//           <p className="text-sm text-white flex justify-between items-center ">
//             <span className="font-sans text-[#BDBDBD]">Status:</span>{" "}
//             <span className="text-green-500">Paid</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReleasesStatementCard;
