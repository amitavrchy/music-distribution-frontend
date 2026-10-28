import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAppSelector } from "@/redux/hooks/redux-hook";
import { UserRole } from "@/redux/types/auth.type";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

const PrivateRoute = ({
  children,
  allowedRoles,
  redirectTo = "/login",
}: PrivateRouteProps) => {
  const { token, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Check if user is authenticated
  if (!token) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If roles are specified, check if user has required role
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user's actual role
    switch (user.role) {
      case "CLIENT":
        return <Navigate to="/client-dashboard" replace />;
      case "SUPER_ADMIN":
        return <Navigate to="/super-admin-dashboard" replace />;
      case "ADMIN":
        return <Navigate to="/admin" replace />;
      case "ACCOUNTANT":
        return <Navigate to="/accountant-dashboard" replace />;
      case "DISTRIBUTOR":
        return <Navigate to="/distributor-dashboard" replace />;
      default:
        return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;
