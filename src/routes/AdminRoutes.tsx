import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAppSelector } from "@/redux/hooks/redux-hook";

interface AdminRouteProps {
  children: ReactNode;
  requireSuperAdmin?: boolean;
}

const AdminRoute = ({
  children,
  requireSuperAdmin = false,
}: AdminRouteProps) => {
  const { token, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Check authentication
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user exists
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check for admin role
  const isAdmin = user.role === "ADMIN";
  const isSuperAdmin = user.role === "SUPER_ADMIN";

  if (requireSuperAdmin) {
    // Require SUPER_ADMIN role
    if (!isSuperAdmin) {
      // If not super admin, redirect to appropriate dashboard
      if (isAdmin) {
        return <Navigate to="/super-admin-dashboard" replace />;
      }
      return <Navigate to={`/${user.role.toLowerCase()}-dashboard`} replace />;
    }
  } else {
    // Require either ADMIN or SUPER_ADMIN
    if (!isAdmin && !isSuperAdmin) {
      return <Navigate to={`/${user.role.toLowerCase()}-dashboard`} replace />;
    }
  }

  return <>{children}</>;
};

export default AdminRoute;
