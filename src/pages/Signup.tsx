/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import signupphoto from "@/assets/photo/signup.svg";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    countryCode: "+1",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const registerData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: `${formData.countryCode}${formData.phoneNumber}`,
      };

      const result = await register(registerData).unwrap();
      navigate("/onboarding", {
        state: {
          email: formData.email,
          previewCode: result.data.previewCode,
        },
      });
    } catch (err: any) {
      console.error("Registration failed:", err);
      toast.error(
        err?.data?.message ||
          err?.error?.data?.message ||
          "Registration failed. Please try again.",
      );
    }
  };

  return (
    <>
      <title>Signup | Marlow</title>
      <meta name="description" content="Signup | Marlow" />
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="max-w-5xl w-full flex overflow-hidden">
          {/* Left Side - Image */}
          <div className="hidden md:flex w-1/2 items-center justify-center">
            <img
              src={signupphoto}
              alt="signup illustration"
              className="h-full w-full object-cover rounded-l-xl"
            />
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans mb-2">
              CREATE YOUR ARTIST ACCOUNT
            </h2>
            <p className="text-gray-400 mb-6 text-sm">
              Start your journey with us! Fill out the details below to get
              access to your dashboard, music distribution, and more.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="flex flex-col">
                <label htmlFor="fullName" className="text-white font-sans mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[20px] bg-[#0F2B2E] text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label
                  htmlFor="phoneNumber"
                  className="text-white font-sans mb-2"
                >
                  Phone Number
                </label>
                <div className="flex items-center gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="px-3 py-3 rounded-[20px] bg-[#0F2B2E] text-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer w-24"
                  >
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+880">🇧🇩 +880</option>
                  </select>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 rounded-[20px] bg-[#0F2B2E] text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-white font-sans mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[20px] bg-[#0F2B2E] text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label htmlFor="password" className="text-white font-sans mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 rounded-[20px] bg-[#0F2B2E] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                    minLength={6}
                  />
                  {formData.password && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
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

              {/* Confirm Password */}
              <div className="flex flex-col">
                <label
                  htmlFor="confirmPassword"
                  className="text-white font-sans mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 rounded-[20px] bg-[#0F2B2E] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                  {formData.confirmPassword && (
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEyeInvisible size={22} />
                      ) : (
                        <AiOutlineEye size={22} />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-sans py-3 rounded-[20px] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>

            {/* Login Redirect */}
            <p className="text-sm text-gray-400 mt-4 text-center">
              Already have an account?
              <Link
                to="/login"
                className="text-blue-400 hover:text-sky-300 ml-1"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
