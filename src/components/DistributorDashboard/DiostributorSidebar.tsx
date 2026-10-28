import { BrandMark } from "@/components/BrandMark";
import { Badge } from "@/components/ui/badge";
import { RiShareBoxLine } from "react-icons/ri";
import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import Dashboard from "@/assets/sidebar/Dashboard.svg";
import Client from "@/assets/sidebar/Client.svg";
import Distribution from "@/assets/sidebar/Distribution.svg";
import Submissions from "@/assets/sidebar/Submissions.svg";
import Backcatalog from "@/assets/sidebar/backcatalog.svg";

export interface SidebarItem {
  icon: string; // image path (not React component)
  label: string;
  href?: string;
  badge?: string;
  children?: { label: string; href: string }[];
}

export interface SidebarProps {
  items?: SidebarItem[];
  onItemClick?: () => void;
}

const defaultSidebarItems: SidebarItem[] = [
  {
    icon: Dashboard,
    label: "Dashboard",
    href: "/distributor-dashboard/dashboard",
  },
  {
    icon: Submissions,
    label: "Submissions",
    href: "/distributor-dashboard/submissions",
  },
  {
    icon: Backcatalog,
    label: "Back Catalog",
    href: "/distributor-dashboard/back-catalog",
  },
  {
    icon: Distribution,
    label: "Distribution",
    href: "/distributor-dashboard/distribution",
  },
  {
    icon: Client,
    label: "Client",
    href: "/distributor-dashboard/client",
  },
];

const DiostributorSidebar: React.FC<SidebarProps> = ({
  items = defaultSidebarItems,
  onItemClick,
}) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <div
      className="flex flex-col h-full bg-[#17171A] object-cover rounded-l-3xl rounded-r-3xl"
      style={{ boxShadow: "3px 4px 42.3px 0px #0000001A" }}
    >
      {/* Logo */}
      <Link to="/distributor-dashboard/dashboard">
        <div className="flex items-center justify-center p-2 sm:p-3 border-b border-[#212C64] mt-1">
          <BrandMark size={36} />
          <p className="text-[#F2F2F2] font-montserrat text-[20px] font-semibold leading-[120%] ml-2">
            Marlow
          </p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 p-4 md:p-8">
        <div className="space-y-4 md:space-y-6">
          {items.map((item) => {
            const isActive =
              location.pathname === item.href ||
              item.children?.some((child) => location.pathname === child.href);
            const isOpen = openMenu === item.label;

            return (
              <div key={item.label}>
                {/* Parent Item */}
                {item.href && !item.children ? (
                  <Link
                    to={item.href}
                    onClick={onItemClick}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm font-normal transition-all duration-300 ease-in-out  ${
                      isActive
                        ? "text-[#3A5CFF] bg-[#1C1D28] rounded-xl shadow-md"
                        : "text-white hover:text-[#3A5CFF] hover:bg-[#1C1D28]/80 hover:rounded-xl hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center space-x-2 md:text-lg">
                      <img src={item.icon} alt="" className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm font-normal transition-all duration-300 ease-in-out cursor-pointer ${
                      isActive
                        ? "text-[#3A5CFF] bg-[#1C1D28] rounded-xl shadow-md"
                        : "text-white hover:text-[#3A5CFF] hover:bg-[#1C1D28]/80 hover:rounded-xl hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center space-x-2 md:text-lg">
                      <img src={item.icon} alt="" className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.children && (
                      <ChevronDown
                        className={`w-4 h-4 transform transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-[#3A5CFF]/10 text-[#3A5CFF] border border-[#3A5CFF]/30"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                )}
                {item.children && isOpen && (
                  <div className="ml-6 mt-2 space-y-2">
                    {item.children.map((child) => {
                      const childActive = location.pathname === child.href;
                      return (
                        <Link
                          key={child.label}
                          to={child.href}
                          onClick={onItemClick}
                          className={`block px-3 py-2 text-sm rounded-lg transition-all ${
                            childActive
                              ? "text-[#3A5CFF] bg-[#1C1D28]"
                              : "text-gray-300 hover:text-[#3A5CFF] hover:bg-[#1C1D28]/70"
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      <div className="p-2 md:p-4 border-t border-[#212C64]">
        <div className="flex justify-center mb-1">
          <BrandMark size={36} />
        </div>
        <Link
          to="/distributor-dashboard/dashboard"
          className="flex items-center justify-center space-x-3 text-white hover:text-[#3A5BF8] transition-colors"
        >
          <span className="text-sm font-medium">Help & Support</span>
          <RiShareBoxLine className="w-5 h-5 text-gray-300" />
        </Link>
      </div>
    </div>
  );
};

export default DiostributorSidebar;
