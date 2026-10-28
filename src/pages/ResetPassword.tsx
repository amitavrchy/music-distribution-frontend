import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import loginPhoto from "@/assets/photo/signup.svg";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword({ email, otp, newPassword }).unwrap();
      toast.success(
        "Password reset successfully! Please login with your new password.",
      );
      navigate("/login");
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="max-w-5xl w-full flex overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <img
            src={loginPhoto}
            alt="reset password"
            className="h-full w-full object-cover rounded-l-xl"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans mb-2 uppercase">
            Reset Password
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            Enter the OTP sent to your email and your new password.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email (Read Only or just an input) */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-white font-sans mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-[20px] bg-[#0F2B2E] text-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* OTP */}
            <div className="flex flex-col">
              <label htmlFor="otp" className="text-white font-sans mb-2">
                OTP
              </label>
              <input
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 rounded-[20px] bg-[#0F2B2E] text-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* New Password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="text-white font-sans mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-[20px] bg-[#0F2B2E] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
                {newPassword && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={22} />
                    ) : (
                      <AiOutlineEye size={22} />
                    )}
                  </button>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-sans py-3 rounded-[20px] transition cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="text-sm text-gray-400 mt-4 text-center">
            Back to
            <Link to="/login" className="text-blue-400 hover:text-sky-300 ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
