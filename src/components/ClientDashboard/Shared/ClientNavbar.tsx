import { useState, useEffect, useRef } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { BrandWordmark } from "@/components/BrandMark";
import searchIcon from "@/assets/icons/search.svg";
import messageIcon from "@/assets/icons/message.svg";
import togglebarIcon from "@/assets/icons/togglebar.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { toast } from "sonner";
import { logout } from "@/redux/features/auth/authSlice";

interface MerchantDashboardNavbarProps {
  onMobileMenuToggle: () => void;
}

const navLinks = [
  { label: "Dashboard", href: "/merchant-dashboard" },
  { label: "Order & Delivery", href: "/merchant-dashboard/orders-delivery" },
  { label: "Customers", href: "/merchant-dashboard/customers" },
  {
    label: "Restricted Account",
    href: "/merchant-dashboard/restrict-account",
  },
  { label: "Address Books", href: "/merchant-dashboard/save-address" },
  { label: "Settings", href: "/merchant-dashboard/profile-settings" },
];

const MerchantDashboardNavbar = ({
  onMobileMenuToggle,
}: MerchantDashboardNavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSheet, setOpenSheet] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // Tokens are now managed securely (HttpOnly cookies + in-memory)
    // No need to manually clear cookies or localStorage
    dispatch(logout());
    toast.success("Merchant logged out successfully!");
    navigate("/");
  };

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const getActive = (path: string) => location.pathname === path;

  return (
    <div className="w-full max-w-[1560px] mx-auto px-4 md:px-8 py-3 bg-white shadow-lg rounded-2xl">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="shrink-0">
          <Link to="/">
            <BrandWordmark light />
          </Link>
        </div>

        {/* Desktop Center Nav (only 3 links) */}
        <nav className="hidden md:flex items-center space-x-8 justify-center flex-1">
          {navLinks.slice(0, 3).map((link) => {
            const isActive = getActive(link.href);
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`relative group pb-1 transition-all duration-300 ${
                  isActive
                    ? "text-[#414651] font-bold font-sans text-xl"
                    : "text-[#414651] hover:text-black font-sans text-xl"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-[3px] w-full rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-black scale-x-100"
                      : "bg-transparent scale-x-0 group-hover:bg-black group-hover:scale-x-100"
                  } origin-left`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center space-x-4 cursor-pointer">
          {/* Search - Hidden on mobile */}
          {showSearch ? (
            <div className="hidden md:flex items-center bg-white rounded-lg shadow-sm border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary w-64">
              <Input
                ref={searchInputRef}
                placeholder="Search orders, riders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 shadow-none"
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary cursor-pointer"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <>
              <div
                onClick={() => setShowSearch(true)}
                className="hidden md:flex text-gray-600 hover:text-black hover:bg-gray-100 p-1 rounded"
              >
                <img src={searchIcon} alt="Search" className="w-5 h-5" />
              </div>
              <div className="text-gray-600 hover:text-black hover:bg-gray-100 p-1 rounded">
                <img src={messageIcon} alt="Messages" className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              </div>

              <Dialog
                open={notificationOpen}
                onOpenChange={setNotificationOpen}
              >
                <DialogTrigger asChild>
                  <div
                    className="relative text-gray-600 hover:text-black hover:bg-gray-100 p-1 rounded cursor-pointer"
                    onClick={() => setNotificationOpen(true)}
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                  </div>
                </DialogTrigger>

                <DialogContent
                  className="p-0 bg-transparent border-none 
               fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                ></DialogContent>
              </Dialog>
            </>
          )}

          {/* Toggle Menu for ALL devices */}
          <Sheet open={openSheet} onOpenChange={setOpenSheet}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-black hover:bg-gray-100 p-1 rounded"
                onClick={() => {
                  setOpenSheet(true);
                  onMobileMenuToggle();
                }}
              >
                <img
                  src={togglebarIcon}
                  alt="Toggle menu"
                  className="w-6 h-6"
                />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 bg-white shadow-lg border-l border-gray-200"
            >
              <div className="flex flex-col h-full">
                <div className="py-4 border-b border-gray-100">
                  <BrandWordmark light className="justify-center" />
                </div>
                <div className="px-4 py-3">
                  <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-0 focus-visible:ring-0 shadow-none"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Mobile + Desktop Sheet Nav */}
                <nav className="flex-1 flex flex-col mt-2 space-y-2 px-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setOpenSheet(false)}
                      className={`px-4 py-3 rounded-lg transition-colors ${
                        getActive(link.href)
                          ? "bg-black text-white font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="pt-4 px-4">
                  <Button
                    onClick={() => {
                      handleLogout();
                    }}
                    className="w-full text-red-600 border-none hover:bg-gray-200 hover:text-red-700 cursor-pointer mb-2"
                    // onClick={() => setOpenSheet(false)}
                  >
                    Log Out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboardNavbar;
