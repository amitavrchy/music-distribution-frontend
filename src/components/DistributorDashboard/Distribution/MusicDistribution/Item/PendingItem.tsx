import type { JSX } from "react";
// import { useState } from "react";
import Youtube from "@/assets/icons/youtube.png";
import sportify from "@/assets/icons/sportity.png";
import apple from "@/assets/icons/apple.png";
import soundClud from "@/assets/icons/soundCloud.png";
import audio from "@/assets/icons/audio.png";
import deser from "@/assets/icons/deezer.png";
import tidal from "@/assets/icons/tidal.png";
import heart from "@/assets/icons/heart2.png";
import { Checkbox } from "@/components/ui/checkbox";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
// import { IoMdMusicalNote } from "react-icons/io";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
// import SubmissionItem from "./Type";
import { formatDateToDDMMYYYY } from "@/utils/formatDateToDDMMYYYY";
// import useControlDispatch from "@/contexts/control/useControlDispatch";
import useControlDispatch from "@/contexts/control/hooks/useControlDispatch";
import { Release } from "@/redux/features/releaseAdminDistributor/releaseAdminDistributor.type";

interface Props {
  data: Release;
}

export default function PendingItem({ data }: Props): JSX.Element {
  const { openModal } = useControlDispatch();
  // console.log(data)
  const releaseDate = formatDateToDDMMYYYY(data.releaseDate);
  // const submitDate = formatDateToDDMMYYYY(data.submittedAt)

  return (
    <div className="bg-[#0C1F21] border border-gray-700 rounded-xl p-6 shadow-lg space-y-4 hover:shadow-2xl transition ">
      <div className="flex justify-between items-center">
        <div className="flex justify-start gap-2">
          <div className="flex items-center gap-3 cursor-pointer">
            <Checkbox id={data.releaseId} />
          </div>
          <h2 className="text-2xl font-sans">{data.releaseTitle}</h2>
        </div>
        <p className="text-[#FFA600] bg-[#272C1F] px-3 py-1 rounded-lg font-medium w-fit">
          Pending
        </p>
      </div>
      <div>
        {/* Platforms */}
        <div>
          <div className="space-y-3 ml-8">
            <div className="space-y-3">
              <p className=" flex gap-1">
                <FaUser className="text-[#01D449]" />
                {data.artistName}
              </p>
              <p className=" flex gap-1">
                <FaCalendarAlt className="text-[#01D449]" />
                Release Date: {releaseDate}
              </p>
              {/* Temporay turn off  */}
              {/* <p className=" flex gap-1">
                    <IoMdMusicalNote className="text-[#01D449]" />
                    {data.trackCount} Tracks
                  </p> */}
            </div>
            <h2 className="text-base font-sans font-semibold">
              Distribution Platforms:
            </h2>
          </div>

          <Card className="border-none">
            <div className="">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {/* YouTube */}
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: "#F2F2F21A" }}
                  >
                    <img src={Youtube} alt="YouTube" />
                  </div>
                  <h3 className="text-white font-medium text-sm mb-1">
                    YouTube
                  </h3>
                  <p className="text-slate-400 text-xs">2.3M Streams</p>
                </div>

                {/* Spotify */}
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: "#F2F2F21A" }}
                  >
                    <img src={sportify} alt="Spotify" />
                  </div>
                  <h3 className="text-white font-medium text-sm mb-1">
                    Spotify
                  </h3>
                  <p className="text-slate-400 text-xs">1.8M Streams</p>
                </div>

                {/* Apple Music */}
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: "#F2F2F21A" }}
                  >
                    <img src={apple} alt="Apple Music" />
                  </div>
                  <h3 className="text-white font-medium text-sm mb-1">
                    Apple Music
                  </h3>
                  <p className="text-slate-400 text-xs">1.6M Streams</p>
                </div>

                {/* SoundCloud */}
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: "#F2F2F21A" }}
                  >
                    <img src={soundClud} alt="SoundCloud" />
                  </div>
                  <h3 className="text-white font-medium text-sm mb-1">
                    SoundCloud
                  </h3>
                  <p className="text-slate-400 text-xs">1.3M Streams</p>
                </div>

                {/* Audiomack */}
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: "#F2F2F21A" }}
                  >
                    <img src={audio} alt="Audiomack" />
                  </div>
                  <h3 className="text-white font-medium text-sm mb-1">
                    Audiomack
                  </h3>
                  <p className="text-slate-400 text-xs">900K Streams</p>
                </div>

                {/* Deezer */}
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: "#F2F2F21A" }}
                  >
                    <img src={deser} alt="Deezer" />
                  </div>
                  <h3 className="text-white font-medium text-sm mb-1">
                    Deezer
                  </h3>
                  <p className="text-slate-400 text-xs">830K Streams</p>
                </div>

                {/* TIDAL */}
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: "#F2F2F21A" }}
                  >
                    <img src={tidal} alt="TIDAL" />
                  </div>
                  <h3 className="text-white font-medium text-sm mb-1">TIDAL</h3>
                  <p className="text-slate-400 text-xs">500K Streams</p>
                </div>

                {/* iHeartRadio */}
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: "#F2F2F21A" }}
                  >
                    <img src={heart} alt="iHeartRadio" />
                  </div>
                  <h3 className="text-white font-medium text-sm mb-1">
                    iHeartRadio
                  </h3>
                  <p className="text-slate-400 text-xs">200K Streams</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-4">
        <button
          onClick={() => openModal(data.releaseId)}
          className="w-full sm:w-auto bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Distribute Now
        </button>
        <Link
          to={`/distributor-dashboard/distribution/details/${data.releaseId}`}
        >
          <button className="w-full sm:w-auto bg-gray-700 px-5 py-2 rounded-lg hover:bg-gray-600 transition cursor-pointer">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
