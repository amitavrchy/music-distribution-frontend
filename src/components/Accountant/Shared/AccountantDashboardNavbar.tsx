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
import userlogo from "@/assets/icons/user.svg";
import { MdPrivacyTip } from "react-icons/md";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import NotificationReuseable from "@/components/Reuseable/NotificationReuseable";
import { useLogout } from "@/hooks/useLogout";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks/redux-hook";

export interface NavbarProps {
  onMobileMenuToggle: () => void;
  notificationCount?: number;
  isSidebarOpen: boolean;
}

const AccountantDashboardNavbar: React.FC<NavbarProps> = ({
  onMobileMenuToggle,
  notificationCount = 12,
  isSidebarOpen,
}) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { handleLogout } = useLogout();
  // const [isOpendashboard, setIsOpendashboard] = useState(false);
  const user = useAppSelector(selectCurrentUser);

  // const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // const users = [
  //   { initial: "A", name: "Md Arfin Mia" },
  //   { initial: "S", name: "Md Saqzzad" },
  //   { initial: "Q", name: "Md Abdul Quadir" },
  // ];

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
          <div className="flex items-center space-x-3 pl-0 md:pl-8 lg:pl-60">
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-gray-400">Dashboard</span>
              <span className="text-sm md:text-base font-medium text-white">
                {user?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Dashboard Icon */}

          <div className="relative" ref={dropdownRef}>
            {/* Dashboard Button */}
            {/* <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="icon"
              className="relative text-white cursor-pointer hover:bg-amber-400 transition-all duration-200"
            >
              <img src={dashboard} alt="Dashboard" className="w-5 h-5" />
            </Button> */}

            {/* Dropdown Menu */}
            {/* {isOpen && (
              <div className="absolute right-0 mt-2 min-w-[220px] bg-[#10151C] border border-[#3A5CFF]/40 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden animate-fadeIn z-50">
                <ul className="py-2 text-sm text-white">
                  {users.map((user, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-linear-to-r hover:from-[#3A5CFF]/30 hover:to-[#3A5CFF]/10 
                           transition-colors cursor-pointer rounded-xl border border-transparent hover:border-[#20396C]"
                    >
                      <span className="w-8 h-8 rounded-full bg-[#1C2230] flex items-center justify-center text-white font-medium shadow-sm">
                        {user.initial}
                      </span>
                      <span className="font-medium truncate">{user.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>

          {/* <div className="relative">
         
            <Button
              onClick={() => setIsOpendashboard(!isOpendashboard)}
              variant="ghost"
              size="icon"
              className="relative text-white cursor-pointer hover:bg-amber-400"
            >
              <img src={dashboard} alt="Dashboard" className="w-5 h-5" />
            </Button>

            {isOpendashboard && (
              <div className="absolute right-0 mt-2 min-w-[220px] bg-[#10151C] border border-[#3A5CFF]/40 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden animate-fadeIn z-50">
                <ul className="py-2 text-sm text-white">
                  {[
                    { initial: "A", name: "Md Arfin Mia" },
                    { initial: "S", name: "Md Saqzzad " },
                    { initial: "Q", name: "Md Abdul Quadir" },
                  ].map((user, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gradient-to-r hover:from-[#3A5CFF]/30 hover:to-[#3A5CFF]/10 
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
            )}
          </div> */}

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white cursor-pointer"
              >
                <img
                  src={user?.profilePictureUrl || userlogo}
                  alt="User"
                  className="w-6 h-6 rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="bg-[#10151C] text-white w-60 shadow-2xl rounded-3xl border border-[#3A5CFF]/40 backdrop-blur-md overflow-hidden animate-fadeIn"
            >
              <Link to="/accountant-dashboard/settings">
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

export default AccountantDashboardNavbar;
