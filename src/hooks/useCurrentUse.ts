import { useAuthMeQuery } from "@/redux/features/auth/authApi";

export const useCurrentUser = () => {
  const { data: user } = useAuthMeQuery();
  return user?.data;
};
