import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import MiniTitle from "@/components/ClientDashboard/Shared/MiniTitle";

export function Notification() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <div className="w-full border border-[#B3B3B3] bg-[#0D1D22] rounded-lg p-6">
      <MiniTitle title="Notification Settings" />

      <div className="space-y-4 mt-6">
        {/* Email Notifications */}
        <div className="flex items-center space-x-3">
          <Checkbox
            id="email-notifications"
            checked={emailNotifications}
            onCheckedChange={(checked) =>
              setEmailNotifications(checked === true)
            }
            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 cursor-pointer"
          />
          <Label
            htmlFor="email-notifications"
            className="text-sm text-muted-foreground cursor-pointer"
          >
            Email notifications for all account activity
          </Label>
        </div>

        {/* Push Notifications */}
        <div className="flex items-center space-x-3">
          <Checkbox
            id="push-notifications"
            checked={pushNotifications}
            onCheckedChange={(checked) =>
              setPushNotifications(checked === true)
            }
            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 cursor-pointer"
          />
          <Label
            htmlFor="push-notifications"
            className="text-sm text-muted-foreground cursor-pointer"
          >
            Push notifications for urgent status updates
          </Label>
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
// import MiniTitle from "@/components/ClientDashboard/Shared/MiniTitle";

// export function Notification() {
//   const [emailNotifications, _setEmailNotifications] = useState(true);
//   const [pushNotifications, _setPushNotifications] = useState(false);

//   return (
//     <div className="w-full  border border-[#B3B3B3]  bg-[#0D1D22] rounded-lg p-6">
//       <MiniTitle title="Notification Settings" />

//       <div className="space-y-4 mt-6">
//         <div className="flex items-center space-x-3">
//           <Checkbox
//             id="email-notifications"
//             checked={emailNotifications}
//             // onCheckedChange={setEmailNotifications}
//             className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 cursor-pointer"
//           />
//           <Label
//             htmlFor="email-notifications"
//             className="text-sm text-muted-foreground cursor-pointer"
//           >
//             Email notifications for all account activity
//           </Label>
//         </div>

//         <div className="flex items-center space-x-3">
//           <Checkbox
//             id="push-notifications"
//             checked={pushNotifications}
//             // onCheckedChange={setPushNotifications}
//             className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 cursor-pointer"
//           />
//           <Label
//             htmlFor="push-notifications"
//             className="text-sm text-muted-foreground cursor-pointer"
//           >
//             Push notifications for urgent status updates
//           </Label>
//         </div>
//       </div>
//     </div>
//   );
// }
