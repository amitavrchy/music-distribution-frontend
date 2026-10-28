import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import camera from "@/assets/icons/download.svg";

const productData = [
  {
    id: "10006",
    assetsName: "Skyline Dreams",
    name: "Luna Sparks",
    views: "11,400",
    adSupported: "$110.00",
    premium: "$240.00",
    earning: "$350.00",
    image: camera,
  },
  {
    id: "10007",
    assetsName: "Fire Beats (Remix)",
    name: "DJ Blaze",
    views: "13,750",
    adSupported: "$140.00",
    premium: "$210.00",
    earning: "$350.00",
    image: camera,
  },
];

export function ReleasesDetailsTable() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left side - Title */}
        <h1 className="text-base sm:text-lg md:text-2xl font-medium text-white">
          Contract Accounts / Releases Status
        </h1>
      </div>

      {/* Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-4 w-full">
          {/* responsive part */}
          <div className="overflow-x-auto">
            <Table className="w-full min-w-[600px]">
              <TableHeader>
                <TableRow className="text-[#BDBDBD] text-sm md:text-base">
                  <TableHead className="w-[200px] px-2 md:px-4 py-2">
                    Title
                  </TableHead>
                  <TableHead className="text-center px-2 md:px-4 py-2">
                    Views
                  </TableHead>
                  <TableHead className="text-center px-2 md:px-4 py-2">
                    AD Supported
                  </TableHead>
                  <TableHead className="text-center px-2 md:px-4 py-2">
                    YouTube Premium
                  </TableHead>
                  <TableHead className="text-right pr-4 md:pr-8 py-2">
                    Total Earning
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-white">
                {productData.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="px-2 md:px-4 py-3 flex items-center gap-2 md:gap-3">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-center px-2 md:px-4 py-3 text-sm md:text-base">
                      {product.views}
                    </TableCell>
                    <TableCell className="text-center px-2 md:px-4 py-3 text-sm md:text-base">
                      {product.adSupported}
                    </TableCell>
                    <TableCell className="text-center px-2 md:px-4 py-3 text-sm md:text-base">
                      {product.premium}
                    </TableCell>
                    <TableCell className="text-right pr-4 md:pr-8 py-3 text-sm md:text-base">
                      {product.earning}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
