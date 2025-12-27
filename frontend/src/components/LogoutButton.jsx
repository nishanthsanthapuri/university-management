import { clearTokens } from "../utils/tokenService";

function LogoutButton() {
  const handleLogout = () => {
    clearTokens();
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        background: "#d32f2f",
        color: "white",
        padding: "8px 12px",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
