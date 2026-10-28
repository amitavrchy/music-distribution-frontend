import { useSearchParams } from "react-router-dom";
import Tabs from "./Tabs";
import Youtube from "./Youtube/Youtube";

const Analytics = ({ platform = "YouTube" }: { platform?: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const period = searchParams.get("period") || "last_1_year";

  const setPeriod = (newPeriod: string) => {
    setSearchParams({ period: newPeriod });
  };

  return (
    <div className="space-y-9">
      <Youtube platform={platform} period={period} setPeriod={setPeriod} />
      <Tabs platform={platform} period={period} />
    </div>
  );
};

export default Analytics;
