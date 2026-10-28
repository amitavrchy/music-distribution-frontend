import { useState } from "react";

import ProfileInformation from "./ProfileInformation";
import SecuritySettings from "./SecuritySettings";
import NotificationSettings from "./NotificationSettings";
import { FaRegUserCircle } from "react-icons/fa";
import { SiSpringsecurity } from "react-icons/si";
import { MdCircleNotifications } from "react-icons/md";
import PaymentInformation from "./PaymentInformation";
import Distribution from "./Distribution";
import Privacy from "./Privacy";
import DeleteAccount from "./DeleteAccount";

const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState("profile"); // Default section is 'Profile Information'

  const handleButtonClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="= text-white ">
      <div className="max-w-8xl mx-auto flex">
        <div className="w-1/4 space-y-4 border border-[#38383A] rounded-lg shadow-md bg-[#17171A] p-3 ">
          <button
            className={`w-full text-xl py-3 rounded-xl cursor-pointer ${
              activeSection === "profile"
                ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A] "
                : "bg-[#1E1E21]"
            } hover:bg-gray-400 `}
            onClick={() => handleButtonClick("profile")}
          >
            <span className="flex items-center gap-2 justify-start pl-4">
              <FaRegUserCircle />
              Profile Information
            </span>
          </button>
          <button
            className={`w-full text-xl py-3 rounded-xl  cursor-pointer ${
              activeSection === "security"
                ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("security")}
          >
            <span className="flex items-center gap-2 justify-start pl-4">
              <SiSpringsecurity />
              Security Settings
            </span>
          </button>
          <button
            className={`w-full text-xl py-3 rounded-xl  cursor-pointer ${
              activeSection === "notifications"
                ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("notifications")}
          >
            <span className="flex items-center gap-2 justify-start pl-4">
              <MdCircleNotifications className="text-white" />
              Notification Settings
            </span>
          </button>
          {/*  */}
          <button
            className={`w-full text-xl py-3 rounded-xl  cursor-pointer ${
              activeSection === "payment"
                ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("payment")}
          >
            <span className="flex items-center gap-2 justify-start pl-4">
              <MdCircleNotifications className="text-white" />
              Payment Information
            </span>
          </button>
          <button
            className={`w-full text-xl py-3 rounded-xl  cursor-pointer ${
              activeSection === "distribution"
                ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("distribution")}
          >
            <span className="flex items-center gap-2 justify-start pl-4">
              <MdCircleNotifications className="text-white" />
              Distribution
            </span>
          </button>
          <button
            className={`w-full text-xl py-3 rounded-xl  cursor-pointer ${
              activeSection === "privacy"
                ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("privacy")}
          >
            <span className="flex items-center gap-2 justify-start pl-4">
              <MdCircleNotifications className="text-white" />
              Privacy
            </span>
          </button>
          <button
            className={`w-full text-xl py-3 rounded-xl  cursor-pointer ${
              activeSection === "delete"
                ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("delete")}
          >
            <span className="flex items-center gap-2 justify-start pl-4">
              <MdCircleNotifications className="text-white" />
              Delete Account
            </span>
          </button>
        </div>
        <div className="w-3/4 pl-8">
          {activeSection === "profile" && (
            <div>
              <ProfileInformation />
            </div>
          )}

          {activeSection === "security" && (
            <div>
              <SecuritySettings />
            </div>
          )}

          {activeSection === "notifications" && (
            <div>
              <NotificationSettings />
            </div>
          )}
          {activeSection === "payment" && (
            <div>
              <PaymentInformation />
            </div>
          )}
          {activeSection === "distribution" && (
            <div>
              <Distribution />
            </div>
          )}
          {activeSection === "privacy" && (
            <div>
              <Privacy />
            </div>
          )}
          {activeSection === "delete" && (
            <div>
              <DeleteAccount />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
