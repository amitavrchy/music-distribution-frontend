import type { JSX } from "react";
import { Card } from "@/components/ui/card";
import Youtube from "@/assets/icons/youtube.png";
import sportify from "@/assets/icons/sportity.png";
import apple from "@/assets/icons/apple.png";
import soundClud from "@/assets/icons/soundCloud.png";
import audio from "@/assets/icons/audio.png";
import deser from "@/assets/icons/deezer.png";
import tidal from "@/assets/icons/tidal.png";
import heart from "@/assets/icons/heart2.png";
import { Checkbox } from "@/components/ui/checkbox";
import { FaCalendarAlt, FaCheck, FaUser } from "react-icons/fa";
import { IoMdMusicalNote } from "react-icons/io";
// import SubmissionItemType from "./Type";
import { Link } from "react-router-dom";
import { Release } from "@/redux/features/releaseAdminDistributor/releaseAdminDistributor.type";

interface Props {
  data: Release;
}

export default function FailedItem({ data }: Props): JSX.Element {
  // console.log(data)
  return (
    <div className="bg-[#0C1F21] border border-gray-700 rounded-xl p-6 shadow-lg space-y-4 hover:shadow-2xl transition">
      <div className="flex justify-between items-center">
        <div className="flex justify-start gap-2">
          <div className="flex items-center gap-3 cursor-pointer">
            <Checkbox id={data.releaseId} />
          </div>
          <h2 className="text-2xl font-sans">Electric Nights</h2>
        </div>
        {/* <p className="text-[#D31301] bg-[#231D1F] px-3 py-1 rounded-lg font-medium w-fit">
              Failed
            </p> */}
      </div>
      <div>
        {/* Platforms */}
        <div>
          <div className="space-y-3 ml-8">
            <div className="space-y-3">
              <p className=" flex gap-1">
                <FaUser className="text-[#01D449]" />
                John Doe
              </p>
              <p className=" flex gap-1">
                <FaCalendarAlt className="text-[#01D449]" />
                Release Date: 26/08/2025
              </p>
              <p className=" flex gap-1">
                <IoMdMusicalNote className="text-[#01D449]" />
                12 Tracks
              </p>
            </div>
            <h2 className="text-base font-sans font-semibold">
              Distribution Status:
            </h2>
          </div>

          <Card className="border-none">
            <div className="">
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
                {/* YouTube */}
                <div className="flex justify-between items-center  rounded-xl p-2 bg-[#0C3326]">
                  <div className=" flex gap-2">
                    <img
                      src={Youtube}
                      alt=""
                      className="bg-[#232F22] rounded-full h-7 w-7"
                    />
                    <p>YouTube</p>
                  </div>
                  <p className="flex justify-start items-center gap-1">
                    <span>
                      <FaCheck className="text-green-500" />
                    </span>
                    Distributed: 26/08/2025
                  </p>
                </div>
                {/* Audiomack */}
                <div className="flex justify-between items-center  rounded-xl p-2 bg-[#0C3326]">
                  <div className=" flex gap-2">
                    <img
                      src={audio}
                      alt=""
                      className="bg-[#232F22] rounded-full h-7 w-7"
                    />
                    <p>Audiomack</p>
                  </div>
                  <p className="flex justify-start items-center gap-1">
                    <span>
                      <FaCheck className="text-green-500" />
                    </span>
                    Distributed: 26/08/2025
                  </p>
                </div>
                {/* Spotify */}
                <div className="flex justify-between items-center  rounded-xl p-2 bg-[#0C3326]">
                  <div className=" flex gap-2">
                    <img
                      src={sportify}
                      alt=""
                      className="bg-[#232F22] rounded-full h-7 w-7"
                    />
                    <p>Spotify</p>
                  </div>
                  <p className="flex justify-start items-center gap-1">
                    <span>
                      <FaCheck className="text-green-500" />
                    </span>
                    Distributed: 26/08/2025
                  </p>
                </div>
                {/* YouTube */}
                <div className="flex justify-between items-center  rounded-xl p-2 bg-[#0C3326]">
                  <div className=" flex gap-2">
                    <img
                      src={deser}
                      alt=""
                      className="bg-[#232F22] rounded-full h-7 w-7"
                    />
                    <p>Deezer</p>
                  </div>
                  <p className="flex justify-start items-center gap-1">
                    <span>
                      <FaCheck className="text-green-500" />
                    </span>
                    Distributed: 26/08/2025
                  </p>
                </div>
                {/* SoundCloud */}
                <div className="flex justify-between items-center  rounded-xl p-2 bg-[#0C3326]">
                  <div className=" flex gap-2">
                    <img
                      src={soundClud}
                      alt=""
                      className="bg-[#232F22] rounded-full h-7 w-7"
                    />
                    <p>SoundCloud</p>
                  </div>
                  <p className="flex justify-start items-center gap-1">
                    <span>
                      <FaCheck className="text-green-500" />
                    </span>
                    Distributed: 26/08/2025
                  </p>
                </div>
                {/* TIDAL */}
                <div className="flex justify-between items-center  rounded-xl p-2 bg-[#0C3326]">
                  <div className=" flex gap-2">
                    <img
                      src={tidal}
                      alt=""
                      className="bg-[#232F22] rounded-full h-7 w-7"
                    />
                    <p>TIDAL</p>
                  </div>
                  <p className="flex justify-start items-center gap-1">
                    <span>
                      <FaCheck className="text-green-500" />
                    </span>
                    Distributed: 26/08/2025
                  </p>
                </div>
                {/* Apple Music */}
                <div className="flex justify-between items-center  rounded-xl p-2 bg-[#0C3326]">
                  <div className=" flex gap-2">
                    <img
                      src={apple}
                      alt=""
                      className="bg-[#232F22] rounded-full h-7 w-7"
                    />
                    <p>Apple Music</p>
                  </div>
                  <p className="flex justify-start items-center gap-1">
                    <span>
                      <FaCheck className="text-green-500" />
                    </span>
                    Distributed: 26/08/2025
                  </p>
                </div>
                {/* iHeartRadio */}
                <div className="flex justify-between items-center  rounded-xl p-2 bg-[#0C3326]">
                  <div className=" flex gap-2">
                    <img
                      src={heart}
                      alt=""
                      className="bg-[#232F22] rounded-full h-7 w-7"
                    />
                    <p>iHeartRadio</p>
                  </div>
                  <p className="flex justify-start items-center gap-1">
                    <span>
                      <FaCheck className="text-green-500" />
                    </span>
                    Distributed: 26/08/2025
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-4">
        <button className="w-full sm:w-auto bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
          View Analytics
        </button>
        {/* <button className="w-full sm:w-auto bg-red-500 px-5 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer">
                Fix Error
              </button> */}
        <Link
          to={`/distributor-dashboard/distribution/details/${data.releaseId}`}
          className="w-full sm:w-auto bg-gray-700 px-5 py-2 rounded-lg hover:bg-gray-600 transition cursor-pointer"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
