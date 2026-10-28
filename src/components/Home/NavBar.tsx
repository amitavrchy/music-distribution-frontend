import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, X } from "lucide-react"; // added X icon
import { useCart } from "@/contexts/CartContext";
import CartModal from "@/components/CartModal";
import { BrandMark } from "@/components/BrandMark";
import { useSelector } from "react-redux";
import { selectCart } from "@/redux/features/cart/cartSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/redux/hooks/redux-hook";
import {
  selectCurrentUser,
  selectCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useLogout } from "@/hooks/useLogout";
import userIcon from "@/assets/icons/user.svg";
import { Settings, LogOut, LayoutDashboard, Package } from "lucide-react";

export const NavBar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isCartOpen, openCart, closeCart } = useCart();
  const cartItems = useSelector(selectCart);

  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);
  const { handleLogout } = useLogout();
  const isAuthenticated = !!token && !!user;

  const links = [
    { name: "Home", path: "/" },
    { name: "Label Bridge", path: "/labelbridge" },
    { name: "News & Articles", path: "/news-articles" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" },
  ];

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openCart();
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="flex w-full items-center justify-between rounded-full bg-white/10 px-4 py-3 shadow-lg shadow-black/10 backdrop-blur-2xl md:px-6 md:py-4 relative z-50">
        {/* Logo with rotating star */}
        <Link
          to="/"
          className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-15 md:h-15"
        >
          <BrandMark size={36} />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-3 lg:gap-5">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`whitespace-nowrap px-4 py-2 text-sm lg:text-base font-medium 
                  rounded-xl transition-all duration-300 flex items-center gap-2
                  ${isActive
                    ? "text-[#f3e2c4] bg-[#c4a574]/15 shadow-md"
                    : "text-gray-300 hover:text-[#f3e2c4] hover:bg-white/5"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side (Cart + Sign In) - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={handleCartClick}
            className="relative p-2 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10"
          >
            {cartItems.totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {cartItems.totalQuantity > 9 ? "9+" : cartItems.totalQuantity}
              </span>
            )}
            <ShoppingCart size={22} className="text-gray-300 hover:text-white" />
          </button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 cursor-pointer outline-none group">
                  <div className="relative">
                    <img
                      src={user?.profilePictureUrl || userIcon}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-green-500/20 group-hover:border-green-500/50 transition-all object-cover"
                    />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-[#0F172A] border border-white/10 text-white p-2 rounded-2xl shadow-2xl backdrop-blur-xl"
              >
                <div className="px-3 py-2 border-b border-white/5 mb-2">
                  <p className="text-sm font-medium truncate">{user?.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
                <Link to="/client-dashboard">
                  <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-white/5 focus:bg-white/5 focus:text-[#00ff00]">
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                </Link>
                <Link to="/orders">
                  <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-white/5 focus:bg-white/5 focus:text-[#00ff00]">
                    <Package size={18} />
                    <span>My Orders</span>
                  </DropdownMenuItem>
                </Link>
                <Link to="/client-dashboard/catalog/settings">
                  <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-white/5 focus:bg-white/5 focus:text-[#00ff00]">
                    <Settings size={18} />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-red-500/10 text-red-400 hover:text-red-400 focus:bg-red-500/10 focus:text-red-400"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-white/10 hover:bg-gray-100 transition-all active:scale-95">
                Sign In
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-[#283531] text-white text-3xl cursor-pointer px-2 py-1 backdrop-blur-sm active:scale-95 rounded-lg z-50"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer (slides from right) */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[100]"
          onClick={closeMenu} // click overlay to close
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Drawer itself - positioned at left, sliding transition */}
          <div
            className="absolute top-0 left-0 h-full w-[280px] max-w-[85vw] bg-black/95 backdrop-blur-xl shadow-2xl flex flex-col p-4 transition-transform duration-300 ease-out translate-x-0 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button (X) */}
            <button
              onClick={closeMenu}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} className="text-gray-400 hover:text-white" />
            </button>

            {/* Auth Section at Top */}
            <div className="mb-4 border-b border-white/10 pb-4 mt-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={user?.profilePictureUrl || userIcon}
                      alt="User"
                      className="w-12 h-12 rounded-full border border-white/20 object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-white font-medium">
                        {user?.name}
                      </span>
                      <span className="text-gray-400 text-sm truncate max-w-[180px]">
                        {user?.email}
                      </span>
                    </div>
                  </div>

                  {/* User Related Menu Items - Moved to top */}
                  <div className="space-y-1">
                    <Link
                      to="/client-dashboard"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      <LayoutDashboard size={20} />
                      <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                    <Link
                      to="/orders"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      <Package size={20} />
                      <span className="text-sm font-medium">My Orders</span>
                    </Link>
                    <Link
                      to="/client-dashboard/catalog/settings"
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      <Settings size={20} />
                      <span className="text-sm font-medium">Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-400/5 rounded-xl transition-all w-full text-left"
                    >
                      <LogOut size={20} />
                      <span className="text-sm font-medium">Sign Out</span>
                    </button>
                  </div>
                </>
              ) : (
                <Link to="/login" onClick={closeMenu}>
                  <button className="w-full py-3 bg-white text-black rounded-xl text-lg font-bold shadow-lg transition-all active:scale-95">
                    Sign In
                  </button>
                </Link>
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-4 mb-2">
                Menu
              </p>
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={closeMenu}
                    className={`px-4 py-3 text-lg rounded-xl transition-all duration-300 flex items-center gap-2
                      ${
                        isActive
                          ? "bg-green-500/10 text-[#00ff00] shadow-lg shadow-green-500/20"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Cart Button */}
            <button
              onClick={handleCartClick}
              className="mt-4 relative flex items-center justify-center gap-2 py-3 px-4 text-lg rounded-xl 
                bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all w-full"
            >
              {cartItems.totalQuantity > 0 && (
                <span className="absolute top-0 right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {cartItems.totalQuantity > 9 ? "9+" : cartItems.totalQuantity}
                </span>
              )}
              <ShoppingCart size={22} />
              Cart
            </button>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && <CartModal onClose={closeCart} />}
    </>
  );
};