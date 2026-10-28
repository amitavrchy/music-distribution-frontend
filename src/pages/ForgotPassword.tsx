import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginPhoto from "@/assets/photo/signup.svg";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      toast.success("Password reset link (OTP) sent to your email.");
      navigate("/reset-password", { state: { email } });
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to send reset link.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="max-w-5xl w-full flex overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <img
            src={loginPhoto}
            alt="forgot password"
            className="h-full w-full object-cover rounded-l-xl"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans mb-2 uppercase">
            Forgot Password
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            Enter your email address and we'll send you an OTP to reset your
            password.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-sans py-3 rounded-[20px] transition cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Submit"}
            </button>
          </form>

          <p className="text-sm text-gray-400 mt-4 text-center">
            Remembered your password?
            <Link to="/login" className="text-blue-400 hover:text-sky-300 ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
