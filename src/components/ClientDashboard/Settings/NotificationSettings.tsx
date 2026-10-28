import { useState } from "react";
import MiniTitle from "../Shared/MiniTitle";

const NotificationSettings = () => {
  const [loadAssignments, setLoadAssignments] = useState(true);
  const [driverStatusUpdates, setDriverStatusUpdates] = useState(true);
  const [pendingPayments, setPendingPayments] = useState(false);

  return (
    <div className="w-full mx-auto space-y-6  rounded-xl p-8 bg-[#0D2023] shadow-md">
      <MiniTitle title="Notification Preferences" />

      <div className="space-y-20">
        {/* Notification Settings */}
        <div className="space-y-6">
          {/* Load Assignments */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-sans text-[20px] ">
                New Release Alerts
              </h3>
              <p>Get notified when your releases go live</p>
            </div>
            <div
              onClick={() => setLoadAssignments(!loadAssignments)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
                loadAssignments ? "bg-[#10B981]" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  loadAssignments ? "transform translate-x-6" : ""
                }`}
              />
            </div>
          </div>

          {/* Driver Status Updates */}
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h3 className="text-white font-sans text-[20px] ">
                Earnings & Royalties
              </h3>
              <p className=" text-base">
                Updates about your earnings and payouts
              </p>
            </div>
            <div
              onClick={() => setDriverStatusUpdates(!driverStatusUpdates)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
                driverStatusUpdates ? "bg-[#10B981]" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  driverStatusUpdates ? "transform translate-x-6" : ""
                }`}
              />
            </div>
          </div>

          {/* Pending Payments */}
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h3 className="text-white font-sans text-[20px] ">
                Platform Updates
              </h3>
              <p className="text-base">News about new features and changes</p>
            </div>
            <div
              onClick={() => setPendingPayments(!pendingPayments)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
                pendingPayments ? "bg-[#10B981]" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  pendingPayments ? "transform translate-x-6" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
