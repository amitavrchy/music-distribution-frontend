import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks/redux-hook";

const RoleBasedRedirect = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on user role
  switch (user.role) {
    case "CLIENT":
      return <Navigate to="/client-dashboard" replace />;
    case "SUPER_ADMIN":
    case "ADMIN":
      return <Navigate to="/super-admin-dashboard" replace />;
    case "ACCOUNTANT":
      return <Navigate to="/accountant-dashboard" replace />;
    case "DISTRIBUTOR":
      return <Navigate to="/distributor-dashboard" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

export default RoleBasedRedirect;

// // src/components/RoleBasedRedirect.tsx
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "@/redux/hooks";

// const RoleBasedRedirect = () => {
//   const { user } = useAppSelector((state) => state.auth);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       switch (user.role) {
//         case "admin":
//           navigate("/admin/dashboard");
//           break;
//         case "client":
//           navigate("/client/dashboard");
//           break;
//         case "distributor":
//           navigate("/distributor/dashboard");
//           break;
//         case "accountant":
//           navigate("/accountant/dashboard");
//           break;
//         default:
//           navigate("/");
//       }
//     }
//   }, [user, navigate]);

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//     </div>
//   );
// };

// export default RoleBasedRedirect;
