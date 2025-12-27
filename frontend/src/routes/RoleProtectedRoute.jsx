import { Navigate } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../utils/tokenService";

function RoleProtectedRoute({ children, role }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (getUserRole() !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default RoleProtectedRoute;
