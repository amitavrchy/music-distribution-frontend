import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setCredentials } from "@/redux/features/auth/authSlice";
import {
  useCompleteOnboardingMutation,
  useRequestOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks/redux-hook";

type JoinState = {
  email?: string;
  previewCode?: string;
};

const genres = ["R&B", "Hip-Hop", "Pop", "Electronic", "Afrobeats", "Rock"];
const territories = ["United States", "United Kingdom", "Canada", "Worldwide"];

const Onboarding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const incoming = (location.state ?? {}) as JoinState;
  const [email] = useState(incoming.email ?? "");
  const [previewCode, setPreviewCode] = useState(incoming.previewCode);
  const [step, setStep] = useState<"verify" | "profile">("verify");
  const [otp, setOtp] = useState("");
  const [stageName, setStageName] = useState("");
  const [genre, setGenre] = useState(genres[0]);
  const [territory, setTerritory] = useState(territories[0]);
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [requestOtp, { isLoading: isResending }] = useRequestOtpMutation();
  const [completeOnboarding, { isLoading: isSaving }] =
    useCompleteOnboardingMutation();

  const verify = async (event: FormEvent) => {
    event.preventDefault();
    if (!email) {
      toast.error("Start from sign up so we know which account to confirm.");
      return;
    }
    try {
      const result = await verifyOtp({
        email,
        otp,
        type: "VERIFICATION",
      }).unwrap();
      const token =
        result.data.access_token || result.data.token?.accessToken;
      if (!result.data.user || !token) {
        toast.error("Verification did not return a session.");
        return;
      }
      dispatch(setCredentials({ user: result.data.user, token }));
      toast.success("Email confirmed");
      setStep("profile");
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "That code did not match.";
      toast.error(message);
    }
  };

  const resend = async () => {
    if (!email) return;
    try {
      const result = await requestOtp({
        email,
        type: "VERIFICATION",
      }).unwrap();
      const code = (result.data as { previewCode?: string } | null)?.previewCode;
      if (code) setPreviewCode(code);
      toast.success("A new code is ready");
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Could not send a new code.";
      toast.error(message);
    }
  };

  const saveProfile = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await completeOnboarding({ stageName, genre, territory }).unwrap();
      toast.success("You're in. The artist desk is ready.");
      navigate("/client-dashboard");
    } catch (error: unknown) {
      const message =
        (error as { data?: { message?: string } })?.data?.message ||
        "Could not save the artist profile.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white px-4">
      <div className="w-full max-w-lg">
        <p className="text-xs uppercase tracking-[0.22em] text-[#d7c4a3] mb-3">
          {step === "verify" ? "Step 1 of 2" : "Step 2 of 2"}
        </p>
        <h1 className="text-3xl font-semibold mb-2">
          {step === "verify" ? "Confirm your email" : "Set up the artist profile"}
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          {step === "verify"
            ? `Enter the code for ${email || "your account"} to open Marlow.`
            : "This is the name, genre, and territory distributors will see on your first release."}
        </p>

        {step === "verify" ? (
          <form className="space-y-4" onSubmit={verify}>
            {previewCode && (
              <p className="rounded-2xl border border-[#c4a574]/40 bg-[#1a140f] px-4 py-3 text-sm text-[#f3e2c4]">
                Local mail is not connected. Your code is{" "}
                <span className="font-semibold tracking-[0.2em]">{previewCode}</span>
              </p>
            )}
            <input
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              inputMode="numeric"
              placeholder="6-digit code"
              className="w-full px-4 py-3 rounded-[20px] bg-[#0F2B2E] outline-none"
              required
            />
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full bg-[#c4a574] text-[#1a140f] font-semibold py-3 rounded-[20px] disabled:opacity-50 cursor-pointer"
            >
              {isVerifying ? "Checking..." : "Confirm and continue"}
            </button>
            <button
              type="button"
              onClick={resend}
              disabled={isResending || !email}
              className="w-full text-sm text-[#d7c4a3] cursor-pointer"
            >
              {isResending ? "Sending..." : "Send a new code"}
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={saveProfile}>
            <label className="block text-sm">
              Stage name
              <input
                value={stageName}
                onChange={(event) => setStageName(event.target.value)}
                className="mt-2 w-full px-4 py-3 rounded-[20px] bg-[#0F2B2E] outline-none"
                required
              />
            </label>
            <label className="block text-sm">
              Primary genre
              <select
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
                className="mt-2 w-full px-4 py-3 rounded-[20px] bg-[#0F2B2E] outline-none"
              >
                {genres.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              Home territory
              <select
                value={territory}
                onChange={(event) => setTerritory(event.target.value)}
                className="mt-2 w-full px-4 py-3 rounded-[20px] bg-[#0F2B2E] outline-none"
              >
                {territories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-[#c4a574] text-[#1a140f] font-semibold py-3 rounded-[20px] disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? "Saving..." : "Open my dashboard"}
            </button>
          </form>
        )}

        <p className="text-sm text-gray-400 mt-6">
          Already confirmed?{" "}
          <Link to="/login" className="text-[#d7c4a3]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
