import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";

import AdminDashboard from "./pages/AdminDashboard";
import StudentsPage from "./pages/StudentsPage";
import CoursesPage from "./pages/CoursesPage";
import EnrollmentsPage from "./pages/EnrollmentsPage";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import { isAuthenticated, getRole } from "./utils/tokenService";

function HomeRedirect() {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;

  if (getRole() === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/unauthorized" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/admin/dashboard"
          element={
            <RoleProtectedRoute role="ADMIN">
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <RoleProtectedRoute role="ADMIN">
              <StudentsPage />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <RoleProtectedRoute role="ADMIN">
              <CoursesPage />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/enrollments"
          element={
            <RoleProtectedRoute role="ADMIN">
              <EnrollmentsPage />
            </RoleProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
