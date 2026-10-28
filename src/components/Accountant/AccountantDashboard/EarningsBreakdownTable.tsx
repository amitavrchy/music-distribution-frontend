import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";

import Youtube from "@/assets/icons/youtube.png";
import sportify from "@/assets/icons/sportity.png";
import apple from "@/assets/icons/apple.png";
import soundClud from "@/assets/icons/soundCloud.png";
import audio from "@/assets/icons/audio.png";
import deser from "@/assets/icons/deezer.png";
import tidal from "@/assets/icons/tidal.png";
import heart from "@/assets/icons/heart2.png";

import { Button } from "@/components/ui/button";
import { useGetAccountantDashboardQuery } from "@/redux/features/accountant/accountantApi";

// Platform icon mapping
const platformIcons: Record<string, string> = {
  YouTube: Youtube,
  Spotify: sportify,
  AppleMusic: apple,
  SoundCloud: soundClud,
  Audiomack: audio,
  Deezer: deser,
  TIDAL: tidal,
  iHeartRadio: heart,
};

export function EarningsBreakdownTable() {
  const { data, isLoading, isError } = useGetAccountantDashboardQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-white text-lg">Loading earnings breakdown...</div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-red-400 text-lg">
          Error loading earnings breakdown
        </div>
      </div>
    );
  }

  const earningsBreakdown = data.data.earningsBreakdown || [];
  const pendingPayment = data.data.pendingPaymentAmount || "$0.00";

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left side - Title */}
        <h1 className="text-base sm:text-lg md:text-2xl font-medium text-white">
          Assets
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
                    Gross Earnings
                  </TableHead>
                  <TableHead className="text-center px-2 md:px-4 py-2">
                    Comission
                  </TableHead>

                  <TableHead className="text-right pr-4 md:pr-8 py-2">
                    Net Earnings
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-white">
                {earningsBreakdown.length > 0 ? (
                  earningsBreakdown.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-2 md:px-4 py-3 flex items-center gap-2 md:gap-3">
                        <img
                          src={platformIcons[item.platform] || Youtube}
                          alt={item.platform}
                          className="h-5 w-5 md:h-7 md:w-7"
                        />
                        <div className="flex flex-col">
                          <span>{item.platform}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center px-2 md:px-4 py-3 text-sm md:text-base">
                        {item.grossEarnings}
                      </TableCell>
                      <TableCell className="text-center px-2 md:px-4 py-3 text-sm md:text-base">
                        {item.commission}
                      </TableCell>

                      <TableCell className="text-right pr-4 md:pr-8 py-3 text-sm md:text-base">
                        {item.netEarnings}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-12 text-gray-400"
                    >
                      No earnings data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div className="bg-[#0E1F22] border border-[#2E3A42] p-4 rounded-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Text Section */}
          <div className="space-y-6">
            <h3>Pending Payments</h3>
            <h3>
              Pending Payment:{" "}
              <span className="text-[#01D449]">{pendingPayment}</span>
            </h3>
          </div>

          {/* Button */}
          <Button className="w-full md:w-auto text-base bg-[#01D449] hover:bg-[#026322] text-white px-6 py-3 h-12 gap-2 rounded-[15px] shadow-lg transition-all duration-200 cursor-pointer">
            <PiCurrencyDollarSimpleBold />
            Proceed Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
