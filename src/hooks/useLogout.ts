import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { baseApi } from "@/redux/hooks/baseApi";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutApi, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      // Logout endpoint now uses HttpOnly cookie automatically
      await logoutApi().unwrap();
    } catch (error) {
      console.error("Logout failed at backend", error);
      // We continue to client-side logout anyway
    } finally {
      dispatch(logout());
      dispatch(baseApi.util.resetApiState());
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    }
  };

  return { handleLogout, isLoading };
};
