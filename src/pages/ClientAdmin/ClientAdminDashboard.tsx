import AppleMusicSection from "@/components/ClientDashboard/Dashboard/AppleMusicSection";
import AudiomackSection from "@/components/ClientDashboard/Dashboard/AudiomackSection";
import ClientAdminDashboardHeader from "@/components/ClientDashboard/Dashboard/ClientAdminDashboardHeader";
import DeezerSection from "@/components/ClientDashboard/Dashboard/DeezerSection";
import IHeartRadioSection from "@/components/ClientDashboard/Dashboard/IHeartRadioSection";
import SoundCloudSection from "@/components/ClientDashboard/Dashboard/SoundCloudSection";
import SpotifySection from "@/components/ClientDashboard/Dashboard/SpotifySection";
import TIDALSection from "@/components/ClientDashboard/Dashboard/TIDALSection";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";
import { useGetDashboardAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

export default function ClientAdminDashboard() {
  const {
    data: analyticsData,
    isLoading,
    isError,
    error,
  } = useGetDashboardAnalyticsQuery();

  console.log("Dashboard Analytics Data:", analyticsData);
  const getPlatformData = (platformName: string) => {
    return analyticsData?.data?.find(
      (item) => item.platform.toLowerCase() === platformName.toLowerCase(),
    );
  };

  return (
    <div className="space-y-6">
      <ClientAdminDashboardHeader />

      {isLoading && <ComponentLoader />}

      {isError && (
        <div className="p-4 text-center text-red-500 bg-red-100 rounded-md">
          Error loading dashboard data. Please try refresh the page.
          <br />
          <small>{JSON.stringify(error)}</small>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="space-y-6">
          <SpotifySection data={getPlatformData("Spotify")} />
          <AppleMusicSection data={getPlatformData("Apple Music")} />
          <SoundCloudSection data={getPlatformData("SoundCloud")} />
          <AudiomackSection data={getPlatformData("Audiomack")} />
          <DeezerSection data={getPlatformData("Deezer")} />
          <TIDALSection data={getPlatformData("Tidal")} />
          <IHeartRadioSection data={getPlatformData("iHeartRadio")} />
        </div>
      )}
    </div>
  );
}
