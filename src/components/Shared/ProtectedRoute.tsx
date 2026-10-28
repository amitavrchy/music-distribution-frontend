// src/components/ProtectedRoute.tsx
import { useAppSelector } from "@/redux/hooks/redux-hook";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

// // src/routes/ProtectedRoute.tsx
// import { useAppSelector } from "@/redux/hooks";
// import { Navigate, useLocation } from "react-router-dom";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   requiredRole?: "admin" | "client" | "distributor" | "accountant";
// }

// const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
//   const { user, token } = useAppSelector((state) => state.auth);
//   const location = useLocation();

//   if (!token) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   if (requiredRole && user?.role !== requiredRole) {
//     // Redirect to appropriate dashboard based on user's actual role
//     switch (user?.role) {
//       case "admin":
//         return <Navigate to="/admin/dashboard" replace />;
//       case "client":
//         return <Navigate to="/client/dashboard" replace />;
//       case "distributor":
//         return <Navigate to="/distributor/dashboard" replace />;
//       case "accountant":
//         return <Navigate to="/accountant/dashboard" replace />;
//       default:
//         return <Navigate to="/" replace />;
//     }
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;
