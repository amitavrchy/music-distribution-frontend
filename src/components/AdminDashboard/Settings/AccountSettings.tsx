import { useState } from "react";

import ProfileInformation from "./ProfileInformation";
import { FaRegUserCircle } from "react-icons/fa";
import { SiSpringsecurity } from "react-icons/si";
import PasswordManagement from "./SecuritySetting";
import BillingInformation from "./Billing";
import { TwoFactorSecuritySettings } from "./TwoFactorSecuritySettings";
import PlatformSettings from "./Platform";
import { ContentManagement } from "./ContentManagement";
import { Privacy } from "./Privacy";
import { NotificationPreferences } from "./Notification";
import Billing from "@/assets/settingIcon/payment.svg";
import Platform from "@/assets/settingIcon/privacy.svg";
import TwoFactor from "@/assets/settingIcon/security1.svg";
import Content from "@/assets/settingIcon/Destributor.svg";
import PrivacyIcon from "@/assets/settingIcon/privacy.svg";
import NotificationIcon from "@/assets/settingIcon/notifications.svg";
import { useAuthMeQuery } from "@/redux/features/auth/authApi";
import ComponentLoader from "@/components/Reuseable/ComponentLoader";

const AccountSettings = () => {
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
              activeSection === "billing"
                ? "bg-[#1E1E21] text-[#3A5CFF]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("billing")}
          >
            <span className="flex items-center gap-2 justify-start pl-2 md:pl-4">
              <img src={Billing} alt="Billing" />
              Billing
            </span>
          </button>

          <button
            className={`w-full text-base md:text-lg py-3 rounded-xl cursor-pointer ${
              activeSection === "platform"
                ? "bg-[#1E1E21] text-[#3A5CFF]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("platform")}
          >
            <span className="flex items-center gap-2 justify-start pl-2 md:pl-4">
              <img src={Platform} alt="Platform" />
              Platform Settings
            </span>
          </button>

          <button
            className={`w-full text-base md:text-lg py-3 rounded-xl cursor-pointer ${
              activeSection === "two-factor"
                ? "bg-[#1E1E21] text-[#3A5CFF]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("two-factor")}
          >
            <span className="flex items-center gap-2 justify-start pl-2 md:pl-4">
              <img src={TwoFactor} alt="Two Factor" />
              Two Factor Security
            </span>
          </button>

          <button
            className={`w-full text-base md:text-lg py-3 rounded-xl cursor-pointer ${
              activeSection === "content"
                ? "bg-[#1E1E21] text-[#3A5CFF]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("content")}
          >
            <span className="flex items-center gap-2 justify-start pl-2 md:pl-4">
              <img src={Content} alt="Content" />
              Content Manage
            </span>
          </button>

          <button
            className={`w-full text-base md:text-lg py-3 rounded-xl cursor-pointer ${
              activeSection === "privacy"
                ? "bg-[#1E1E21] text-[#3A5CFF]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("privacy")}
          >
            <span className="flex items-center gap-2 justify-start pl-2 md:pl-4">
              <img src={PrivacyIcon} alt="Privacy" />
              Privacy
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
          {activeSection === "profile" && <ProfileInformation user={user} />}
          {activeSection === "security" && <PasswordManagement user={user} />}
          {activeSection === "billing" && <BillingInformation user={user} />}
          {activeSection === "platform" && <PlatformSettings user={user} />}
          {activeSection === "two-factor" && (
            <TwoFactorSecuritySettings user={user} />
          )}
          {activeSection === "content" && <ContentManagement user={user} />}
          {activeSection === "privacy" && <Privacy user={user} />}
          {activeSection === "notifications" && (
            <NotificationPreferences user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
