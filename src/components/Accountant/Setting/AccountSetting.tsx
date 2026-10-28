import { useState } from "react";

import ProfileInformation from "./ProfileInformation";

import { FaRegUserCircle } from "react-icons/fa";
import { SiSpringsecurity } from "react-icons/si";
import { MdCircleNotifications } from "react-icons/md";

// import Distribution from "./Distribution";
// import Privacy from "./Privacy";
// import DeleteAccount from "./DeleteAccount";
import PasswordManagement from "./PasswordManagement";
import PaymentSetting from "./PaymentSetting";
import { SecuritySettings } from "./SecuritySettings";
import { Support } from "./Support";

const AccountSetting = () => {
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
              activeSection === "password"
                ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("password")}
          >
            <span className="flex items-center gap-2 justify-start pl-4">
              <SiSpringsecurity />
              Password Management
            </span>
          </button>
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
              Financial & Payment Settings
            </span>
          </button>
          {/*  */}
          <button
            className={`w-full text-xl py-3 rounded-xl  cursor-pointer ${
              activeSection === "security"
                ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("security")}
          >
            <span className="flex items-center gap-2 justify-start pl-4">
              <MdCircleNotifications className="text-white" />
              Security Settings
            </span>
          </button>

          <button
            className={`w-full text-xl py-3 rounded-xl  cursor-pointer ${
              activeSection === "support"
                ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
                : "bg-[#1E1E21]"
            } hover:bg-gray-400`}
            onClick={() => handleButtonClick("support")}
          >
            <span className="flex items-center gap-2 justify-start pl-4">
              <MdCircleNotifications className="text-white" />
              Support
            </span>
          </button>
        </div>
        <div className="w-3/4 pl-8">
          {activeSection === "profile" && (
            <div>
              <ProfileInformation />
            </div>
          )}

          {activeSection === "password" && (
            <div>
              <PasswordManagement />
            </div>
          )}

          {activeSection === "payment" && (
            <div>
              <PaymentSetting />
            </div>
          )}
          {activeSection === "security" && (
            <div>
              <SecuritySettings />
            </div>
          )}
          {activeSection === "support" && (
            <div>
              <Support />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
