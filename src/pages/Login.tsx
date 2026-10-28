/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, Link, useLocation } from "react-router-dom";
import loginPhoto from "@/assets/photo/signup.svg";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { toast } from "sonner";
import { demoAccounts } from "@/brand";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  // Show success toast from navigation state if exists
  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
      // Clear state to prevent toast on refresh (though location state persists, doing this in strict mode is fine)
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Already handled by ReduxProviderWrapper and Redux Persist
  // No need to check localStorage manually for token/user

  const redirectBasedOnRole = (role: string) => {
    switch (role) {
      case "CLIENT":
        navigate("/client-dashboard");
        break;
      case "ADMIN":
        navigate("/admin");
        break;
      case "SUPER_ADMIN":
        navigate("/super-admin-dashboard");
        break;
      case "ACCOUNTANT":
        navigate("/accountant-dashboard");
        break;
      case "DISTRIBUTOR":
        navigate("/distributor-dashboard");
        break;
      default:
        navigate("/");
    }
  };

  const signIn = async (nextEmail: string, nextPassword: string) => {
    try {
      const result = await login({ email: nextEmail, password: nextPassword }).unwrap();

      if ("requiresVerification" in result.data) {
        toast.message("Confirm your email to finish joining Marlow.");
        navigate("/onboarding", { state: { email: nextEmail } });
        return;
      }

      toast.success("Logged in successfully");

      dispatch(
        setCredentials({
          user: result.data.user,
          token: result.data.access_token,
        }),
      );

      redirectBasedOnRole(result.data.user.role);
    } catch (err: any) {
      console.error("Login failed:", err);
      toast.error(
        err?.data?.message ||
          err?.error?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void signIn(email, password);
  };

  return (
    <>
      <title>Login | Marlow</title>
      <meta name="description" content="Login | Marlow" />
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="max-w-5xl w-full flex overflow-hidden">
          {/* Left Side - Image */}
          <div className="hidden md:flex w-1/2 items-center justify-center">
            <img
              src={loginPhoto}
              alt="artist"
              className="h-full w-full object-cover rounded-l-xl"
            />
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans mb-2">
              Sign in to Marlow
            </h2>
            <p className="text-gray-400 mb-6 text-sm">
              Artists, distributors, and the label desk share one login.
              Open a demo workspace or use your own account.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
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

              {/* Password */}
              <div className="flex flex-col">
                <label htmlFor="password" className="text-white font-sans mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-[20px] bg-[#0F2B2E] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                  {password && (
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

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-sans py-3 rounded-[20px] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.18em] text-[#d7c4a3] mb-2">
                Demo workspaces
              </p>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.role}
                    type="button"
                    disabled={isLoading}
                    onClick={() => {
                      setEmail(account.email);
                      setPassword(account.password);
                      void signIn(account.email, account.password);
                    }}
                    className="rounded-2xl border border-[#c4a574]/30 bg-[#1a140f] px-3 py-2 text-sm text-[#f6f1e8] hover:border-[#c4a574] disabled:opacity-50 cursor-pointer"
                  >
                    {account.role}
                  </button>
                ))}
              </div>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm text-[#d7c4a3] mt-4 text-center cursor-pointer block hover:underline"
            >
              Forget Password
            </Link>

            <p className="text-sm text-gray-400 mt-4 text-center">
              Don't have an account?
              <Link
                to="/signup"
                className="text-blue-400 hover:text-sky-300 ml-1"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

// import loginphoto from "@/assets/photo/signup.svg";
// import { useState } from "react";

// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { Link } from "react-router-dom";

// const Login = () => {
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="min-h-screen flex items-center justify-center  text-white">
//       <div className="max-w-5xl w-full  flex overflow-hidden">
//         {/* Left Side - Image */}
//         <div className="hidden md:flex w-1/2  items-center justify-center">
//           <img
//             src={loginphoto}
//             alt="artist"
//             className="h-full w-full object-cover rounded-l-xl"
//           />
//         </div>

//         {/* Right Side - Form */}
//         <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans mb-2">
//             LOG IN YOUR ARTIST ACCOUNT
//           </h2>
//           <p className="text-gray-400 mb-6 text-sm">
//             Start your journey with us! Fill out the details below to get access
//             to your dashboard, music distribution, and more.
//           </p>

//           <form className="space-y-4">
//             {/* Email */}
//             <div className="flex flex-col mb-4">
//               <label htmlFor="email" className="text-white font-sans mb-2">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="Email"
//                 className="w-full px-4 py-3 rounded-[20px] bg-[#0F2B2E] text-white focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>

//             {/* Password */}
//             {/* <input
//               type="password"
//               placeholder="Password"
//               className="w-full px-4 py-3 rounded-[20px] bg-[#0F2B2E] text-white focus:ring-2 focus:ring-blue-500 outline-none"
//             /> */}

//             <div className="flex flex-col mb-4">
//               <label htmlFor="password" className="text-white font-sans mb-2">
//                 Password
//               </label>

//               <div className="relative w-full">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-3 pr-12 rounded-[20px] bg-[#0F2B2E] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
//                 />

//                 {/* Show eye only if password is not empty */}
//                 {password && (
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer"
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                   >
//                     {showPassword ? (
//                       <AiOutlineEyeInvisible size={22} />
//                     ) : (
//                       <AiOutlineEye size={22} />
//                     )}
//                   </button>
//                 )}
//               </div>
//             </div>
//             {/* Login Button */}
//             <Link to="/client-dashboard">
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-sans py-3 rounded-[20px] transition cursor-pointer"
//               >
//                 Login
//               </button>
//             </Link>
//           </form>

//           <p className="text-sm text-[#01D449] mt-4 text-center">
//             Forget Password
//           </p>
//           <p className="text-sm text-gray-400 mt-4 text-center ">
//             Don’t have an account?
//             <a href="/signup" className="text-blue-400 hover:text-sky-300 ml-1">
//               Register
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
