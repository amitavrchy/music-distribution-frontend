import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import camera from "@/assets/icons/audio.svg";
import { TopAsset } from "@/redux/features/analytics/analytics.type";

interface TopAssetsProps {
  data?: TopAsset[];
}

export function TopAssets({ data }: TopAssetsProps) {
  return (
    <div className="bg-[#0C2322] border border-[#313E41] rounded-2xl shadow-sm p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg md:text-2xl font-medium text-white">
            Top Assets
          </h1>
        </div>
        <div>
          <button className="text-sm md:text-base text-[#3A5CFF] hover:text-[#052fff] font-medium cursor-pointer hover:underline">
            Assets
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full min-w-[400px] md:min-w-full">
          <TableHeader>
            <TableRow className="text-[#BDBDBD]">
              <TableHead className="w-[160px] md:w-[200px] px-2 md:px-4 py-2">
                Assetss
              </TableHead>
              <TableHead className="text-right pr-4 md:pr-8 py-2">
                Estimated Earnings
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-white">
            {data && data.length > 0 ? (
              data.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="px-2 md:px-4 py-3 flex items-center gap-2 md:gap-3">
                    <img
                      src={camera}
                      alt=""
                      className="h-5 w-5 md:h-7 md:w-7"
                    />
                    <span className="truncate max-w-[100px] md:max-w-none">
                      {item.title}
                    </span>
                  </TableCell>
                  <TableCell className="text-right pr-4 md:pr-8 py-3">
                    {item.earnings}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="text-center py-4 text-[#BDBDBD]"
                >
                  No assets data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
