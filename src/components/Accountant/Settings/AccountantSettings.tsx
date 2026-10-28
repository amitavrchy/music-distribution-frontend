import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { SiSpringsecurity } from "react-icons/si";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";
import AccountantProfileInformation from "./AccountantProfileInformation";
import AccountantSecuritySettings from "./AccountantSecuritySettings";
import AccountantPaymentSettings from "./AccountantPaymentSettings";
import Billing from "@/assets/settingIcon/payment.svg";
import NotificationIcon from "@/assets/settingIcon/notifications.svg";
import { NotificationPreferences } from "@/components/AdminDashboard/Settings/Notification";
import { useAuthMeQuery } from "@/redux/features/auth/authApi";

const AccountantSettings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const { data: response, isLoading } = useAuthMeQuery();

  const handleButtonClick = (section: string) => {
    setActiveSection(section);
  };

  if (isLoading) return <ComponentLoader />;
  if (!response?.success || !response.data) return null;

  const user = response.data;

  return (
    <div className="text-white">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 space-y-4 rounded-lg shadow-md bg-[#17171A] p-3">
          <button
            className={`w-full text-base md:text-lg py-3 rounded-xl cursor-pointer ${
              activeSection === "profile"
                ? "bg-[#1E1E21] text-[#3A5CFF]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("profile")}
          >
            <span className="flex items-center gap-2 justify-start pl-2 md:pl-4">
              <FaRegUserCircle />
              Profile Information
            </span>
          </button>

          <button
            className={`w-full text-base md:text-lg py-3 rounded-xl cursor-pointer ${
              activeSection === "security"
                ? "bg-[#1E1E21] text-[#3A5CFF]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("security")}
          >
            <span className="flex items-center gap-2 justify-start pl-2 md:pl-4">
              <SiSpringsecurity />
              Security Settings
            </span>
          </button>

          <button
            className={`w-full text-base md:text-lg py-3 rounded-xl cursor-pointer ${
              activeSection === "payment"
                ? "bg-[#1E1E21] text-[#3A5CFF]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("payment")}
          >
            <span className="flex items-center gap-2 justify-start pl-2 md:pl-4">
              <img src={Billing} alt="Payment" />
              Payment Settings
            </span>
          </button>

          <button
            className={`w-full text-base md:text-lg py-3 rounded-xl cursor-pointer ${
              activeSection === "notifications"
                ? "bg-[#1E1E21] text-[#3A5CFF]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("notifications")}
          >
            <span className="flex items-center gap-2 justify-start pl-2 md:pl-4">
              <img src={NotificationIcon} alt="Notifications" />
              Notifications
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="w-full md:w-3/4 pl-0 md:pl-6">
          {activeSection === "profile" && <AccountantProfileInformation />}
          {activeSection === "security" && <AccountantSecuritySettings />}
          {activeSection === "payment" && <AccountantPaymentSettings />}
          {activeSection === "notifications" && (
            <NotificationPreferences user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountantSettings;
