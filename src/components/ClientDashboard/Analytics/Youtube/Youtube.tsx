import {
  FaYoutube,
  FaSpotify,
  FaApple,
  FaSoundcloud,
  FaDeezer,
} from "react-icons/fa6";
import { SiAudiomack, SiTidal, SiIheartradio } from "react-icons/si";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReuseHeader from "../Shared/ReuseHeader";

const getPlatformIcon = (platform?: string) => {
  if (!platform) return null;
  switch (platform.toLowerCase()) {
    case "youtube":
      return <FaYoutube className="text-[#FF0000] w-10 h-6" />;
    case "spotify":
      return <FaSpotify className="text-[#1DB954] w-10 h-6" />;
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
        <SiTidal className="text-[#000000] w-10 h-6 bg-white rounded-sm" />
      );
    case "iheart radio":
    case "iheartradio":
      return <SiIheartradio className="text-[#C6002B] w-10 h-6" />;
    default:
      return null;
  }
};

interface YoutubeProps {
  platform?: string;
  period: string;
  setPeriod: (period: string) => void;
}

const Youtube = ({ platform = "YouTube", period, setPeriod }: YoutubeProps) => {
  const getPeriodLabel = (val: string) => {
    switch (val) {
      case "last_7_days":
        return "Last 7 Days";
      case "last_30_days":
        return "Last 30 Days";
      case "last_6_months":
        return "Last 6 Months";
      case "last_1_year":
        return "Last 1 Year";
      case "this_year":
        return "This Year";
      default:
        return "Select Period";
    }
  };

  return (
    <div className="space-y-9">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* Reusable Header */}
        <ReuseHeader platform={platform} icon={getPlatformIcon(platform)} />

        {/* Filter Dropdown (kept separate) */}
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-full sm:w-full md:w-[240px] h-12 rounded-[15px] border border-[rgba(226,232,240,0.30)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base">
            <SelectValue placeholder="Last 1 Year" className="text-gray-300">
              {getPeriodLabel(period)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="border-none bg-[#17171A] text-white font-sans shadow-lg rounded-lg">
            <SelectGroup>
              <SelectItem
                value="last_7_days"
                className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
              >
                Last 7 Days
              </SelectItem>
              <SelectItem
                value="last_30_days"
                className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
              >
                Last 30 Days
              </SelectItem>
              <SelectItem
                value="last_6_months"
                className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
              >
                Last 6 Months
              </SelectItem>
              <SelectItem
                value="last_1_year"
                className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
              >
                Last 1 Year
              </SelectItem>
              <SelectItem
                value="this_year"
                className="hover:bg-[#131320] p-3 cursor-pointer"
              >
                This Year
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Youtube;

// import { FaYoutube } from "react-icons/fa6";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const Youtube = () => {
//   return (
//     <div className="space-y-9">
//       <div>
//         {/* Responsive Container */}
//         <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
//           {/* Title & Icon */}
//           <div className="space-y-2">
//             <h1 className="text-base font-sans">Analytics</h1>
//             <div className="flex justify-start items-center gap-2">
//               <FaYoutube className="text-[#FF0000] w-10 h-6" />
//               <h1 className="text-2xl font-sans">Youtube</h1>
//             </div>
//           </div>

//           {/* Filter Dropdown */}
//           <Select>
//             <SelectTrigger className="w-full sm:w-full md:w-[240px] h-12 rounded-[15px] border border-[rgba(226,232,240,0.30)] bg-[#17171A] shadow-sm hover:border-[#1C1D28] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer text-sm md:text-base">
//               <SelectValue
//                 placeholder="Last 1 Year"
//                 className="text-gray-300"
//               />
//             </SelectTrigger>

//             <SelectContent className="border-none bg-[#17171A] text-white font-sans shadow-lg rounded-lg">
//               <SelectGroup>
//                 <SelectItem
//                   value="last_7_days"
//                   className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
//                 >
//                   Last 7 Days
//                 </SelectItem>
//                 <SelectItem
//                   value="last_30_days"
//                   className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
//                 >
//                   Last 30 Days
//                 </SelectItem>
//                 <SelectItem
//                   value="last_6_months"
//                   className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
//                 >
//                   Last 6 Months
//                 </SelectItem>
//                 <SelectItem
//                   value="last_1_year"
//                   className="hover:bg-[#131320] p-3 cursor-pointer border-b border-[#2C2C3A]"
//                 >
//                   Last 1 Year
//                 </SelectItem>
//                 <SelectItem
//                   value="this_year"
//                   className="hover:bg-[#131320] p-3 cursor-pointer"
//                 >
//                   This Year
//                 </SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Youtube;
