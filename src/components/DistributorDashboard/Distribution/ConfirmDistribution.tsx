import catalogphoto1 from "@/assets/photo/catalogphoto1.png";
import audioframe1 from "@/assets/photo/audioframe1.svg";
import audioframe2 from "@/assets/photo/audioframe2.svg";
import tenancy from "@/assets/icons/tenancy.svg";
import { FaCircleExclamation } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

import Youtube from "@/assets/icons/youtube.png";
import sportify from "@/assets/icons/sportity.png";
import apple from "@/assets/icons/apple.png";
import soundClud from "@/assets/icons/soundCloud.png";
import audio from "@/assets/icons/audio.png";
import deser from "@/assets/icons/deezer.png";
import tidal from "@/assets/icons/tidal.png";
import heart from "@/assets/icons/heart2.png";
import { Card } from "@/components/ui/card";
// import { SubmissionDetailsData } from "@/redux/features/distribution/distribution.type";
import useControlDispatch from "@/contexts/control/hooks/useControlDispatch";

interface PlatformItem {
  name: string;
  streams: string;
  icon: string;
  iconColor: string;
}

const platformPerformance: PlatformItem[] = [
  {
    name: "YouTube",
    streams: "2.3M Streams",
    icon: Youtube,
    iconColor: "#F2F2F21A",
  },
  {
    name: "Spotify",
    streams: "1.8M Streams",
    icon: sportify,
    iconColor: "#F2F2F21A",
  },
  {
    name: "Apple Music",
    streams: "1.6M Streams",
    icon: apple,
    iconColor: "#F2F2F21A",
  },
  {
    name: "SoundCloud",
    streams: "1.3M Streams",
    icon: soundClud,
    iconColor: "#F2F2F21A",
  },
  {
    name: "Audiomack",
    streams: "900K Streams",
    icon: audio,
    iconColor: "#F2F2F21A",
  },
  {
    name: "Deezer",
    streams: "830K Streams",
    icon: deser,
    iconColor: "#F2F2F21A",
  },
  {
    name: "TIDAL",
    streams: "500K Streams",
    icon: tidal,
    iconColor: "#F2F2F21A",
  },
  {
    name: "iHeartRadio",
    streams: "200K Streams",
    icon: heart,
    iconColor: "#F2F2F21A",
  },
];

const ConfirmDistribution = () => {
  // console.log(data)

  const { closeModal } = useControlDispatch();
  return (
    <div>
      <div className=" w-full text-white   mx-auto">
        <p className="text-2xl font-sans  gap-1">Confirm Distribution</p>

        <div className=" w-full text-white   mx-auto mt-6">
          <div className=" flex items-center justify-between">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={catalogphoto1}
                alt="Album Artwork"
                className="w-[86px] h-[65px] rounded-lg"
              />
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">Electric Nights</h2>
                <p className="text-gray-400">Gemini Chachi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PArt-2 */}
      <div className="space-y-6">
        <div className="gap-8 p-8 rounded-2xl bg-[#0B1D21] space-y-3 border border-[#2F3B40]">
          <h2 className="text-2xl">General Release Information</h2>{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Label Name:</p>
                <p className="font-medium">Marlow</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Catalogue Number: </p>
                <p className="font-medium">ONELS-OOI</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Type: </p>
                <p className="font-medium">Single</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Date: </p>
                <p className="font-medium">20/11/2024</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Distributor: </p>
                <p className="font-medium">Distrokid</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Artist: </p>
                <p className="font-medium">Gemini Chachi</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Artwork Link: </p>
                <p className="font-medium underline text-blue-600">
                  View Artwork
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">UPC: </p>
                <p className="font-medium">797587574636</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Title: </p>
                <p className="font-medium">
                  The World is Yours (feat. LeeLee Babii
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release C Link: </p>
                <p className="font-medium">(c) 2024 Marlow</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release P Link: </p>
                <p className="font-medium">(P) 2024 Marlow</p>
              </div>
            </div>
          </div>
        </div>
        {/* part-2 */}
        <div className="gap-8 p-8 rounded-2xl bg-[#0B1D21] space-y-3 border border-[#2F3B40]">
          <h2 className="text-2xl">Track Details</h2>{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">ISRC: </p>
                <p className="font-medium">US-SIZ-23-00001</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Copyright Holder: </p>
                <p className="font-medium">Marlow</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Language: </p>
                <p className="font-medium">English</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">TikTok Start Time: </p>
                <p className="font-medium">0:15</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 cursor-pointer">
                <img src={audioframe1} alt="" className="w-full sm:w-auto" />
                <img src={audioframe2} alt="" className="w-full sm:w-auto" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Artist: </p>
                <p className="font-medium"> emini Chachi, LeeLee Babii </p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Publishe: </p>
                <p className="font-medium"> Marlow Publishing</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Explicit: </p>
                <p className="font-medium underline text-blue-600">Yes</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Territory: </p>
                <p className="font-medium">None</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Mix/Version: </p>
                <p className="font-medium">BabiiOriginal Mix</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Genre: </p>
                <p className="font-medium">Pop/ R&B</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Original Release </p>
                <p className="font-medium"> Date: 20/11/2024</p>
              </div>
            </div>
          </div>
        </div>
        {/* part-3 */}
        <div className="gap-8 p-8 rounded-2xl bg-[#0B1D21] space-y-3 border border-[#2F3B40]">
          <h2 className="text-2xl">Artist Metadata </h2>{" "}
          <h2 className="text-lg mt-2">Artist: Gemini Chachi </h2>{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Label Name:</p>
                <p className="font-medium">Marlow</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Catalogue Number: </p>
                <p className="font-medium">ONELS-OOI</p>
              </div>

              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Spotify ID: </p>
                <p className="font-medium text-blue-600">
                  spotify:artist:someid
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Distributor: </p>
                <p className="font-medium">Distrokid</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Artist: </p>
                <p className="font-medium">Gemini Chachi</p>
              </div>

              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Spotify ID: </p>
                <p className="font-medium text-blue-600">
                  spotify:artist:someid
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Title: </p>
                <p className="font-medium">The World is Yours</p>
              </div>

              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release P Link: </p>
                <p className="font-medium">(P) 2024 Marlow</p>
              </div>
            </div>
          </div>
          <hr className="text-[#044A20]" />
          <h2 className="text-lg">Artist: LeeLee Babii</h2>{" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Label Name:</p>
                <p className="font-medium">Marlow</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Catalogue Number: </p>
                <p className="font-medium">ONELS-OOI</p>
              </div>

              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Spotify ID: </p>
                <p className="font-medium text-blue-600">
                  spotify:artist:someid
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Distributor: </p>
                <p className="font-medium">Distrokid</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Artist: </p>
                <p className="font-medium">Gemini Chachi</p>
              </div>

              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Spotify ID: </p>
                <p className="font-medium text-blue-600">
                  spotify:artist:someid
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release Title: </p>
                <p className="font-medium">The World is Yours</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="text-[#E5E5E5]">Release C Link: </p>
                <p className="font-medium">(c) 2024 Marlow</p>
              </div>
            </div>
          </div>
        </div>

        {/* Part-4 Distribution Platforms: */}
        <div>
          {/* Platform Performance Section */}
          <div className="mt-[40px] bg-[#0D2223]">
            <Card className="border border-[#c6c6c630]">
              <div className="p-6 space-y-8">
                <h2 className="text-xl font-semibold text-white mb-6">
                  Distribution Platforms:
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 ">
                  {platformPerformance.map((platform, index) => (
                    <div key={index} className="text-center">
                      <div
                        className={`w-12 h-12 ${platform.iconColor} rounded-full flex items-center justify-center mx-auto mb-3`}
                      >
                        <img src={platform.icon} alt="" />
                      </div>
                      <h3 className="text-white font-medium text-sm mb-1">
                        {platform.name}
                      </h3>
                      <p className="text-slate-400 text-xs">
                        {platform.streams}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Last */}
        <div className="w-full sm:w-2/3 flex flex-col sm:flex-row items-start sm:items-center gap-3 p-5 rounded-2xl shadow-2xl bg-[#0F2435] text-white">
          <span className="text-2xl">
            <FaCircleExclamation />
          </span>
          <p className="text-sm sm:text-base">
            Once you confirm, the release will be sent to all selected
            platforms. Make sure all metadata is correct. Distribution typically
            takes 24-48 hours to complete.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          {/* Cancel Button */}
          <button
            onClick={closeModal}
            className="bg-gray-300 text-black px-5 py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer flex justify-center items-center gap-2 w-full sm:w-auto"
          >
            <RxCross2 />
            Cancel
          </button>

          {/* Distribution Button */}
          <button className="bg-[#3A5CFF] text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer flex justify-center items-center gap-2 w-full sm:w-auto">
            <img src={tenancy} alt="" className="h-5 w-5" />
            Confirm Distribution
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDistribution;
