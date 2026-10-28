import DiostributorSidebar from "@/components/DistributorDashboard/DiostributorSidebar";
import DistributorDashboardNavbar from "@/components/DistributorDashboard/DistributorDashboardNavbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const DistributorLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const { pathname } = useLocation();

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [pathname]);

  const shouldHideNavbar =
    pathname === "/client-dashboard/invoice-form" ||
    pathname === "/client-dashboard/create-promotion" ||
    pathname === "/client-dashboard/inquiries-details";

  const shouldHideSidebar = () => {
    const hideExact = [
      "/client-dashboard/add-product",
      "/client-dashboard/all-products",
      "/client-dashboard/all-orders",
      "/client-dashboard/inquiries-details",
      "/client-dashboard/invoice-form",
      "/client-dashboard/create-promotion",
    ];

    const pathnameSegments = pathname.split("/");

    const isProductDetails =
      pathname.startsWith("/client-dashboard/all-products/") &&
      pathnameSegments.length === 4;

    const isOrderDetails =
      pathname.startsWith("/client-dashboard/all-orders/") &&
      pathnameSegments.length === 4;

    const isBuyerProfile =
      pathname.startsWith("/client-dashboard/all-orders/") &&
      pathnameSegments.length === 5 &&
      pathname.endsWith("/buyer-profile");

    return (
      hideExact.includes(pathname) ||
      isProductDetails ||
      isOrderDetails ||
      isBuyerProfile
    );
  };

  useEffect(() => {
    const pathnameSegments = pathname.split("/");

    const isDetailView =
      (pathname.startsWith("/client-dashboard/all-products/") &&
        pathnameSegments.length === 4) ||
      (pathname.startsWith("/client-dashboard/all-orders/") &&
        pathnameSegments.length === 4) ||
      (pathname.startsWith("/client-dashboard/all-orders/") &&
        pathnameSegments.length === 5 &&
        pathname.endsWith("/buyer-profile"));

    const isAddProduct = pathname === "/client-dashboard/add-product";
    const isAllProduct = pathname === "/client-dashboard/all-products";
    const isAllOrder = pathname === "/client-dashboard/all-orders";
    const isInquiries = pathname === "/client-dashboard/inquiries-details";
    const isInvoice = pathname === "/client-dashboard/invoice-form";

    setIsSidebarOpen(
      isDetailView ||
        isAddProduct ||
        isAllProduct ||
        isAllOrder ||
        isInquiries ||
        isInvoice,
    );
  }, [pathname]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-linear-to-r from-[#052318] via-[#0A1C19] to-[#0F131B]">
      {/* Sidebar - Fixed on Desktop */}
      {!shouldHideSidebar() && (
        <div className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-30  bg-[#052218]">
          <DiostributorSidebar />
        </div>
      )}

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-200 ease-in-out ${
          !shouldHideSidebar() ? "lg:ml-64" : ""
        }`}
      >
        {/* Navbar */}
        {!shouldHideNavbar && (
          <div className="fixed top-0 left-0 right-0 z-20 bg-white ">
            <DistributorDashboardNavbar
              onMobileMenuToggle={handleMobileMenuToggle}
              notificationCount={3}
              isSidebarOpen={isSidebarOpen}
            />
          </div>
        )}

        {/* Mobile Sidebar */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <div className="hidden" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-[#0E131A]">
            <DiostributorSidebar
              onItemClick={() => setIsMobileMenuOpen(false)}
            />
          </SheetContent>
        </Sheet>

        {/* Scrollable Page Content */}
        <main
          ref={mainRef}
          className={`flex-1 overflow-y-auto mt-16 text-white ${
            isSidebarOpen ? "pt-4 md:pt-10" : "p-4 md:p-10"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DistributorLayout;
