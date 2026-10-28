import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const Distribution = () => {
  const [platform, setPlatform] = useState("All Platforms");
  const [genre, setGenre] = useState("Pop");
  const [territory, setTerritory] = useState("Worldwide");

  return (
    <div className="w-full mx-auto p-8 bg-[#0E2123] rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Music & Distribution Settings
      </h2>

      <div className="space-y-6">
        {/* Distribution Platform */}
        <div className=" text-white">
          <label htmlFor="platform" className="text-lg">
            Default Distribution Platform
          </label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="bg-[#253638] text-white px-4 py-3 rounded-xl border-none w-full hover:bg-[#344b51]">
              <SelectValue placeholder="Select a platform" />
            </SelectTrigger>
            <SelectContent className="bg-gray-500 text-white border-none hover:bg-gray-600">
              <SelectGroup>
                <SelectItem
                  value="All Platforms"
                  className="hover:bg-[#253638] cursor-pointer"
                >
                  All Platforms
                </SelectItem>
                <SelectItem
                  value="Spotify"
                  className="hover:bg-[#253638] cursor-pointer"
                >
                  Spotify
                </SelectItem>
                <SelectItem
                  value="Apple Music"
                  className="hover:bg-[#253638] cursor-pointer"
                >
                  Apple Music
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Genre */}
        <div className="text-white space-y-4">
          <label htmlFor="genre" className="text-lg">
            Default Genre
          </label>
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className="bg-[#253638] text-white px-4 py-3 rounded-xl border-none w-full hover:bg-[#344b51]">
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent className="bg-gray-500 text-white border-none hover:bg-gray-600">
              <SelectGroup>
                <SelectLabel className="text-white">Genres</SelectLabel>
                <SelectItem
                  value="Pop"
                  className="hover:bg-[#253638] cursor-pointer"
                >
                  Pop
                </SelectItem>
                <SelectItem
                  value="Rock"
                  className="hover:bg-[#253638] cursor-pointer"
                >
                  Rock
                </SelectItem>
                <SelectItem
                  value="Jazz"
                  className="hover:bg-[#253638] cursor-pointer"
                >
                  Jazz
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Territory */}
        <div className=" text-white space-y-2">
          <label htmlFor="territory" className="text-lg">
            Distribution Territory
          </label>
          <Select value={territory} onValueChange={setTerritory}>
            <SelectTrigger className="bg-[#253638] text-white px-4 py-3 rounded-xl border-none w-full hover:bg-[#344b51]">
              <SelectValue placeholder="Select a territory" />
            </SelectTrigger>
            <SelectContent className="bg-gray-500 text-white border-none hover:bg-gray-600">
              <SelectGroup>
                <SelectLabel className="text-white">Territories</SelectLabel>
                <SelectItem
                  value="Worldwide"
                  className="hover:bg-[#253638] cursor-pointer"
                >
                  Worldwide
                </SelectItem>
                <SelectItem
                  value="USA"
                  className="hover:bg-[#253638] cursor-pointer"
                >
                  USA
                </SelectItem>
                <SelectItem
                  value="Europe"
                  className="hover:bg-[#253638] cursor-pointer"
                >
                  Europe
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Distribution;
