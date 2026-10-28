import { RecentActivity as RecentActivityType } from "@/redux/features/admin/admin.type";

const iconColors: Record<string, string> = {
  submission: "bg-green-500",
  payment: "bg-blue-500",
  release: "bg-purple-500",
  onboard: "bg-yellow-500",
  flagged: "bg-red-500",
};

interface RecentActivityProps {
  data?: RecentActivityType[];
}

const RecentActivity = ({ data }: RecentActivityProps) => {
  const activities = data || [];

  return (
    <div className="bg-[#0C1D21] text-white rounded-xl p-6 w-full shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        {/* <a href="#" className="text-blue-500 text-sm hover:underline">
          View All
        </a> */}
      </div>

      {/* Activity List */}
      <ul className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <li key={index} className="flex items-start justify-between gap-3">
              {/* Left: Icon and content */}
              <div className="flex items-start gap-3 flex-1">
                {/* Icon */}
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${
                    iconColors[activity.type] || "bg-gray-500"
                  }`}
                >
                  {activity.type ? activity.type[0].toUpperCase() : "?"}
                </div>

                {/* Text Content */}
                <div>
                  <div className="text-sm gap-2  mb-1">
                    <p>
                      {activity.title}{" "}
                      <span className="text-[#01D449]">{activity.day}</span>
                    </p>
                    <p className="font-semibold">{activity.user}</p>{" "}
                  </div>
                </div>
              </div>

              {/* Right: Time */}
              <div className="text-xs text-gray-400 whitespace-nowrap">
                {activity.time}
              </div>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500 py-4">No recent activity</li>
        )}
      </ul>
    </div>
  );
};

export default RecentActivity;
