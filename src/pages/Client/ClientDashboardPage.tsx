import AppleMusicSection from "@/components/ClientDashboard/Dashboard/AppleMusicSection";
import AudiomackSection from "@/components/ClientDashboard/Dashboard/AudiomackSection";
import Dashboard from "@/components/ClientDashboard/Dashboard/Dashboard";
import DeezerSection from "@/components/ClientDashboard/Dashboard/DeezerSection";
import IHeartRadioSection from "@/components/ClientDashboard/Dashboard/IHeartRadioSection";
import SoundCloudSection from "@/components/ClientDashboard/Dashboard/SoundCloudSection";
import SpotifySection from "@/components/ClientDashboard/Dashboard/SpotifySection";
import TIDALSection from "@/components/ClientDashboard/Dashboard/TIDALSection";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";

import { useGetDashboardAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

const ClientDashboardPage = () => {
  const { data: response, isLoading } = useGetDashboardAnalyticsQuery();
  const analyticsData = response?.data || [];

  const getPlatformData = (platform: string) =>
    analyticsData.find((item) => item.platform === platform);

  if (isLoading) return <ComponentLoader />;

  return (
    <div className="space-y-6">
      <Dashboard youtubeData={getPlatformData("YouTube")} />
      <SpotifySection data={getPlatformData("Spotify")} />
      <AppleMusicSection data={getPlatformData("AppleMusic")} />
      <SoundCloudSection data={getPlatformData("SoundCloud")} />
      <AudiomackSection data={getPlatformData("Audiomack")} />
      <DeezerSection data={getPlatformData("Deezer")} />
      <TIDALSection data={getPlatformData("TIDAL")} />
      <IHeartRadioSection data={getPlatformData("iHeartRadio")} />
    </div>
  );
};

export default ClientDashboardPage;
