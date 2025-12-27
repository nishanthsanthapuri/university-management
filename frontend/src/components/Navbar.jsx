import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h3 style={styles.logo}>University Admin</h3>

      <div style={styles.links}>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/students">Students</NavLink>
        <NavLink to="/admin/courses">Courses</NavLink>
        <NavLink to="/admin/enrollments">Enrollments</NavLink>
        <LogoutButton />
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#1e293b",
    color: "white",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
};
