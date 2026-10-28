import { useState } from "react";
import img1 from "@/assets/photo/editorialpitchsong1.jpg";
import img2 from "@/assets/photo/editorialpitchsong2.jpg";
import img3 from "@/assets/photo/editorialpitchsong3.jpg";
import img4 from "@/assets/photo/editorialpitchsong4.jpg";
import img5 from "@/assets/photo/editorialpitchsong5.jpg";
import img6 from "@/assets/photo/editorialpitchsong6.jpg";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import EditorialPitchCard from "./EditorialPitchCard";

export const albumData = [
  {
    title: "Starlight Horizons",
    artist: "Nova Drift",
    label: "Celestial Records",
    upc: "555123789",
    releaseDate: "15 Jan, 2025",
    type: "Album",
    genre: "Synth Pop",
    duration: "45:20",
    producers: ["Nova Drift", "Kai Winters"],
    writers: ["Nova Drift", "Mia Lane"],
    description:
      "An energetic synth-pop journey through futuristic cityscapes and starlit dreams.",
    imageUrl: img1,
  },
  {
    title: "Moonlit Echoes",
    artist: "Aurora Fields",
    label: "Celestial Records",
    upc: "555987321",
    releaseDate: "28 Feb, 2025",
    type: "Single",
    genre: "Chillwave",
    duration: "03:58",
    producers: ["Kai Winters"],
    writers: ["Aurora Fields"],
    description:
      "A soft chillwave single capturing the calm beauty of moonlit nights and quiet reflections.",
    imageUrl: img2,
  },
  {
    title: "Reflections in Neon",
    artist: "Nova Drift",
    label: "Celestial Records",
    upc: "555192837",
    releaseDate: "12 Mar, 2025",
    type: "EP",
    genre: "Electropop",
    duration: "26:45",
    producers: ["Nova Drift", "Liam Grey"],
    writers: ["Nova Drift", "Liam Grey"],
    description:
      "A short EP of vibrant electropop tracks reflecting urban nightlife and neon-lit streets.",
    imageUrl: img3,
  },
  {
    title: "Galactic Resonance",
    artist: "Aurora Fields",
    label: "Celestial Records",
    upc: "555564738",
    releaseDate: "05 Apr, 2025",
    type: "Album",
    genre: "Ambient Electronic",
    duration: "51:10",
    producers: ["Aurora Fields", "Kai Winters"],
    writers: ["Aurora Fields", "Mia Lane"],
    description:
      "A deep ambient electronic album exploring cosmic sounds and celestial harmonies.",
    imageUrl: img4,
  },
  {
    title: "Dreamscape Rhythms",
    artist: "Nova Drift",
    label: "Celestial Records",
    upc: "555314159",
    releaseDate: "20 May, 2025",
    type: "Album",
    genre: "Lo-fi Synth",
    duration: "38:30",
    producers: ["Kai Winters"],
    writers: ["Nova Drift"],
    description:
      "A soothing lo-fi synth collection with mellow beats and dreamy soundscapes.",
    imageUrl: img5,
  },
  {
    title: "Forgotten Starlanes",
    artist: "Aurora Fields",
    label: "Celestial Records",
    upc: "555246813",
    releaseDate: "10 Jun, 2025",
    type: "Album",
    genre: "Indie Electronica",
    duration: "49:15",
    producers: ["Aurora Fields"],
    writers: ["Aurora Fields", "Mia Lane"],
    description:
      "A heartfelt indie electronica album capturing the essence of memories and lost moments.",
    imageUrl: img6,
  },
];

const EditorialPitchGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAlbums = albumData.filter((album) => {
    const term = searchTerm.toLowerCase();
    return (
      album.title.toLowerCase().includes(term) ||
      album.artist.toLowerCase().includes(term) ||
      album.label.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-7">
      {/* Search Input */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-sans font-semibold text-white">
            Editorial Support Sheet
          </h1>
        </div>
        <div className="w-full sm:w-72 md:w-96 lg:w-[736px] relative">
          <Input
            className="w-full border h-12 bg-[#17171A] border-[#696B6F] rounded-[15px] px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm md:text-base"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
            <IoSearch className="w-4 h-4 md:w-5 md:h-5" />
          </span>
        </div>
      </div>

      {/* Album Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAlbums.map((album, index) => (
          <EditorialPitchCard key={index} {...album} />
        ))}
        {filteredAlbums.length === 0 && (
          <p className="col-span-full text-center text-gray-400">
            No albums found.
          </p>
        )}
      </div>
    </div>
  );
};

export default EditorialPitchGrid;
