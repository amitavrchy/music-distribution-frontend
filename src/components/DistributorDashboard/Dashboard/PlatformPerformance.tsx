import { Card } from "@/components/ui/card";

import Youtube from "@/assets/icons/youtube.png";
import sportify from "@/assets/icons/sportity.png";
import apple from "@/assets/icons/apple.png";
import soundClud from "@/assets/icons/soundCloud.png";
import audio from "@/assets/icons/audio.png";
import deser from "@/assets/icons/deezer.png";
import tidal from "@/assets/icons/tidal.png";
import heart from "@/assets/icons/heart2.png";
import Line from "@/assets/photo/Line.png";

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

const PlatformPerformance = () => {
  return (
    <div>
      {/* Platform Performance Section */}
      <div className="mt-[40px] bg-[#0D2223]">
        <Card className="border border-[#c6c6c630]">
          <div className="p-6 space-y-8">
            <h2 className="text-xl font-semibold text-white mb-6">
              Platform Performance
            </h2>
            <img src={Line} alt="" className="w-full" />
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
                  <p className="text-slate-400 text-xs">{platform.streams}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PlatformPerformance;
