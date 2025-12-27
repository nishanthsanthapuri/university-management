import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function AppLayout({ children }) {
  return (
    <div>
      {/* Navbar */}
      <nav style={navStyle}>
        <h3 style={{ margin: 0 }}>University Admin</h3>

        <div style={navLinks}>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/students">Students</Link>
          <Link to="/admin/courses">Courses</Link>
          <Link to="/admin/enrollments">Enrollments</Link>
          <LogoutButton />
        </div>
      </nav>

      {/* Page Content */}
      <main style={mainStyle}>{children}</main>
    </div>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  background: "#1976d2",
  color: "#fff",
};

const navLinks = {
  display: "flex",
  gap: "15px",
  alignItems: "center",
};

const mainStyle = {
  padding: "30px",
};

export default AppLayout;
