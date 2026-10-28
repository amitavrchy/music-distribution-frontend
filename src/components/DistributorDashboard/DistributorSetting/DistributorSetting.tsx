import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdCircleNotifications } from "react-icons/md";
import { SiSpringsecurity } from "react-icons/si";

import ProfileInformation from "./ProfileInformation";
import PasswordManagement from "./PasswordManagement";
import { Notification } from "./Notification";
import { SecuritySettings } from "./SecuritySettings";
import { LanguageRegionPreferences } from "./LanguageRegionPreferences";
import { DistributionPreferences } from "./DistributionPreferences";
import { Support as SupportComponent } from "./Support";

import Security from "@/assets/settingIcon/security1.svg";
import Language from "@/assets/settingIcon/LanguageAndTranslate.svg";
import Distribution from "@/assets/settingIcon/Destributor.svg";
import SupportIcon from "@/assets/settingIcon/support.svg";

const DistributorSetting = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const handleButtonClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="text-white">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 space-y-4 rounded-lg shadow-md bg-[#17171A] p-3 border border-[#38383A]">
          <button
            className={`w-full text-base md:text-lg py-3 rounded-xl cursor-pointer ${
              activeSection === "profile"
                ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
                : "bg-[#1E1E21]"
            } hover:bg-[#232326]`}
            onClick={() => handleButtonClick("profile")}
          >
            <span className="flex items-center gap-2 justify-start pl-2 md:pl-4">
              <FaRegUserCircle />
              Profile Information
            </span>
          </button>

          <button
            className={`w-full text-base md:text-lg py-3 rounded-xl cursor-pointer ${
              activeSection === "password"
                ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
                : "bg-[#1E1E21]"
            } hover:bg-[#232326]`}
            onClick={() => handleButtonClick("password")}
          >
            <span className="flex items-center gap-2 justify-start pl-2 md:pl-4">
              <SiSpringsecurity />
              Password Management
            </span>
          </button>

          <button
            className={`w-full text-base md:text-lg py-3 rounded-xl cursor-pointer ${
              activeSection === "notifications"
                ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
                : "bg-[#1E1E21]"
            } hover:bg-[#232326]`}
            onClick={() => handleButtonClick("notifications")}
          >
            <span className="flex items-center gap-2 justify-start pl-2 md:pl-4">
              <MdCircleNotifications className="text-white" />
              Notification Settings
            </span>
          </button>

          <button
            className={`w-full text-base md:text-lg py-3 rounded-xl cursor-pointer ${
              activeSection === "security"
                ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
                : "bg-[#1E1E21]"
            } hover:bg-[#232326]`}
            onClick={() => handleButtonClick("security")}
          >
            <span className="flex items-center gap-2 justify-start pl-2 md:pl-4">
              <img src={Security} alt="Security Settings" />
              Security Settings
            </span>
          </button>

          <button
            className={`w-full text-base md:text-lg py-3 rounded-xl cursor-pointer ${
              activeSection === "language"
                ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
                : "bg-[#1E1E21]"
            } hover:bg-[#232326]`}
            onClick={() => handleButtonClick("language")}
          >
            <span className="flex items-center gap-2 justify-start pl-2 md:pl-4">
              <img src={Language} alt="Language & Region" />
              Language & Region
            </span>
          </button>

          <button
            className={`w-full text-base md:text-lg py-3 rounded-xl cursor-pointer ${
              activeSection === "distribution"
                ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
                : "bg-[#1E1E21]"
            } hover:bg-[#232326]`}
            onClick={() => handleButtonClick("distribution")}
          >
            <span className="flex items-center gap-2 justify-start pl-2 md:pl-4">
              <img src={Distribution} alt="Distribution Preferences" />
              Distribution Preferences
            </span>
          </button>

          <button
            className={`w-full text-base md:text-lg py-3 rounded-xl cursor-pointer ${
              activeSection === "support"
                ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
                : "bg-[#1E1E21]"
            } hover:bg-[#232326]`}
            onClick={() => handleButtonClick("support")}
          >
            <span className="flex items-center gap-2 justify-start pl-2 md:pl-4">
              <img src={SupportIcon} alt="Support" />
              Support
            </span>
          </button>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-3/4 pl-0 md:pl-6">
          {activeSection === "profile" && <ProfileInformation />}
          {activeSection === "password" && <PasswordManagement />}
          {activeSection === "notifications" && <Notification />}
          {activeSection === "security" && <SecuritySettings />}
          {activeSection === "language" && <LanguageRegionPreferences />}
          {activeSection === "distribution" && <DistributionPreferences />}
          {activeSection === "support" && <SupportComponent />}
        </div>
      </div>
    </div>
  );
};

export default DistributorSetting;

// import { useState } from "react";
// import { FaRegUserCircle } from "react-icons/fa";
// import { MdCircleNotifications } from "react-icons/md";
// import { SiSpringsecurity } from "react-icons/si";

// import ProfileInformation from "./ProfileInformation";

// import PasswordManagement from "./PasswordManagement";
// import { Notification } from "./Notification";
// import { SecuritySettings } from "./SecuritySettings";
// import { LanguageRegionPreferences } from "./LanguageRegionPreferences";
// import { DistributionPreferences } from "./DistributionPreferences";
// import { Support as SupportComponent } from "./Support";

// import Security from "@/assets/settingIcon/security1.svg";
// import Language from "@/assets/settingIcon/LanguageAndTranslate.svg";
// import Distribution from "@/assets/settingIcon/Destributor.svg";
// import SupportIcon from "@/assets/settingIcon/support.svg";

// const DistributorSetting = () => {
//   const [activeSection, setActiveSection] = useState("profile"); // Default section is 'Profile Information'

//   const handleButtonClick = (section: string) => {
//     setActiveSection(section);
//   };

//   return (
//     <div className="= text-white ">
//       <div className="max-w-8xl mx-auto flex">
//         <div className="w-1/4 space-y-4 border border-[#38383A] rounded-lg shadow-md bg-[#17171A] p-3 ">
//           <button
//             className={`w-full text-xl py-3 rounded-xl cursor-pointer ${
//               activeSection === "profile"
//                 ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A] "
//                 : "bg-[#1E1E21]"
//             } hover:bg-gray-400 `}
//             onClick={() => handleButtonClick("profile")}
//           >
//             <span className="flex items-center gap-2 justify-start pl-4">
//               <FaRegUserCircle />
//               Profile Information
//             </span>
//           </button>
//           <button
//             className={`w-full text-xl py-3 rounded-xl  cursor-pointer ${
//               activeSection === "password"
//                 ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
//                 : "bg-[#1E1E21]"
//             } hover:bg-gray-400`}
//             onClick={() => handleButtonClick("password")}
//           >
//             <span className="flex items-center gap-2 justify-start pl-4">
//               <SiSpringsecurity />
//               Password Management
//             </span>
//           </button>
//           <button
//             className={`w-full text-xl py-3 rounded-xl  cursor-pointer ${
//               activeSection === "notifications"
//                 ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
//                 : "bg-[#1E1E21]"
//             } hover:bg-gray-400`}
//             onClick={() => handleButtonClick("notifications")}
//           >
//             <span className="flex items-center gap-2 justify-start pl-4">
//               <MdCircleNotifications className="text-white" />
//               Notification Settings
//             </span>
//           </button>
//           {/*  */}
//           <button
//             className={`w-full text-xl py-3 rounded-xl  cursor-pointer ${
//               activeSection === "security"
//                 ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
//                 : "bg-[#1E1E21]"
//             } hover:bg-gray-400`}
//             onClick={() => handleButtonClick("security")}
//           >
//             <span className="flex items-center gap-2 justify-start pl-4">
//               {/* <MdCircleNotifications className="text-white" /> */}
//               <img src={Security} alt="Security Settings" />
//               Security Settings
//             </span>
//           </button>
//           <button
//             className={`w-full text-xl py-3 rounded-xl  cursor-pointer ${
//               activeSection === "language"
//                 ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
//                 : "bg-[#1E1E21]"
//             } hover:bg-gray-400`}
//             onClick={() => handleButtonClick("language")}
//           >
//             <span className="flex items-center gap-2 justify-start pl-4">
//               {/* <MdCircleNotifications className="text-white" /> */}
//               <img src={Language} alt="Language & Region" />
//               Language & Region
//             </span>
//           </button>
//           <button
//             className={`w-full text-xl py-3 rounded-xl  cursor-pointer ${
//               activeSection === "distribution"
//                 ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
//                 : "bg-[#1E1E21]"
//             } hover:bg-gray-400`}
//             onClick={() => handleButtonClick("distribution")}
//           >
//             <span className="flex items-center gap-2 justify-start pl-4">
//               {/* <MdCircleNotifications className="text-white" /> */}
//               <img src={Distribution} alt="Distribution" />
//               Distribution Preferences
//             </span>
//           </button>
//           <button
//             className={`w-full text-xl py-3 rounded-xl  cursor-pointer ${
//               activeSection === "support"
//                 ? "bg-[#1E1E21] text-[#3A5CFF] border border-[#3A3A3A]"
//                 : "bg-[#1E1E21]"
//             } hover:bg-gray-400`}
//             onClick={() => handleButtonClick("support")}
//           >
//             <span className="flex items-center gap-2 justify-start pl-4">
//               {/* <MdCircleNotifications className="text-white" /> */}
//               <img src={SupportIcon} alt="Support" />
//               Support
//             </span>
//           </button>
//         </div>
//         <div className="w-3/4 pl-8">
//           {activeSection === "profile" && (
//             <div>
//               <ProfileInformation />
//             </div>
//           )}

//           {activeSection === "password" && (
//             <div>
//               <PasswordManagement></PasswordManagement>
//             </div>
//           )}

//           {activeSection === "notifications" && (
//             <div>
//               <Notification />
//             </div>
//           )}
//           {activeSection === "security" && (
//             <div>
//               <SecuritySettings />
//             </div>
//           )}
//           {activeSection === "language" && (
//             <div>
//               <LanguageRegionPreferences />
//             </div>
//           )}
//           {activeSection === "distribution" && (
//             <div>
//               <DistributionPreferences />
//             </div>
//           )}
//           {activeSection === "support" && (
//             <div>
//               <SupportComponent />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DistributorSetting;
