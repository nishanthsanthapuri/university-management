import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../utils/tokenService";
import { useEffect } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = async () => {
    setError("");

    try {
      const response = await loginUser({
        username,
        password,
      });

      console.log("Login success:", response.data);

      // 🔐 Store tokens (we will improve this later)
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      //      setTokens(response.data.accessToken, response.data.refreshToken);
      navigate("/admin/dashboard");

      const role = getUserRole();

      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/unauthorized");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={handleLogin} style={{ width: "100%" }}>
        Login
      </button>
    </div>
  );
}

export default Login;
