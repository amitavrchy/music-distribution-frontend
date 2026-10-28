import {
  FaYoutube,
  FaSpotify,
  FaApple,
  FaSoundcloud,
  FaDeezer,
  FaAmazon,
} from "react-icons/fa6";
import { SiAudiomack, SiTidal, SiIheartradio, SiPandora } from "react-icons/si";
import EarningsByType from "./EarningsByType";
import EstimatedEarning from "./EstimatedEarning";
import ReuserableCommonPart from "./Shared/ReuserableCommonPart";
import { PlatformOverviewData } from "@/redux/features/analytics/analytics.type";

const getPlatformIcon = (platform?: string) => {
  if (!platform) return <FaYoutube className="text-[#FF0000] w-10 h-6" />;
  switch (platform.toLowerCase()) {
    case "youtube":
      return <FaYoutube className="text-[#FF0000] w-10 h-6" />;
    case "spotify":
      return <FaSpotify className="text-[#1DB954] w-10 h-6" />;
    case "apple music":
    case "applemusic":
      return <FaApple className="text-white w-10 h-6" />;
    case "soundcloud":
      return <FaSoundcloud className="text-[#FF5500] w-10 h-6" />;
    case "audiomack":
      return <SiAudiomack className="text-[#FFA200] w-10 h-6" />;
    case "deezer":
      return <FaDeezer className="text-[#00C7FF] w-10 h-6" />;
    case "tidal":
      return (
        <SiTidal className="text-[#000000] w-10 h-6 bg-white rounded-sm p-0.5" />
      );
    case "iheart radio":
    case "iheartradio":
      return <SiIheartradio className="text-[#C6002B] w-10 h-6" />;
    case "pandora":
      return <SiPandora className="text-[#00A0EE] w-10 h-6" />;
    case "amazon":
    case "amazon music":
      return <FaAmazon className="text-[#FF9900] w-10 h-6" />;
    default:
      return <FaYoutube className="text-[#FF0000] w-10 h-6" />;
  }
};

const YoutubeSection = ({
  data,
  platform,
}: {
  data?: PlatformOverviewData;
  platform?: string;
}) => {
  if (!data) return null;

  return (
    <ReuserableCommonPart
      title={platform || "YouTube"}
      icon={getPlatformIcon(platform)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-3 gap-5">
        <div className="w-full space-y-6">
          <EarningsByType data={data.earningsByType} />
        </div>
        <div className="lg:col-span-2 w-full">
          <EstimatedEarning
            data={data.estimatedEarnings}
            totalViews={data.totalViews}
            totalEarnings={data.totalEarnings}
          />
        </div>
      </div>
    </ReuserableCommonPart>
  );
};

export default YoutubeSection;
