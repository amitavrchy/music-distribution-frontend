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
    id: "10001",
    assetsName: "Women Dominated Cypher 2021 (Official Cypher)",
    name: "Gemini Chachi",
    views: "12,540",
    adSupported: "$120.00",
    premium: "$230.00",
    earning: "$350.00",
    image: camera,
  },
  {
    id: "10002",
    assetsName: "Active",
    name: "DJ Nova",
    views: "8,940",
    adSupported: "$90.00",
    premium: "$260.00",
    earning: "$350.00",
    image: camera,
  },
  {
    id: "10003",
    assetsName: "Gang About You (Live Performance)",
    name: "Auntie House",
    views: "15,320",
    adSupported: "$150.00",
    premium: "$200.00",
    earning: "$350.00",
    image: camera,
  },
  {
    id: "10004",
    assetsName: "Lost It (Official Grannie House Performance)",
    name: "Celia Dawn",
    views: "10,780",
    adSupported: "$170.00",
    premium: "$180.00",
    earning: "$350.00",
    image: camera,
  },
  {
    id: "10005",
    assetsName: "OOH YEA",
    name: "Auntie House",
    views: "9,210",
    adSupported: "$130.00",
    premium: "$220.00",
    earning: "$350.00",
    image: camera,
  },
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
  {
    id: "10008",
    assetsName: "Midnight Flow",
    name: "Gemini Chachi",
    views: "7,860",
    adSupported: "$100.00",
    premium: "$250.00",
    earning: "$350.00",
    image: camera,
  },
  {
    id: "10009",
    assetsName: "Golden Hour Symphony",
    name: "Celia Dawn",
    views: "16,230",
    adSupported: "$160.00",
    premium: "$190.00",
    earning: "$350.00",
    image: camera,
  },
  {
    id: "10010",
    assetsName: "Rolling Vibes",
    name: "DJ Nova",
    views: "8,450",
    adSupported: "$120.00",
    premium: "$230.00",
    earning: "$350.00",
    image: camera,
  },
  {
    id: "10011",
    assetsName: "Electric Heartbeat",
    name: "Luna Sparks",
    views: "14,600",
    adSupported: "$150.00",
    premium: "$200.00",
    earning: "$350.00",
    image: camera,
  },
  {
    id: "10012",
    assetsName: "Ocean Breeze",
    name: "Auntie House",
    views: "9,950",
    adSupported: "$130.00",
    premium: "$220.00",
    earning: "$350.00",
    image: camera,
  },
  {
    id: "10013",
    assetsName: "Shadow Lights (Acoustic)",
    name: "Celia Dawn",
    views: "12,870",
    adSupported: "$140.00",
    premium: "$210.00",
    earning: "$350.00",
    image: camera,
  },
  {
    id: "10014",
    assetsName: "Neon Streets",
    name: "DJ Blaze",
    views: "10,320",
    adSupported: "$120.00",
    premium: "$230.00",
    earning: "$350.00",
    image: camera,
  },
  {
    id: "10015",
    assetsName: "Dream Catcher",
    name: "Gemini Chachi",
    views: "17,110",
    adSupported: "$170.00",
    premium: "$180.00",
    earning: "$350.00",
    image: camera,
  },
];

export function DSPsDetailsTable() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left side - Title */}
        <h1 className="text-base sm:text-lg md:text-2xl font-medium text-white">
          Contract Accounts / DSPs Status
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
