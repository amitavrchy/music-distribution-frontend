import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FiCopy, FiCheck } from "react-icons/fi";
import download from "@/assets/icons/download.svg";

// Sample Data
const productData = [
  {
    id: "10001",
    assetsName: "Stand on Dat",
    name: "K Shiday",
    upc: "UPC: 723277809397",

    amount: "$350.00 USD",

    image: download,
  },
  {
    id: "10002",
    assetsName: "Handle Me",
    name: "K Shiday",
    upc: "UPC: 823377819398",

    amount: "$350.00 USD",

    image: download,
  },
  {
    id: "10003",
    assetsName: "Cater 2 You",
    name: "Auntie House",
    upc: "UPC: 923477829399",
    amount: "$350.00 USD",
    image: download,
  },
  {
    id: "10004",
    assetsName: "No Music",
    name: "K Shiday",
    upc: "UPC: 673277809111",
    amount: "$350.00 USD",
    image: download,
  },
  {
    id: "10005",
    assetsName: "OOH YEA",
    name: "K Shiday",
    upc: "UPC: 573277809222",
    amount: "$350.00 USD",
    image: download,
  },
];

// UPC Cell Component with Copy Feature
const UpcCell = ({ upc }: { upc: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upc);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 cursor-pointer">
      <span className="text-sm md:text-base text-gray-400">{upc}</span>
      <button
        onClick={handleCopy}
        className="p-1 rounded-md hover:bg-gray-100 transition cursor-pointer"
        title="Copy UPC"
      >
        {copied ? (
          <FiCheck className="text-green-500 w-4 h-4" />
        ) : (
          <FiCopy className="text-gray-500 w-4 h-4" />
        )}
      </button>
    </div>
  );
};

// Main Table
const TrackTable = () => {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full min-w-[1000px]">
        {/* Table Header */}
        <TableHeader>
          <TableRow className="text-[#BDBDBD] text-sm md:text-base">
            <TableHead className="w-[200px] px-2 md:px-4 py-2">Title</TableHead>
            <TableHead className="text-center px-2 md:px-4 py-2">UPC</TableHead>
            <TableHead className="text-right pr-4 md:pr-8 py-2">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody className="text-white">
          {productData.map((product) => (
            <TableRow key={product.id}>
              {/* Title & Artist */}
              <TableCell className="px-2 md:px-4 py-3 flex items-center gap-2 md:gap-3">
                <img
                  src={product.image}
                  alt=""
                  className="h-5 w-5 md:h-7 md:w-7 rounded"
                />
                <div className="flex flex-col">
                  <span className="text-sm md:text-base font-medium">
                    {product.assetsName}
                  </span>
                  <span className="text-xs md:text-sm text-gray-500">
                    {product.name}
                  </span>
                </div>
              </TableCell>

              {/* UPC with Copy Button */}
              <TableCell className="text-center px-2 md:px-4 py-3">
                <UpcCell upc={product.upc} />
              </TableCell>

              {/* Payment Amount */}
              <TableCell className="text-right pr-4 md:pr-8 py-3 text-sm md:text-base font-medium">
                {product.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TrackTable;
