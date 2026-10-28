import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReuseAccounting from "../Shared/ReuseAccounting";

const ProfitLossHead = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const period = searchParams.get("period") || "last_7_days";

  const handlePeriodChange = (value: string) => {
    setSearchParams({ period: value });
  };

  return (
    <div className="space-y-9">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <ReuseAccounting platform="Profit & Loss" icon="" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
          {/* Period Select */}
          <Select value={period} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-full md:w-[240px] h-12 rounded-[15px] bg-[#17171A]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="bg-[#17171A] text-white">
              <SelectGroup>
                <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                <SelectItem value="last_6_months">Last 6 Months</SelectItem>
                <SelectItem value="last_1_year">Last 1 Year</SelectItem>
                <SelectItem value="this_year">This Year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ProfitLossHead;
