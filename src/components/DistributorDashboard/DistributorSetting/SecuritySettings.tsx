import MiniTitle from "@/components/ClientDashboard/Shared/MiniTitle";
import { useState } from "react";

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const loginActivity = [
    { time: "Today, 10:30 AM", location: "Dallas, TX", isCurrent: true },
    { time: "Yesterday, 3:15 PM", location: "New York, NY", isCurrent: false },
    {
      time: "Aug 25, 2023, 9:00 AM",
      location: "Los Angeles, CA",
      isCurrent: false,
    },
  ];

  return (
    <div className="bg-[#0D1D22] p-8 rounded-xl shadow-md">
      <MiniTitle title="Security Settings" />

      {/* Two-Factor Authentication Section */}
      <div className="mt-6 space-y-6">
        <div className="rounded-lg bg-[#253438] border border-[#B3B3B3] p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-base font-medium text-white">
                Two-Factor Authentication (2FA)
              </h3>
              <p className="text-sm text-gray-400">
                Add an extra layer of security to your account.
              </p>
            </div>

            {/* Colored Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={twoFactorEnabled}
                onChange={(e) => setTwoFactorEnabled(e.target.checked)}
              />
              {/* Track */}
              <div
                className={`w-14 h-7 rounded-full transition-colors duration-300
                  ${twoFactorEnabled ? "bg-emerald-500" : "bg-gray-500"}`}
              ></div>
              {/* Knob */}
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300
                  ${twoFactorEnabled ? "translate-x-7" : "translate-x-0"}`}
              ></div>
            </label>
          </div>
        </div>

        {/* Recent Login Activity Section */}
        <div>
          <h3 className="text-base font-medium text-white mb-4">
            Recent Login Activity
          </h3>
          <div className="rounded-lg border bg-[#253438] border-[#B3B3B3] p-6 space-y-3">
            {loginActivity.map((activity, index) => (
              <div key={index} className="text-sm text-gray-400">
                {activity.time} from {activity.location}
                {activity.isCurrent && (
                  <span className="text-white font-medium">
                    {" "}
                    (Current Session)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// import MiniTitle from "@/components/ClientDashboard/Shared/MiniTitle"
// import { useState } from "react"

// export function SecuritySettings() {
//   const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

//   const loginActivity = [
//     {
//       time: "Today, 10:30 AM",
//       location: "Dallas, TX",
//       isCurrent: true,
//     },
//     {
//       time: "Yesterday, 3:15 PM",
//       location: "New York, NY",
//       isCurrent: false,
//     },
//     {
//       time: "Aug 25, 2023, 9:00 AM",
//       location: "Los Angeles, CA",
//       isCurrent: false,
//     },
//   ]

//   return (
//     <div className="bg-[#0D1D22] p-8 rounded-xl shadow-md">
//          <MiniTitle title="Security Settings" />

//       {/* Two-Factor Authentication Section */}
//      <div className="mt-6 space-y-6">
//          <div className="rounded-lg  bg-[#253438] border border-[#B3B3B3] p-6">
//         <div className="flex items-center justify-between">
//           <div className="space-y-1">
//             <h3 className="text-base font-medium text-white">Two-Factor Authentication (2FA)</h3>
//             <p className="text-sm text-gray-400">Add an extra layer of security to your account.</p>
//           </div>

//           {/* Regular Toggle (Checkbox) */}
//           <label className="inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               className="sr-only peer"
//               checked={twoFactorEnabled}
//               onChange={(e) => setTwoFactorEnabled(e.target.checked)}
//             />
//             <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-emerald-500 relative transition">
//               <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5" />
//             </div>
//           </label>
//         </div>
//       </div>

//       {/* Recent Login Activity Section */}
//         <h3 className="text-base font-medium text-white mb-4">Recent Login Activity</h3>
//       <div className="rounded-lg border bg-[#253438]  border-[#B3B3B3] p-6">

//         <div className="space-y-3">
//           {loginActivity.map((activity, index) => (
//             <div key={index} className="text-sm text-gray-400">
//               {activity.time} from {activity.location}
//               {activity.isCurrent && <span className="text-white"> (Current Session)</span>}
//             </div>
//           ))}
//         </div>
//       </div>
//      </div>
//     </div>
//   )
// }
