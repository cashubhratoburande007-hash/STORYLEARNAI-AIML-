import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("/login", {
        email,
        password,
      });

      alert(response.data.message);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="logo">
          📚
        </div>

        <h1>StoryLearn AI</h1>

        <p>
          Welcome Back! Login to continue your learning journey.
        </p>

        <form onSubmit={handleLogin}>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="login-btn"
          >
            {loading ? "Logging in..." : "🚀 Login"}
          </button>

        </form>

        <div className="links">
          <Link to="#">Forgot Password?</Link>

          <Link to="/register">
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;