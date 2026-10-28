import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import download from "@/assets/icons/photo.png";
import { useAppSelector } from "@/redux/hooks/redux-hook";

// Interface for Release data from API
export interface Release {
  releaseId: string;
  releaseTitle: string;
  typeOfRelease: string;
  releaseDate: string;
  status: string;
  artistName: string;
  createdAt: string;
}

interface TableHereProps {
  releases: Release[];
}

// Main Table Component
const TableHere = ({ releases }: TableHereProps) => {
  const navigate = useNavigate();
  const role = useAppSelector((state) => state.auth.user?.role);

  const goToDetails = (id: string) => {
    if (role === "DISTRIBUTOR") {
      navigate(`/distributor-dashboard/catalog/releases/${id}`);
    } else if (role === "CLIENT") {
      navigate(`/client-dashboard/catalog/releases/${id}`);
    } else if (role === "ADMIN") {
      navigate(`/admin/catalog/releases/${id}`);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full min-w-[1000px]">
        {/* Table Header */}
        <TableHeader>
          <TableRow className="text-[#BDBDBD] text-sm md:text-base hover:bg-transparent">
            <TableHead className="w-[250px] px-4 py-2">Title</TableHead>
            <TableHead className="px-4 py-2">Type</TableHead>
            <TableHead className="px-4 py-2">Release Date</TableHead>
            <TableHead className="px-4 py-2">Status</TableHead>
            <TableHead className="text-right px-4 py-2">Action</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody className="text-white">
          {releases?.length > 0 ? (
            releases.map((release) => (
              <TableRow
                key={release.releaseId}
                className="border-b border-gray-800 hover:bg-[#1F1F21] cursor-pointer"
                onClick={() => goToDetails(release.releaseId)}
              >
                {/* Title & Artist */}
                <TableCell className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={download}
                    alt=""
                    className="h-8 w-8 md:h-10 md:w-10 rounded object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm md:text-base font-medium text-white">
                      {release.releaseTitle}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500">
                      {release.artistName}
                    </span>
                  </div>
                </TableCell>

                {/* Type */}
                <TableCell className="px-4 py-3 text-sm md:text-base text-gray-400">
                  {release.typeOfRelease}
                </TableCell>

                {/* Release Date */}
                <TableCell className="px-4 py-3 text-sm md:text-base text-gray-400">
                  {new Date(release.releaseDate).toLocaleDateString()}
                </TableCell>

                {/* Status */}
                <TableCell className="px-4 py-3">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium ${
                      release.status === "Draft"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-[#0E261F] text-[#01D449]"
                    }`}
                  >
                    {release.status}
                  </span>
                </TableCell>

                {/* Arrow Action */}
                <TableCell className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <FaChevronRight className="w-4 h-4 text-[#3A5CFF]" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-10 text-gray-500"
              >
                No releases found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableHere;

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import download from "@/assets/icons/photo.png";
// import { useNavigate } from "react-router-dom";
// import { FaChevronRight } from "react-icons/fa";

// const productData = [
//   {
//     id: "10001",
//     assetsName: "Stand on Dat",
//     name: "K Shiday",
//     upc: "UPC: 723277809397",
//     type: "Single EP Album",
//     releaseDate: "01/01/23",
//     amount: "$350.00 USD",
//     status: "Live",
//     image: download,
//   },
//   {
//     id: "10002",
//     assetsName: "Handle Me",
//     name: "K Shiday",
//     upc: "UPC: 823377819398",
//     type: "Single EP Album",
//     releaseDate: "02/15/23",
//     amount: "$350.00 USD",
//     status: "Live",
//     image: download,
//   },
//   {
//     id: "10003",
//     assetsName: "Cater 2 You",
//     name: "Auntie House",
//     upc: "UPC: 923477829399",
//     type: "Single EP Album",
//     releaseDate: "03/12/23",
//     amount: "$350.00 USD",
//     status: "Live",
//     image: download,
//   },
//   {
//     id: "10004",
//     assetsName: "No Music",
//     name: "K Shiday",
//     upc: "UPC: 673277809111",
//     type: "Single EP Album",
//     releaseDate: "04/20/23",
//     amount: "$350.00 USD",
//     status: "Live",
//     image: download,
//   },
//   {
//     id: "10005",
//     assetsName: "OOH YEA",
//     name: "K Shiday",
//     upc: "UPC: 573277809222",
//     type: "Single EP Album",
//     releaseDate: "05/09/23",
//     amount: "$350.00 USD",
//     status: "Live",
//     image: download,
//   },
// ];

// const TableHere = () => {
//   const navigate = useNavigate();

//   const goToDetails = (id: string) => {
//     navigate(`/statement/${id}`); // Navigate to details page
//   };

//   return (
//     <div className="overflow-x-auto">
//       <Table className="w-full min-w-[1000px]">
//         <TableHeader>
//           <TableRow className="text-[#BDBDBD] text-sm md:text-base">
//             <TableHead className="w-[200px] px-2 md:px-4 py-2">Title</TableHead>
//             <TableHead className="px-2 md:px-4 py-2">UPC</TableHead>
//             <TableHead className="px-2 md:px-4 py-2">Type</TableHead>
//             <TableHead className="px-2 md:px-4 py-2">Release Date</TableHead>
//             <TableHead className="text-right pr-4 md:pr-8 py-2">
//               Payment Amount (USD)
//             </TableHead>
//             <TableHead className="text-right pr-4 md:pr-8 py-2">
//               Status
//             </TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody className="text-white">
//           {productData.map((product) => (
//             <TableRow key={product.id}>
//               {/* Title & Artist */}
//               <TableCell className="px-2 md:px-4 py-3 flex items-center gap-2 md:gap-3">
//                 <img
//                   src={product.image}
//                   alt=""
//                   className="h-5 w-5 md:h-7 md:w-7"
//                 />
//                 <div className="flex flex-col">
//                   <span className="text-sm md:text-base">
//                     {product.assetsName}
//                   </span>
//                   <span className="text-xs md:text-sm text-gray-500">
//                     {product.name}
//                   </span>
//                 </div>
//               </TableCell>

//               {/* UPC */}
//               <TableCell className="text-sm md:text-base text-gray-400">
//                 {product.upc}
//               </TableCell>

//               {/* Type */}
//               <TableCell className="text-sm md:text-base text-gray-400">
//                 {product.type}
//               </TableCell>

//               {/* Release Date */}
//               <TableCell className="text-sm md:text-base text-gray-400">
//                 {product.releaseDate}
//               </TableCell>

//               {/* Payment Amount */}
//               <TableCell className="text-right pr-4 md:pr-8 py-3 text-sm md:text-base">
//                 {product.amount}
//               </TableCell>

//               {/* Status + Arrow */}
//               <TableCell
//                 className="text-right pr-4 md:pr-8 py-3 text-sm md:text-base font-medium flex items-center justify-end gap-2 cursor-pointer hover:text-blue-500"
//                 onClick={() => goToDetails(product.id)}
//               >
//                 <span className="bg-[#0E261F] text-[#01D449] px-4 py-2 rounded-full text-xs md:text-sm font-medium">
//                   {product.status}
//                 </span>
//                 <FaChevronRight className="w-4 h-4 text-[#3A5CFF]" />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default TableHere;
