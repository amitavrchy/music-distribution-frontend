import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const artists = [
  {
    name: "Darlene Robertson",
    role: "Pop Icon Artist",
    avatar: "/woman-pop-artist.jpg",
    totalRelease: "05",
    releaseType: "3 Albums, 2 Single",
    distributor: "XYZ Distribution",
    label: "ABC Records",
    totalTrack: "25",
    dateRange: "2018-2025",
  },
  {
    name: "Kristin Watson",
    role: "Pop Artist",
    avatar: "/woman-pop-singer.jpg",
    totalRelease: "05",
    releaseType: "3 Albums, 2 Single",
    distributor: "XYZ Distribution",
    label: "ABC Records",
    totalTrack: "25",
    dateRange: "2018-2025",
  },
  {
    name: "Ronald Richards",
    role: "Hip Hop Artist",
    avatar: "/man-hip-hop-artist.jpg",
    totalRelease: "05",
    releaseType: "3 Albums, 2 Single",
    distributor: "XYZ Distribution",
    label: "ABC Records",
    totalTrack: "25",
    dateRange: "2018-2025",
  },
  {
    name: "Devon Lane",
    role: "Hip Hop Artist",
    avatar: "/man-rapper.jpg",
    totalRelease: "05",
    releaseType: "3 Albums, 2 Single",
    distributor: "XYZ Distribution",
    label: "ABC Records",
    totalTrack: "25",
    dateRange: "2018-2025",
  },
  {
    name: "Marvin McKinney",
    role: "R&B Artist",
    avatar: "/man-rnb-singer.jpg",
    totalRelease: "05",
    releaseType: "3 Albums, 2 Single",
    distributor: "XYZ Distribution",
    label: "ABC Records",
    totalTrack: "25",
    dateRange: "2018-2025",
  },
  {
    name: "Kathryn Murphy",
    role: "Hip Hop Artist",
    avatar: "/woman-hip-hop-artist.jpg",
    totalRelease: "05",
    releaseType: "3 Albums, 2 Single",
    distributor: "XYZ Distribution",
    label: "ABC Records",
    totalTrack: "25",
    dateRange: "2018-2025",
  },
  {
    name: "Savannah Nguyen",
    role: "Hip Hop Artist",
    avatar: "/woman-rapper.jpg",
    totalRelease: "05",
    releaseType: "3 Albums, 2 Single",
    distributor: "XYZ Distribution",
    label: "ABC Records",
    totalTrack: "25",
    dateRange: "2018-2025",
  },
  {
    name: "Eleanor Pena",
    role: "Hip Hop Artist",
    avatar: "/woman-hip-hop-singer.jpg",
    totalRelease: "05",
    releaseType: "3 Albums, 2 Single",
    distributor: "XYZ Distribution",
    label: "ABC Records",
    totalTrack: "25",
    dateRange: "2018-2025",
  },
  {
    name: "Guy Hawkins",
    role: "Hip Hop Artist",
    avatar: "/man-hip-hop-rapper.jpg",
    totalRelease: "05",
    releaseType: "3 Albums, 2 Single",
    distributor: "XYZ Distribution",
    label: "ABC Records",
    totalTrack: "25",
    dateRange: "2018-2025",
  },
];

export function BackCatalogClient() {
  return (
    <div className="mt-[40px]">
      {/* Search and Filters */}
      <div className="">
        <div className="">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 ">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search"
                className="pl-10 h-12 bg-[#17171A] border-[#E2E8F04D] text-white placeholder:text-slate-400"
              />
            </div>

            <Select>
              <SelectTrigger className="w-52 h-12 bg-[#17171A] border-[#E2E8F04D] text-white">
                <SelectValue placeholder="Release Type" />
              </SelectTrigger>
              <SelectContent className="bg-[#17171A] border-[#E2E8F04D]">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="album">Albums</SelectItem>
                <SelectItem value="single">Singles</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-52 h-12 bg-[#17171A] border-[#E2E8F04D] text-white">
                <SelectValue placeholder="AI Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#17171A] border-[#E2E8F04D]">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-52 h-12 bg-[#17171A] border-[#E2E8F04D] text-white">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent className="bg-[#17171A] border-[#E2E8F04D]">
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Artist Cards Grid */}
      <div className="mt-[40px]">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist, index) => (
              <Card key={index} className="">
                <CardContent className="p-6">
                  {/* Artist Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={artist.avatar || "/placeholder.svg"}
                        alt={artist.name}
                      />
                      <AvatarFallback className="bg-slate-700 text-white">
                        {artist.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-white font-medium text-sm">
                        {artist.name}
                      </h3>
                      <p className="text-slate-400 text-xs">{artist.role}</p>
                    </div>
                  </div>

                  {/* Artist Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs">
                        Total Release
                      </span>
                      <span className="text-white text-xs font-medium">
                        {artist.totalRelease}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs">
                        Release Type
                      </span>
                      <span className="text-white text-xs">
                        {artist.releaseType}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs">
                        Distributor
                      </span>
                      <span className="text-white text-xs">
                        {artist.distributor}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs">Label</span>
                      <span className="text-white text-xs">{artist.label}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs">
                        Total Track
                      </span>
                      <span className="text-white text-xs font-medium">
                        {artist.totalTrack}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-xs">Date Range</span>
                      <span className="text-white text-xs">
                        {artist.dateRange}
                      </span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Load More */}
      <div className="px-6 pb-8">
        <div className="max-w-7xl mx-auto text-center">
          <Button
            variant="link"
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            Load More →
          </Button>
        </div>
      </div>
    </div>
  );
}
