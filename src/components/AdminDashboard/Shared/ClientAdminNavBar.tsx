import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { IoMdSettings } from "react-icons/io";
import { RiFileList3Fill, RiLogoutBoxRLine } from "react-icons/ri";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import dashboard from "@/assets/icons/dashboard.svg";
import notification from "@/assets/icons/notification.svg";
// import userIcon from "@/assets/icons/user.svg";
import userIcon from "@/assets/icons/user-p.png";
import { MdPrivacyTip } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import NotificationReuseable from "@/components/Reuseable/NotificationReuseable";
import { useLogout } from "@/hooks/useLogout";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks/redux-hook";

export interface NavbarProps {
  onMobileMenuToggle: () => void;
  notificationCount?: number;
  userName?: string;
  isSidebarOpen: boolean;
}

const ClientAdminNavBar: React.FC<NavbarProps> = ({
  onMobileMenuToggle,
  notificationCount = 12,
  isSidebarOpen,
}) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const [isOpendashboard, setIsOpendashboard] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { handleLogout } = useLogout();
  const user = useAppSelector(selectCurrentUser);
  console.log("iam the user form the admin nav bar",user)
  console.log("ssfddfsd",userIcon);
  return (
    <div className="bg-linear-to-r from-[#052117] via-[#0A1C19] to-[#0F131B] border-b border-[#212C64]">
      <header
        className={`flex items-center justify-between h-16 px-4 md:px-8 mb-2 ${
          isSidebarOpen ? "max-w-[1400px] mx-auto" : ""
        }`}
      >
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white cursor-pointer"
            onClick={onMobileMenuToggle}
          >
            <Menu className="w-6 h-6" />
          </Button>

          {/* Logo + Dashboard text */}
          <div className="flex items-center space-x-3 pl-0 md:pl-8 lg:pl-60 mt-2">
            <div className="relative">
              {/* Button */}
              {/* <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full border border-[#3A5CFF]/50 rounded-4xl px-[10px] py-[8px] lg:px-[14px] lg:py-[12px] text-white bg-linear-to-r from-[#1C302B] to-[#10151C] shadow-lg hover:from-[#0F141B] hover:to-[#161625] transition-all duration-300 cursor-pointer"
              >
                <span className="flex items-center gap-3">
      
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-linear-to-r from-[#161625] to-[#1E2235] border border-[#3A5CFF] text-white font-semibold text-sm shadow-md">
                    GC
                  </span>
                  <span className="text-sm md:text-base font-medium tracking-wide">
                    {user?.name}
                  </span>
                </span>

               
                <span
                  className={`ml-2 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                    }`}
                >
                  <ChevronDown size={18} />
                </span>
              </button> */}

              {/* Dropdown */}
              {/* {isOpen && (
                <div className="absolute left-0 mt-2 w-full bg-[#10151C] border border-[#3A5CFF]/40 rounded-3xl shadow-2xl backdrop-blur-md overflow-hidden animate-fadeIn z-50">
                  <ul className="py-2 text-sm text-white space-y-1">
                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-linear-to-r hover:from-[#3A5CFF]/30 hover:to-[#3A5CFF]/10 transition-colors cursor-pointer rounded-3xl hover:border-[#20396C] hover:border border-b ">
                      <span className="w-8 h-8 rounded-full bg-[#1C2230] flex items-center justify-center text-white font-medium shadow-sm">
                        A
                      </span>
                      <span className="font-medium">Md Arfin Mia</span>
                    </li>
                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-linear-to-r hover:from-[#3A5CFF]/30 hover:to-[#3A5CFF]/10 transition-colors cursor-pointer rounded-3xl hover:border-[#20396C] hover:border border-b ">
                      <span className="w-8 h-8 rounded-full bg-[#1C2230] flex items-center justify-center text-white font-medium shadow-sm">
                        S
                      </span>
                      <span className="font-medium">Md Saqzzad Hossain</span>
                    </li>
                    <li className="flex items-center gap-3 px-4 py-2 hover:bg-linear-to-r hover:from-[#3A5CFF]/30 hover:to-[#3A5CFF]/10 transition-colors cursor-pointer rounded-3xl hover:border-[#20396C] hover:border border-b ">
                      <span className="w-8 h-8 rounded-full bg-[#1C2230] flex items-center justify-center text-white font-medium shadow-sm">
                        Q
                      </span>
                      <span className="font-medium">Md Abdul Quadir</span>
                    </li>
                  </ul>
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            {/* Dashboard Icon */}

            {/* Dropdown */}
            {/* {isOpendashboard && (
              <div className="absolute right-0 mt-2 min-w-[220px] bg-[#10151C] border border-[#3A5CFF]/40 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden animate-fadeIn z-50">
                <ul className="py-2 text-sm text-white">
                  {[
                    { initial: "A", name: "Md Arfin Mia" },
                    { initial: "S", name: "Md Saqzzad " },
                    { initial: "Q", name: "Md Abdul Quadir" },
                  ].map((user, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-linear-to-r hover:from-[#3A5CFF]/30 hover:to-[#3A5CFF]/10 
                     transition-colors cursor-pointer rounded-xl hover:border-[#20396C] border border-transparent"
                    >
                      <span className="w-8 h-8 rounded-full bg-[#1C2230] flex items-center justify-center text-white font-medium shadow-sm">
                        {user.initial}
                      </span>
                      <span className="font-medium">{user.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>

          {/* Notifications */}

          <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white cursor-pointer"
                onClick={() => setNotificationOpen(true)}
              >
                <img
                  src={notification}
                  alt="Notifications"
                  className="w-6 h-6"
                />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[10px] rounded-full bg-white text-black">
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            {notificationOpen && (
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
            )}
            <DialogContent className="p-0 bg-transparent border-none fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <NotificationReuseable
                onClose={() => setNotificationOpen(false)}
              />
            </DialogContent>
          </Dialog>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white cursor-pointer"
              >
                <img
                  src={user?.profilePictureUrl || userIcon}
                  alt="User"
                  className="w-6 h-6 rounded-full"
                />
                
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="bg-[#10151C] text-white w-60 shadow-2xl rounded-3xl border border-[#3A5CFF]/40 backdrop-blur-md overflow-hidden animate-fadeIn"
            >
              <Link to="/admin/settings">
                <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 rounded-3xl hover:bg-linear-to-r hover:from-[#3A5CFF]/30 hover:to-[#3A5CFF]/10 transition-colors cursor-pointer">
                  <IoMdSettings className="text-white" />
                  <span className="font-medium">Settings</span>
                </DropdownMenuItem>
              </Link>

              <Link to="/terms-and-conditions">
                <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 rounded-3xl hover:bg-linear-to-r hover:from-[#3A5CFF]/30 hover:to-[#3A5CFF]/10 transition-colors cursor-pointer">
                  <RiFileList3Fill className="text-white" />
                  <span className="font-medium">Terms & Conditions</span>
                </DropdownMenuItem>
              </Link>

              <Link to="/privacy-policy">
                <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 rounded-3xl hover:bg-linear-to-r hover:from-[#3A5CFF]/30 hover:to-[#3A5CFF]/10 transition-colors cursor-pointer">
                  <MdPrivacyTip className="text-white" />
                  <span className="font-medium">Privacy Policy</span>
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem
                className="flex items-center gap-3 px-4 py-2 rounded-3xl hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                onClick={handleLogout}
              >
                <RiLogoutBoxRLine className="text-red-500" />
                <span className="font-medium">Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default ClientAdminNavBar;
