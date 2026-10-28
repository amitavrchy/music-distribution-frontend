import catalogphoto1 from "@/assets/photo/catalogphoto1.png";
import { FaAngleLeft, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MdOutlineFileDownload, MdOutlineMessage } from "react-icons/md";
import audioframe from "@/assets/photo/audioframe.png";
import { RxCrossCircled } from "react-icons/rx";

import Youtube from "@/assets/icons/youtube.png";
import sportify from "@/assets/icons/sportity.png";
import apple from "@/assets/icons/apple.png";
import soundClud from "@/assets/icons/soundCloud.png";
import audio from "@/assets/icons/audio.png";
import deser from "@/assets/icons/deezer.png";
import tidal from "@/assets/icons/tidal.png";
import heart from "@/assets/icons/heart2.png";
import { Card } from "@/components/ui/card";

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

const DistributeNow = () => {
  return (
    <div className="space-y-4">
      <Link to="/distributor-dashboard/submissions">
        <p className="text-sm font-sans cursor-pointer hover:text-[#E5E5E5] flex items-center gap-1">
          <FaAngleLeft />
          Back To Submissions
        </p>
      </Link>

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
          <div>
            <Button className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 p-2 cursor-pointer mt-6">
              <MdOutlineMessage />
              Message Artist
            </Button>
          </div>
        </div>
      </div>
      {/* PArt-2 */}
      <div className="space-y-6">
        <div className="gap-8 p-8 rounded-2xl bg-[#0B1D21] space-y-3 border border-[#2F3B40]">
          <h2 className="text-2xl">Release Distribution Details</h2>
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
        <div className=" p-8 rounded-2xl bg-[#0B1D21] space-y-6 border border-[#2F3B40]">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">Split Sheet Information</h2>
            <Button className="bg-[#01D449] hover:bg-[#026322] text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 cursor-pointer">
              <MdOutlineFileDownload className="" />
              Split Sheet
            </Button>
          </div>
          <div className=" bg-[#0D1A25] border border-[#2E3A42] p-4 rounded-2xl">
            <div className=" flex justify-between items-center">
              <h3>Split Sheet Code</h3>
              <h3>Generated Date</h3>
            </div>
            <div className=" flex justify-between items-center">
              <h3>SS-123456</h3>
              <h3>August 20, 2024</h3>
            </div>
          </div>
        </div>
        {/* part-3 */}
        {/* <div className="gap-8 p-8 rounded-2xl bg-[#0B1D21] space-y-3 border border-[#2F3B40]">
          <h2 className="text-2xl font-sans">Track & Contributor Details </h2>


          <hr className="text-[#044A20]" />
        </div> */}
        <div className="  ">
          {/* Track & Contributor Details */}
          <div className="bg-[#0B1D21] rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-6">
              Track & Contributor Details
            </h2>

            {/* Track 1 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex justify-start items-center gap-3">
                  <span className="bg-[#122939] text-white px-4 py-2 rounded-lg text-sm">
                    Track - 1
                  </span>

                  <div>
                    <p className="text-lg font-sans">Midnight Dreams</p>
                    <p className="text-gray-400 text-sm ">ISRC: USRC17607839</p>
                  </div>
                </div>
                <img src={audioframe} alt="" />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#0F171D] rounded-lg p-4 space-y-4">
                  <p className="text-sm text-gray-400">Songwriter</p>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-green-400 text-sm">60%</p>
                </div>
                <div className="bg-[#0F171D] rounded-lg p-4 space-y-4">
                  <p className="text-sm text-gray-400">Producer</p>
                  <p className="font-medium">Alex Rivera</p>
                  <p className="text-green-400 text-sm">30%</p>
                </div>
                <div className="bg-[#0F171D] rounded-lg p-4 space-y-4">
                  <p className="text-sm text-gray-400">Featured Artist</p>
                  <p className="font-medium">Mike Thompson</p>
                  <p className="text-green-400 text-sm">10%</p>
                </div>
              </div>
            </div>

            {/* Track 2 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex justify-start items-center gap-3">
                  <span className="bg-[#122939] text-white px-4 py-2 rounded-lg text-sm">
                    Track - 2
                  </span>

                  <div>
                    <p className="text-lg font-sans">Electric Nights</p>
                    <p className="text-gray-400 text-sm ">ISRC: USRC17607839</p>
                  </div>
                </div>
                <img src={audioframe} alt="" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#0F171D] rounded-lg p-4 space-y-4">
                  <p className="text-sm text-gray-400">Songwriter</p>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-green-400 text-sm">60%</p>
                </div>
                <div className="bg-[#0F171D] rounded-lg p-4 space-y-4">
                  <p className="text-sm text-gray-400">Producer</p>
                  <p className="font-medium">Alex Rivera</p>
                  <p className="text-green-400 text-sm">40%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Part- 4 Distribution Platforms*/}

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

          {/* Distribution Notes */}
          <div className="bg-[#0F2529] rounded-xl p-6 shadow-lg mt-8">
            <h2 className="text-2xl font-sans mb-6">Distribution Notes</h2>

            {/* Note */}
            <div className="bg-[#171719] rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <FaUserCircle className="text-3xl text-gray-300" />
                <div>
                  <p className="font-semibold">Gemini Chachi</p>
                  <p className="text-sm text-gray-400">Artist</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Lorem ipsum dolor sit amet consectetur. Bibendum vitae quisque
                eu lectus lacus volutpat. Tempor cursus non tristique aliquam
                feugiat nunc.
              </p>
              <p className="text-xs text-gray-500">March 15, 2024 at 2:30 PM</p>
            </div>

            {/* Input */}
            <textarea
              placeholder="Write your message..."
              className="w-full h-[194px] px-4 py-3 rounded-[15px] border border-[rgba(226,232,240,0.54)] 
  bg-[rgba(24,39,107,0.30)] text-white placeholder-gray-300 
  text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 
  resize-none shadow-sm backdrop-blur-sm transition-all duration-200"
            />

            <div className="flex justify-end">
              <button className="flex w-[228px] h-[48px] px-3 justify-center items-center gap-2 rounded-[15px] border border-[#E2E8F04D] bg-[#3A5CFF] text-white hover:bg-[#2f4de0] transition cursor-pointer">
                Add Note
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-start gap-2">
              <RxCrossCircled />
              Decline
            </button>
            <button className="bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700 transition">
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributeNow;
