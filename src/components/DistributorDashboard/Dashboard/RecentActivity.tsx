import { Card } from "@/components/ui/card";

interface ActivityItem {
  title: string;
  subtitle: string;
  timestamp: string;
}

const recentActivities: ActivityItem[] = [
  {
    title: "New EP from Jane Doe",
    subtitle: "Submission: Pending Review",
    timestamp: "10 minutes ago",
  },
  {
    title: 'Distribute "Summer Vibes"',
    subtitle: "Release: Sent to Platforms",
    timestamp: "1 hour ago",
  },
  {
    title: "New Client: Music Innovations Inc.",
    subtitle: "Client: Profile Created",
    timestamp: "3 hours ago",
  },
  {
    title: "Single by The Rhythmatics",
    subtitle: "Submission: Pending Review",
    timestamp: "Yesterday at 4:30 PM",
  },
  {
    title: 'Distribute "City Lights"',
    subtitle: "Release: Sent to Platforms",
    timestamp: "Yesterday at 2:15 PM",
  },
];
const RecentActivity = () => {
  return (
    <div>
      {/* Recent Activity Section */}
      <Card className="flex-1 border border-[#c6c6c630] bg-[#0D2223]">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-white font-medium text-sm leading-relaxed">
                    {activity.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    {activity.subtitle}
                  </p>
                </div>
                <div className="text-slate-400 text-xs sm:text-sm ml-4 flex-shrink-0">
                  {activity.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RecentActivity;
