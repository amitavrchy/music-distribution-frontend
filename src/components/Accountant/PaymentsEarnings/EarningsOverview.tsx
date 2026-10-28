import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import Youtube from "@/assets/icons/youtube.png";
import sportify from "@/assets/icons/sportity.png";
import apple from "@/assets/icons/apple.png";
import soundClud from "@/assets/icons/soundCloud.png";
import audio from "@/assets/icons/audio.png";
import deser from "@/assets/icons/deezer.png";
import tidal from "@/assets/icons/tidal.png";
import heart from "@/assets/icons/heart2.png";
import { useGetPaymentsEarningsQuery } from "@/redux/features/accountant/accountantApi";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";
// Platform icon mapping
const platformIcons: Record<string, string> = {
  YouTube: Youtube,
  Spotify: sportify,
  "Apple Music": apple,
  SoundCloud: soundClud,
  Audiomack: audio,
  Deezer: deser,
  TIDAL: tidal,
  iHeartRadio: heart,
};

const EarningsOverview = () => {
  const { data, isLoading, isError } = useGetPaymentsEarningsQuery();

  if (isLoading) {
    return <ComponentLoader />;
  }

  if (isError || !data?.data) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-red-400 text-lg">
          Error loading earnings overview
        </div>
      </div>
    );
  }

  const earningsOverview = data.data.earningsOverview || [];
  const totalEarnings = data.data.totalPlatformEarnings || "$0";

  // Split the array into two halves for display
  const midpoint = Math.ceil(earningsOverview.length / 2);
  const firstHalf = earningsOverview.slice(0, midpoint);
  const secondHalf = earningsOverview.slice(midpoint);

  return (
    <div className="bg-[#0C201F] border border-[#304240] p-4 sm:p-6 rounded-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Earnings Overview (left side on large, top on small) */}
        <div className="space-y-4 w-full md:w-auto">
          <div className="space-y-4">
            <h1 className="text-2xl font-sans">Earnings Overview</h1>
            <p className="text-base">Total Platform Earnings</p>
          </div>
          <div className="text-5xl font-sans font-bold text-white">
            {totalEarnings}
          </div>
        </div>

        {/*  */}

        <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
          <div className="xl:col-span-4 w-full">
            {/* table */}
            {/* Table Section */}
            <div className="bg-[#1B2A2F] border border-[#304240] p-4 sm:p-6 rounded-2xl w-full overflow-x-auto">
              <h1 className="text-xl font-sans mb-4">Earnings Overview</h1>
              <div>
                <Table className="w-full min-w-[600px]">
                  <TableBody className="text-white">
                    {firstHalf.map((item, index) => {
                      const secondItem = secondHalf[index];
                      return (
                        <TableRow key={index} className="border-none">
                          <TableCell className="px-2 md:px-4 py-1 flex items-center gap-2 md:gap-3">
                            <img
                              src={platformIcons[item.platform] || Youtube}
                              alt={item.platform}
                              className="h-5 w-5 md:h-7 md:w-7"
                            />
                            <div className="flex flex-col">
                              <span>{item.platform}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center px-2 md:px-4 py-1 text-sm md:text-base">
                            {item.amount}
                          </TableCell>
                          {secondItem && (
                            <>
                              <TableCell className="px-2 md:px-4 py-1 flex items-center gap-2 md:gap-3">
                                <img
                                  src={
                                    platformIcons[secondItem.platform] ||
                                    Youtube
                                  }
                                  alt={secondItem.platform}
                                  className="h-5 w-5 md:h-7 md:w-7"
                                />
                                <div className="flex flex-col">
                                  <span>{secondItem.platform}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right pr-4 md:pr-8 py-1 text-sm md:text-base">
                                {secondItem.amount}
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsOverview;
